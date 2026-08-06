export function createRouter(onChange){
  const route=()=>location.hash.replace(/^#\/?/,"")||"menu";
  addEventListener("hashchange",()=>onChange(route()));
  return {current:route,navigate(to){if(route()===to)onChange(to);else location.hash=`#/${to}`;},start(){onChange(route())}};
}
