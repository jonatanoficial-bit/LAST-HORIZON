import {readFile,readdir} from "node:fs/promises";
const game=JSON.parse(await readFile(new URL("../data/game.json",import.meta.url),"utf8"));
const locales=JSON.parse(await readFile(new URL("../data/locales.json",import.meta.url),"utf8"));
const ids=[];for(const group of Object.values(game.components))for(const item of group)ids.push(item.id);for(const list of [game.acts,game.departments,game.tests,game.crew,game.planets,game.buildings,game.research,game.events])for(const item of list)ids.push(item.id);
const duplicates=ids.filter((id,i)=>ids.indexOf(id)!==i);if(duplicates.length)throw new Error(`IDs duplicados: ${duplicates.join(", ")}`);
for(const code of ["pt-BR","en","es"])if(!locales[code])throw new Error(`Idioma ausente: ${code}`);
if(game.acts.length!==11)throw new Error("A campanha deve conter 11 etapas jogáveis");
console.log(`OK: ${ids.length} entidades, ${game.acts.length} etapas, ${Object.keys(locales).length} idiomas.`);
