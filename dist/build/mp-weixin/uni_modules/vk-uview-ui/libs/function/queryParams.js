"use strict";exports.queryParams=function(e={},r=!0,a="brackets"){let s=r?"?":"",t=[];-1==["indices","brackets","repeat","comma"].indexOf(a)&&(a="brackets");for(let c in e){let r=e[c];if(!(["",void 0,null].indexOf(r)>=0))if(r.constructor===Array)switch(a){case"indices":for(let a=0;a<r.length;a++)t.push(c+"["+a+"]="+r[a]);break;case"brackets":default:r.forEach((e=>{t.push(c+"[]="+e)}));break;case"repeat":r.forEach((e=>{t.push(c+"="+e)}));break;case"comma":let e="";r.forEach((r=>{e+=(e?",":"")+r})),t.push(c+"="+e)}else t.push(c+"="+r)}return t.length?s+t.join("&"):""};
