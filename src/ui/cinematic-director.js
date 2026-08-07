let activeMedia=null;

export function cinematicEntry(manifest,id){return manifest?.cues?.find(item=>item.id===id)||null}
export function voiceEntry(manifest,id){return manifest?.lines?.find(item=>item.id===id)||null}

export function playCinematicCue(manifest,id,{root=document.body,reduceMotion=false}={}){
  const cue=cinematicEntry(manifest,id);if(!cue?.enabled||!cue.src||reduceMotion)return Promise.resolve({played:false,reason:"disabled"});
  activeMedia?.remove?.();
  return new Promise(resolve=>{let settled=false;const finish=(played,reason)=>{if(settled)return;settled=true;overlay.remove();activeMedia=null;resolve({played,reason,cue})},overlay=document.createElement("section");overlay.className="cinematic-cue";overlay.setAttribute("role","dialog");overlay.setAttribute("aria-label",cue.title||"Sequência cinematográfica");overlay.innerHTML=`<video playsinline preload="auto"><source src="./assets/video/cinematics/${escapeAttr(cue.src)}" type="video/mp4"></video><div class="cinematic-cue-hud"><span>ARQUIVO VISUAL GSEA</span><b>${escapeHtml(cue.title||id)}</b><small>${escapeHtml(cue.caption||"")}</small></div><button data-cue-skip>PULAR SEQUÊNCIA</button><div class="cinematic-cue-loading">CARREGANDO TELEMETRIA VISUAL</div>`;root.append(overlay);activeMedia=overlay;const video=overlay.querySelector("video"),loading=overlay.querySelector(".cinematic-cue-loading");overlay.querySelector("[data-cue-skip]").addEventListener("click",()=>finish(true,"skipped"));video.addEventListener("canplay",()=>{loading.hidden=true;video.play().catch(()=>{video.muted=true;video.play().catch(()=>finish(false,"blocked"))})},{once:true});video.addEventListener("ended",()=>finish(true,"ended"),{once:true});video.addEventListener("error",()=>finish(false,"missing"),{once:true});setTimeout(()=>{if(!settled&&video.readyState<2)finish(false,"timeout")},5000)})
}

export function playVoiceLine(manifest,id,{root=document.body,enabled=true}={}){
  const line=voiceEntry(manifest,id);if(!enabled||!line?.enabled||!line.src)return Promise.resolve({played:false,reason:"disabled"});
  const audio=new Audio(`./assets/audio/voices/${line.src}`),subtitle=document.createElement("div");subtitle.className="voice-subtitle";subtitle.innerHTML=`<span>${escapeHtml(line.speaker)}</span><b>${escapeHtml(line.text)}</b>`;root.append(subtitle);return new Promise(resolve=>{let settled=false;const finish=(played,reason)=>{if(settled)return;settled=true;subtitle.remove();resolve({played,reason,line})};audio.addEventListener("ended",()=>finish(true,"ended"),{once:true});audio.addEventListener("error",()=>finish(false,"missing"),{once:true});audio.play().catch(()=>finish(false,"blocked"));setTimeout(()=>finish(false,"timeout"),Math.max(8000,(line.duration||6)*1800))})
}

const escapeHtml=value=>String(value??"").replace(/[&<>'"]/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[char]));
const escapeAttr=escapeHtml;
