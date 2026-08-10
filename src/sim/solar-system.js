export const AU_KM=149597870.7;
export const LIGHT_SECONDS_PER_AU=499.0047838;
const DEG=Math.PI/180;

export function julianDate(value){
  const date=value instanceof Date?value:new Date(value);
  return date.getTime()/86400000+2440587.5;
}

const wrap180=value=>((value+180)%360+360)%360-180;
const element=(pair,T)=>pair[0]+pair[1]*T;
const elementsFor=(body,date)=>{const year=date.getUTCFullYear(),extended=year<1800||year>2050;return extended&&body.elementsExtended?{values:body.elementsExtended,extended:true}:{values:body.elements,extended:false}};

function coordinatesFromE(a,e,I,omega,Omega,E){
  const xp=a*(Math.cos(E)-e),yp=a*Math.sqrt(1-e*e)*Math.sin(E),cosW=Math.cos(omega),sinW=Math.sin(omega),cosO=Math.cos(Omega),sinO=Math.sin(Omega),cosI=Math.cos(I),sinI=Math.sin(I);
  return {x:(cosW*cosO-sinW*sinO*cosI)*xp+(-sinW*cosO-cosW*sinO*cosI)*yp,y:(cosW*sinO+sinW*cosO*cosI)*xp+(-sinW*sinO+cosW*cosO*cosI)*yp,z:sinW*sinI*xp+cosW*sinI*yp};
}

export function planetPosition(body,value){
  const date=value instanceof Date?value:new Date(value),jd=julianDate(date),T=(jd-2451545)/36525,{values:elements,extended}=elementsFor(body,date);
  const a=element(elements.a,T),e=element(elements.e,T),I=element(elements.I,T)*DEG;
  const L=element(elements.L,T),peri=element(elements.peri,T),node=element(elements.node,T);
  const extra=extended?body.elementsExtra:null,correction=extra?(extra.b*T*T+extra.c*Math.cos(extra.f*T*DEG)+extra.s*Math.sin(extra.f*T*DEG)):0,M=wrap180(L-peri+correction)*DEG,omega=(peri-node)*DEG,Omega=node*DEG;
  let E=M;
  for(let i=0;i<12;i++)E-=((E-e*Math.sin(E)-M)/(1-e*Math.cos(E)));
  const {x,y,z}=coordinatesFromE(a,e,I,omega,Omega,E);
  return {id:body.id,name:body.name,x,y,z,distanceAu:Math.hypot(x,y,z),longitudeDeg:(Math.atan2(y,x)/DEG+360)%360,latitudeDeg:Math.asin(z/Math.hypot(x,y,z))/DEG,a,e};
}

export function planetOrbitPath(body,value,samples=180){const date=value instanceof Date?value:new Date(value),jd=julianDate(date),T=(jd-2451545)/36525,{values:elements}=elementsFor(body,date),a=element(elements.a,T),e=element(elements.e,T),I=element(elements.I,T)*DEG,peri=element(elements.peri,T),node=element(elements.node,T),omega=(peri-node)*DEG,Omega=node*DEG,path=[];for(let index=0;index<=samples;index++){const E=index/samples*Math.PI*2;path.push(coordinatesFromE(a,e,I,omega,Omega,E))}return path}

export function planetaryPositions(value,solarData){return solarData.bodies.map(body=>({...body,...planetPosition(body,value)}))}

export function distanceBetween(a,b){return Math.hypot(a.x-b.x,a.y-b.y,a.z-b.z)}

export function earthSunDirection(value,earth){
  const epsilon=23.43928*DEG;
  const sx=-earth.x,sy=-earth.y,sz=-earth.z;
  const ex=sx,ey=sy*Math.cos(epsilon)-sz*Math.sin(epsilon),ez=sy*Math.sin(epsilon)+sz*Math.cos(epsilon);
  const jd=julianDate(value),T=(jd-2451545)/36525;
  const gmst=((280.46061837+360.98564736629*(jd-2451545)+.000387933*T*T-T*T*T/38710000)%360)*DEG;
  const x=ex*Math.cos(gmst)+ey*Math.sin(gmst),y=-ex*Math.sin(gmst)+ey*Math.cos(gmst),z=ez;
  const length=Math.hypot(x,y,z)||1;
  return [x/length,y/length,z/length];
}

export function missionDate(state){
  const stored=state.astronomy?.dateIso;
  const date=stored?new Date(stored):new Date(Date.UTC(2047,0,1,12));
  date.setTime(date.getTime()+(state.time?.earthDate||0)*86400000+(state.time?.missionHours||0)*3600000);
  return date;
}

export function formatDistance(au){
  if(au<.01)return `${Math.round(au*AU_KM).toLocaleString("pt-BR")} km`;
  return `${au.toFixed(3)} UA`;
}
