import {readFile,writeFile} from "node:fs/promises";
import {createHash} from "node:crypto";

const [inputPath,outputPath]=process.argv.slice(2);
if(!inputPath||!outputPath)throw new Error("Uso: node scripts/faststart-mp4.mjs entrada.mp4 saida.mp4");

function atoms(buffer){
  const result=[];let offset=0;
  while(offset+8<=buffer.length){
    let size=buffer.readUInt32BE(offset),header=8;
    const type=buffer.toString("ascii",offset+4,offset+8);
    if(size===1){size=Number(buffer.readBigUInt64BE(offset+8));header=16}else if(size===0)size=buffer.length-offset;
    if(size<header||offset+size>buffer.length)throw new Error(`Átomo MP4 inválido ${type} em ${offset}`);
    result.push({type,start:offset,size,end:offset+size});offset+=size;
  }
  if(offset!==buffer.length)throw new Error(`Bytes residuais no MP4: ${buffer.length-offset}`);
  return result;
}

function patchChunkOffsets(moov,delta){
  let patched=0;
  for(let marker=4;marker+12<moov.length;marker++){
    const type=moov.toString("ascii",marker,marker+4);
    if(type!=="stco"&&type!=="co64")continue;
    const start=marker-4,size=moov.readUInt32BE(start),count=moov.readUInt32BE(start+12),width=type==="stco"?4:8,first=start+16;
    if(size<16||start+size>moov.length||first+count*width>start+size)continue;
    for(let index=0;index<count;index++){
      const position=first+index*width;
      if(width===4){const value=moov.readUInt32BE(position)+delta;if(value>0xffffffff)throw new Error("Offset stco excedeu 32 bits");moov.writeUInt32BE(value,position)}
      else moov.writeBigUInt64BE(moov.readBigUInt64BE(position)+BigInt(delta),position);
    }
    patched+=count;marker=start+size-1;
  }
  if(!patched)throw new Error("Nenhuma tabela stco/co64 encontrada no índice moov");
  return patched;
}

const input=await readFile(inputPath),top=atoms(input),ftyp=top.find(atom=>atom.type==="ftyp"),moov=top.find(atom=>atom.type==="moov"),mdat=top.find(atom=>atom.type==="mdat");
if(!ftyp||!moov||!mdat)throw new Error("MP4 precisa conter ftyp, moov e mdat");
if(moov.start<mdat.start)throw new Error("O arquivo já está otimizado para início rápido");
const movedMoov=Buffer.from(input.subarray(moov.start,moov.end)),patched=patchChunkOffsets(movedMoov,moov.size);
const remaining=top.filter(atom=>atom!==ftyp&&atom!==moov).map(atom=>input.subarray(atom.start,atom.end));
const output=Buffer.concat([input.subarray(ftyp.start,ftyp.end),movedMoov,...remaining]);
const outputAtoms=atoms(output),newMoov=outputAtoms.find(atom=>atom.type==="moov"),newMdat=outputAtoms.find(atom=>atom.type==="mdat"),hash=buffer=>createHash("sha256").update(buffer).digest("hex");
if(newMoov.start>newMdat.start)throw new Error("Falha ao mover moov antes de mdat");
if(hash(input.subarray(mdat.start,mdat.end))!==hash(output.subarray(newMdat.start,newMdat.end)))throw new Error("Conteúdo audiovisual mdat foi alterado");
await writeFile(outputPath,output);
console.log(JSON.stringify({inputBytes:input.length,outputBytes:output.length,oldMoov:moov.start,newMoov:newMoov.start,oldMdat:mdat.start,newMdat:newMdat.start,chunkOffsetsPatched:patched,mediaPayloadPreserved:true}));
