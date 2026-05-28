import{j as r}from"./index-CgY_qRnl.js";const y=({variant:s="primary",disabled:e=!1,type:t="button",className:n="",onClick:i,iconSlot:o,title:a,shape:c="square"})=>{const l="border-1 focus:outline-none focus:ring-2 focus:ring-offset-1",u={primary:"cursor-pointer border-primary text-primary focus:ring-red-400 hover:bg-white",secondary:"cursor-pointer border-secondary text-secondary  focus:ring-blue-400 hover:bg-white"},d="border-gray-300 text-gray-300 cursor-not-allowed hover:bg-transparent",h=c==="circle"?"rounded-full":"";return r.jsx("button",{type:t,disabled:e,className:`
        ${l}
        ${e?d:u[s]}
				${h}
        ${n}
      `,onClick:e?void 0:i,title:a,children:o&&r.jsx("i",{className:"h-10 w-10",children:o})})},g=()=>r.jsxs("svg",{className:"w-10 h-10",xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",strokeWidth:"1",stroke:"currentColor",fill:"none",strokeLinecap:"round",strokeLinejoin:"round","aria-label":"Remove icon",role:"img",children:[r.jsx("path",{stroke:"none",d:"M0 0h24v24H0z"})," ",r.jsx("line",{x1:"5",y1:"12",x2:"19",y2:"12"})]});export{y as I,g as a};
