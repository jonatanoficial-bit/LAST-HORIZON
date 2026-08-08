const DEFAULT_MIX={music:22,voices:90,effects:56};
let manifest=null,mix={...DEFAULT_MIX},audio=null,currentMood="none",currentTrack=null,duckers=0,unlocked=false,trackCursor={};

const clamp=value=>Math.max(0,Math.min(100,Number(value)||0));
export function normalizeAudioMix(value={}){return {music:clamp(value.music??DEFAULT_MIX.music),voices:clamp(value.voices??DEFAULT_MIX.voices),effects:clamp(value.effects??DEFAULT_MIX.effects)}}
export function getAudioMix(){return {...mix}}

function targetVolume(){return mix.music/100*(duckers>0?.16:1)}
function updateVolume(){if(audio)audio.volume=targetVolume()}
function tracksFor(mood){return manifest?.tracks?.filter(track=>track.enabled&&track.mood===mood)||[]}
function playTrack(track){
  if(!track)return;audio?.pause();audio=new Audio(`./assets/audio/music/${track.src}`);audio.preload="auto";audio.volume=targetVolume();currentTrack=track.id;
  audio.addEventListener("ended",()=>{const tracks=tracksFor(currentMood);if(!tracks.length)return;trackCursor[currentMood]=((trackCursor[currentMood]||0)+1)%tracks.length;playTrack(tracks[trackCursor[currentMood]])});
  const attempt=()=>audio?.play().then(()=>{unlocked=true}).catch(()=>{unlocked=false});attempt();
}
function unlock(){unlocked=true;if(currentMood!=="none"&&audio?.paused)audio.play().catch(()=>{});document.removeEventListener("pointerdown",unlock,true);document.removeEventListener("keydown",unlock,true)}

export function initMusicDirector(nextManifest,initialMix){manifest=nextManifest;mix=normalizeAudioMix(initialMix||manifest?.defaultMix);document.addEventListener("pointerdown",unlock,true);document.addEventListener("keydown",unlock,true);return getAudioMix()}
export function setAudioMix(next){mix=normalizeAudioMix(next);localStorage.setItem("lh-audio-mix-v1",JSON.stringify(mix));updateVolume();return getAudioMix()}
export function setMusicScene(scene){
  const mood=manifest?.sceneMoods?.[scene]||"calm";if(mood==="none"){audio?.pause();audio=null;currentMood="none";currentTrack=null;return}
  if(mood===currentMood&&audio){updateVolume();if(unlocked&&audio.paused)audio.play().catch(()=>{});return}
  currentMood=mood;const tracks=tracksFor(mood);if(!tracks.length)return;trackCursor[mood]=(trackCursor[mood]??-1)+1;trackCursor[mood]%=tracks.length;playTrack(tracks[trackCursor[mood]])
}
export function duckMusic(active){duckers=Math.max(0,duckers+(active?1:-1));updateVolume()}
export function stopMusic(){audio?.pause();audio=null;currentMood="none";currentTrack=null;duckers=0}
