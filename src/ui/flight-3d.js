const DEG=Math.PI/180,EARTH_RADIUS=6378137;
const add=(a,b)=>[a[0]+b[0],a[1]+b[1],a[2]+b[2]],mul=(a,k)=>[a[0]*k,a[1]*k,a[2]*k],cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]],length=a=>Math.hypot(...a),unit=a=>{const n=length(a)||1;return mul(a,1/n)};
const rotateAround=(v,axis,angle)=>{const c=Math.cos(angle),s=Math.sin(angle),d=v[0]*axis[0]+v[1]*axis[1]+v[2]*axis[2];return add(add(mul(v,c),mul(cross(axis,v),s)),mul(axis,d*(1-c)))};

const vertexSource=`attribute vec2 aPosition;void main(){gl_Position=vec4(aPosition,0.,1.);}`;
const fragmentSource=`
precision highp float;
uniform vec2 uResolution;
uniform vec2 uLook;
uniform vec3 uCamera,uForward,uRight,uUp,uSun;
uniform sampler2D uEarth;
uniform float uTime,uHeat,uAtmosphere,uClouds,uExposure,uAltitude,uCockpit;

float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*noise(p);p=p*2.03+17.17;a*=.5;}return v;}
vec3 stars(vec3 ray){vec2 cell=floor((ray.xy/(abs(ray.z)+1.15))*420.);float star=step(.9948,hash(cell));float glow=pow(max(0.,hash(cell+3.1)),15.);vec3 milky=vec3(.04,.075,.12)*pow(max(0.,1.-abs(ray.y+.16)),7.);return milky+star*glow*vec3(.72,.9,1.);}
void main(){
  vec2 q=(gl_FragCoord.xy/uResolution)*2.-1.;q.x*=uResolution.x/uResolution.y;
  vec3 ray=normalize(uForward+q.x*uRight*.62+q.y*uUp*.62);
  vec3 color=stars(ray),oc=uCamera;
  float elevation=dot(ray,normalize(oc)),altKm=max(0.,uAltitude*6378.137);
  float denseAir=1.-smoothstep(12.,95.,altKm);
  vec3 skyZenith=mix(vec3(.12,.38,.68),vec3(.015,.12,.28),smoothstep(0.,25.,altKm));
  vec3 skyHorizon=mix(vec3(.52,.73,.88),vec3(.08,.28,.52),smoothstep(0.,35.,altKm));
  vec3 sky=mix(skyHorizon,skyZenith,smoothstep(-.12,.72,elevation));
  color=mix(color,sky,denseAir*smoothstep(-.32,.08,elevation));
  float horizonLine=denseAir*exp(-abs(elevation)*42.);
  color+=vec3(.32,.64,.82)*horizonLine*.24;
  vec2 panorama=vec2(atan(ray.z,ray.x)*2.65,elevation*8.5-altKm*.035);
  float cloudTexture=fbm(panorama+vec2(uTime*.006,0.));
  float cloudBand=(1.-smoothstep(5.,18.,altKm))*smoothstep(-.25,.38,elevation)*(1.-smoothstep(.25,.88,elevation));
  float cloudCeiling=(1.-smoothstep(9.,32.,altKm))*smoothstep(.58,.79,cloudTexture)*(.24+.76*(1.-smoothstep(.72,1.,elevation)));
  color=mix(color,vec3(.78,.87,.91),clamp(cloudBand*smoothstep(.5,.78,fbm(q*5.+vec2(uTime*.004,altKm*.03)))*.62+cloudCeiling*.48,0.,.72));
  float sunDot=dot(ray,normalize(uSun)),sunGlow=pow(max(sunDot,0.),72.),sunDisc=smoothstep(.9991,.99982,sunDot);
  color+=vec3(1.,.71,.34)*sunGlow*.42+vec3(1.,.91,.67)*sunDisc*1.8;
  float towerFade=(1.-smoothstep(.05,1.65,altKm))*uCockpit;
  vec2 towerQ=q+vec2(uLook.x*.011,uLook.y*.008);
  float rails=smoothstep(.72,.79,abs(towerQ.x))*(1.-smoothstep(.93,.98,abs(towerQ.x)));
  float crossbeam=step(.88,fract((towerQ.y+1.)*3.8+altKm*1.45+uTime*.012))*(1.-smoothstep(.62,.94,abs(towerQ.x)));
  float tower=clamp(rails+crossbeam,0.,1.)*towerFade;
  color=mix(color,vec3(.14,.19,.21)+vec3(.22,.1,.015)*step(.965,fract(towerQ.y*18.+uTime*.2)),tower*.92);
  float b=dot(oc,ray),c=dot(oc,oc)-1.,disc=b*b-c;
  float closest=length(oc+ray*max(0.,-b));
  float halo=exp(-max(0.,closest-1.)*30.)*(1.-smoothstep(1.,1.28,closest))*uAtmosphere;
  color+=vec3(.025,.24,.55)*halo*.7;
  if(disc>0.){
    float t=-b-sqrt(disc);
    if(t>0.){
      vec3 p=oc+ray*t,n=normalize(p);
      float lon=atan(n.z,n.x),lat=asin(clamp(n.y,-1.,1.));
      vec2 uv=vec2(fract(lon/6.2831853+.5),.5-lat/3.1415926);
      vec3 albedo=texture2D(uEarth,uv).rgb;
      float daylight=dot(n,normalize(uSun));
      float diffuse=.055+.945*smoothstep(-.12,.24,daylight);
      float ocean=1.-smoothstep(.19,.34,albedo.g-albedo.r+.12);
      float spec=pow(max(dot(reflect(-normalize(uSun),n),-ray),0.),46.)*ocean*max(daylight,0.);
      vec2 cloudUv=vec2(uv.x*13.+uTime*.0025,uv.y*7.);
      float cloud=0.;if(uClouds>.01)cloud=smoothstep(.59,.76,fbm(cloudUv))*uClouds*smoothstep(-.08,.2,daylight);
      float limb=pow(1.-max(dot(n,-ray),0.),2.4);
      vec3 atmosphere=vec3(.08,.48,1.)*limb*(.25+.75*max(daylight,0.))*uAtmosphere;
      vec3 night=vec3(.004,.008,.014)+vec3(1.,.48,.12)*step(.9975,hash(floor(uv*vec2(1300.,650.))))*(1.-smoothstep(-.35,.05,daylight))*.7;
      color=mix(night,albedo*diffuse,step(-.18,daylight));
      color=mix(color,vec3(.82,.9,.94),cloud*.62)+atmosphere+spec*.35;
    }
  }
  float reentry=uHeat*smoothstep(.15,.92,abs(q.x))*smoothstep(.9,.05,abs(q.y));
  color+=vec3(1.,.18,.015)*reentry*(.38+.22*noise(q*38.+uTime*9.));
  color=vec3(1.)-exp(-color*uExposure);
  color=pow(color,vec3(.86));
  gl_FragColor=vec4(color,1.);
}`;

const rocketVertex=`
precision highp float;
attribute vec3 aPosition,aNormal,aColor;
attribute float aPart;
uniform float uRoll,uTilt,uPlume,uStage,uTime,uAspect;
varying vec3 vColor,vNormal;varying float vPart;
void main(){
  vec3 q=aPosition,n=aNormal;
  if(aPart>1.5){q.y=-1.25-(q.y+1.25)*(.35+uPlume*1.8+sin(uTime*28.+q.x*20.)*.08);q.x*=.55+uPlume*.45;q.z*=.55+uPlume*.45;}
  if(uStage>1.5&&aPart>.45&&aPart<1.5)q.z+=100.;
  float cr=cos(uRoll),sr=sin(uRoll);q.xz=mat2(cr,-sr,sr,cr)*q.xz;n.xz=mat2(cr,-sr,sr,cr)*n.xz;
  float ct=cos(uTilt),st=sin(uTilt);q.xy=mat2(ct,-st,st,ct)*q.xy;n.xy=mat2(ct,-st,st,ct)*n.xy;
  q.z-=4.2;float depth=-q.z;
  gl_Position=vec4(q.x*2.35/uAspect,q.y*2.35,depth*.35,depth);
  vColor=aColor;vNormal=n;vPart=aPart;
}`;
const rocketFragment=`precision mediump float;varying vec3 vColor,vNormal;varying float vPart;uniform float uPlume,uTime;void main(){if(vPart>1.5){float pulse=.75+.25*sin(uTime*35.+gl_FragCoord.y*.1);gl_FragColor=vec4(vColor*pulse,clamp(uPlume*1.5,0.,.82));return;}vec3 light=normalize(vec3(-.4,.75,.65));float d=.2+.8*max(dot(normalize(vNormal),light),0.);gl_FragColor=vec4(vColor*d+pow(max(dot(normalize(vNormal),normalize(vec3(.2,.5,1.))),0.),18.)*.35,1.);}`;

function compile(gl,type,source){const shader=gl.createShader(type);gl.shaderSource(shader,source);gl.compileShader(shader);if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)){const message=gl.getShaderInfoLog(shader);gl.deleteShader(shader);throw new Error(message)}return shader}
function program(gl,vertex,fragment){const result=gl.createProgram();gl.attachShader(result,compile(gl,gl.VERTEX_SHADER,vertex));gl.attachShader(result,compile(gl,gl.FRAGMENT_SHADER,fragment));gl.linkProgram(result);if(!gl.getProgramParameter(result,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(result));return result}
function attribute(gl,p,name,size,stride,offset){const location=gl.getAttribLocation(p,name);gl.enableVertexAttribArray(location);gl.vertexAttribPointer(location,size,gl.FLOAT,false,stride,offset)}

function rocketMesh(){
  const data=[],push=(p,n,c,part)=>data.push(...p,...n,...c,part),tri=(a,b,c,na,nb,nc,color,part=0)=>{push(a,na,color,part);push(b,nb,color,part);push(c,nc,color,part)};
  const cylinder=(y0,y1,r,segments,color,part=0)=>{for(let i=0;i<segments;i++){const a=i/segments*Math.PI*2,b=(i+1)/segments*Math.PI*2,pa=[Math.cos(a)*r,y0,Math.sin(a)*r],pb=[Math.cos(b)*r,y0,Math.sin(b)*r],pc=[Math.cos(b)*r,y1,Math.sin(b)*r],pd=[Math.cos(a)*r,y1,Math.sin(a)*r],na=[Math.cos(a),0,Math.sin(a)],nb=[Math.cos(b),0,Math.sin(b)];tri(pa,pb,pc,na,nb,nb,color,part);tri(pa,pc,pd,na,nb,na,color,part)}};
  cylinder(-1.25,.48,.23,18,[.72,.8,.83],.7);cylinder(.48,1.02,.19,18,[.82,.88,.9],0);cylinder(-1.3,-1.16,.27,18,[.16,.2,.22],.7);cylinder(.42,.55,.235,18,[.08,.12,.15],0);
  for(let i=0;i<18;i++){const a=i/18*Math.PI*2,b=(i+1)/18*Math.PI*2,pa=[Math.cos(a)*.19,1.02,Math.sin(a)*.19],pb=[Math.cos(b)*.19,1.02,Math.sin(b)*.19],tip=[0,1.55,0],na=unit([Math.cos(a),.34,Math.sin(a)]),nb=unit([Math.cos(b),.34,Math.sin(b)]);tri(pa,pb,tip,na,nb,unit(add(na,nb)),[.88,.92,.94],0)}
  for(let i=0;i<4;i++){const a=i*Math.PI/2,side=[Math.cos(a),0,Math.sin(a)],tangent=[-Math.sin(a),0,Math.cos(a)],root1=add(mul(side,.21),add(mul(tangent,-.06),[0,-.82,0])),root2=add(mul(side,.21),add(mul(tangent,.06),[0,-1.22,0])),outer=add(mul(side,.65),[0,-1.26,0]),normal=unit(cross(add(root2,mul(root1,-1)),add(outer,mul(root1,-1))));tri(root1,root2,outer,normal,normal,normal,[.55,.64,.68],.7);tri(root2,root1,outer,mul(normal,-1),mul(normal,-1),mul(normal,-1),[.42,.5,.54],.7)}
  cylinder(-1.25,-1.78,.12,14,[.3,.72,1.],2);cylinder(-1.25,-1.62,.055,12,[1.,.88,.55],2);
  return new Float32Array(data)
}

function basisFor(flight,camera,look={yawDeg:0,pitchDeg:0}){
  const position=flight.positionM||[1,0,0],up=unit(position),east=unit(cross([0,0,1],up)),north=unit(cross(up,east)),pitch=(flight.attitudeDeg?.pitch??90)*DEG,yaw=(flight.attitudeDeg?.yaw??90)*DEG;
  let forward=unit(add(mul(up,Math.sin(pitch)),add(mul(east,Math.cos(pitch)*Math.sin(yaw)),mul(north,Math.cos(pitch)*Math.cos(yaw))))),right=unit(cross(forward,up));if(length(right)<.1)right=east;let cameraUp=unit(cross(right,forward));const roll=(flight.attitudeDeg?.roll||0)*DEG;right=rotateAround(right,forward,roll);cameraUp=rotateAround(cameraUp,forward,roll);
  const altitude=Math.max(0,length(position)-EARTH_RADIUS),visualAltitude=Math.max(.00012,altitude/EARTH_RADIUS);let cameraPosition=mul(up,1+visualAltitude);
  if(camera==="external"){forward=unit(add(mul(forward,.45),mul(up,-.75)));cameraUp=unit(cross(right,forward))}
  if(camera==="trajectory"){cameraPosition=mul(up,2.55);forward=mul(up,-1);right=east;cameraUp=north}
  if(camera!=="trajectory"&&(look.yawDeg||look.pitchDeg)){const yaw=(look.yawDeg||0)*DEG,pitchOffset=(look.pitchDeg||0)*DEG;forward=rotateAround(forward,cameraUp,yaw);right=rotateAround(right,cameraUp,yaw);forward=rotateAround(forward,right,pitchOffset);cameraUp=unit(cross(right,forward))}
  return {camera:cameraPosition,forward,right,up:cameraUp};
}

export function createFlight3DRenderer(canvas,{textureSrc="./assets/images/real/earth-blue-marble-2048.jpg",quality="high",onFallback}={}){
  const gl=canvas?.getContext("webgl",{alpha:false,antialias:quality!=="low",powerPreference:"high-performance"});if(!gl){onFallback?.("WebGL indisponível");return null}
  try{
    let earthProgram;try{earthProgram=program(gl,vertexSource,fragmentSource)}catch{earthProgram=program(gl,vertexSource,fragmentSource.replace("precision highp float","precision mediump float"))}const rocketProgram=program(gl,rocketVertex,rocketFragment),quad=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,quad);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
    const texture=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,texture);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,1,1,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array([12,42,69,255]));gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.REPEAT);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
    const image=new Image();image.onload=()=>{gl.bindTexture(gl.TEXTURE_2D,texture);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,false);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGB,gl.RGB,gl.UNSIGNED_BYTE,image)};image.src=textureSrc;
    const mesh=rocketMesh(),meshBuffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,meshBuffer);gl.bufferData(gl.ARRAY_BUFFER,mesh,gl.STATIC_DRAW);
    const location=(p,name)=>gl.getUniformLocation(p,name),set3=(p,name,v)=>gl.uniform3fv(location(p,name),v),set1=(p,name,v)=>gl.uniform1f(location(p,name),v);
    const resize=()=>{const rect=canvas.getBoundingClientRect(),limit=quality==="low"?1:quality==="medium"?1.35:1.75,dpr=Math.min(devicePixelRatio||1,limit),w=Math.max(2,Math.round(rect.width*dpr)),h=Math.max(2,Math.round(rect.height*dpr));if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h}gl.viewport(0,0,w,h);return {w,h}};
    const render=({flight,telemetry,camera="cockpit",look={yawDeg:0,pitchDeg:0},reduceMotion=false})=>{if(gl.isContextLost())throw new Error("Contexto WebGL perdido");const {w,h}=resize(),time=reduceMotion?0:performance.now()/1000,basis=basisFor(flight,camera,look),heat=Math.min(1,(telemetry.heatFluxWm2||0)/1800000);gl.disable(gl.DEPTH_TEST);gl.disable(gl.BLEND);gl.useProgram(earthProgram);gl.bindBuffer(gl.ARRAY_BUFFER,quad);attribute(gl,earthProgram,"aPosition",2,0,0);gl.uniform2f(location(earthProgram,"uResolution"),w,h);gl.uniform2f(location(earthProgram,"uLook"),look.yawDeg||0,look.pitchDeg||0);set3(earthProgram,"uCamera",basis.camera);set3(earthProgram,"uForward",basis.forward);set3(earthProgram,"uRight",basis.right);set3(earthProgram,"uUp",basis.up);set3(earthProgram,"uSun",unit([.35,.18,.92]));set1(earthProgram,"uTime",time);set1(earthProgram,"uHeat",heat);set1(earthProgram,"uAtmosphere",1);set1(earthProgram,"uClouds",quality==="low"?0:.8);set1(earthProgram,"uExposure",camera==="external"?1.35:1.12);set1(earthProgram,"uAltitude",Math.max(0,telemetry.altitudeKm||0)/6378.137);set1(earthProgram,"uCockpit",camera==="cockpit"?1:0);gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,texture);gl.uniform1i(location(earthProgram,"uEarth"),0);gl.drawArrays(gl.TRIANGLES,0,6);
      if(camera==="external"){gl.clearDepth(1);gl.clear(gl.DEPTH_BUFFER_BIT);gl.enable(gl.DEPTH_TEST);gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);gl.useProgram(rocketProgram);gl.bindBuffer(gl.ARRAY_BUFFER,meshBuffer);const stride=10*4;attribute(gl,rocketProgram,"aPosition",3,stride,0);attribute(gl,rocketProgram,"aNormal",3,stride,3*4);attribute(gl,rocketProgram,"aColor",3,stride,6*4);attribute(gl,rocketProgram,"aPart",1,stride,9*4);set1(rocketProgram,"uRoll",(flight.attitudeDeg?.roll||0)*DEG);set1(rocketProgram,"uTilt",Math.max(-.32,Math.min(.32,(55-(flight.attitudeDeg?.pitch||0))*DEG*.24)));set1(rocketProgram,"uPlume",Math.min(1,(telemetry.thrustN||0)/8200000));set1(rocketProgram,"uStage",flight.stage||1);set1(rocketProgram,"uTime",time);set1(rocketProgram,"uAspect",w/h);gl.drawArrays(gl.TRIANGLES,0,mesh.length/10);gl.disable(gl.BLEND)}return true;
    };
    return {render,destroy(){gl.deleteBuffer(quad);gl.deleteBuffer(meshBuffer);gl.deleteTexture(texture);gl.deleteProgram(earthProgram);gl.deleteProgram(rocketProgram)},available:true};
  }catch(error){onFallback?.(error.message);return null}
}
