"use strict";(self.webpackChunkpocketto_docs=self.webpackChunkpocketto_docs||[]).push([[9105],{4425:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>r,contentTitle:()=>a,default:()=>u,frontMatter:()=>s,metadata:()=>l,toc:()=>c});var i=t(4848),o=t(8453);const s={sidebar_label:"Vue Composables",title:"Vue Composables",sidebar_position:3},a=void 0,l={id:"frontend-api/pocketto-vue",title:"Vue Composables",description:"Vue Composables API",source:"@site/docs/frontend-api/pocketto-vue.md",sourceDirName:"frontend-api",slug:"/frontend-api/pocketto-vue",permalink:"/docs/frontend-api/pocketto-vue",draft:!1,unlisted:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/frontend-api/pocketto-vue.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_label:"Vue Composables",title:"Vue Composables",sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"React Native Hooks",permalink:"/docs/frontend-api/pocketto-react-native"},next:{title:"Svelte Stores",permalink:"/docs/frontend-api/pocketto-svelte"}},r={},c=[{value:"Vue Composables API",id:"vue-composables-api",level:2},{value:"useRealtimeList",id:"userealtimelist",level:3},{value:"useRealtimeList - Configuration",id:"userealtimelist---configuration",level:3},{value:"useRealtime",id:"userealtime",level:3}];function d(e){const n={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...(0,o.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h2,{id:"vue-composables-api",children:"Vue Composables API"}),"\n",(0,i.jsx)(n.p,{children:"Pocketto provides a set of Vue composables to interact with the Pocketto model in Vue."}),"\n",(0,i.jsx)(n.h3,{id:"userealtimelist",children:"useRealtimeList"}),"\n",(0,i.jsxs)(n.p,{children:["By using ",(0,i.jsx)(n.code,{children:"useRealtimeList()"})," composable, the listing will auto retrieve new model when there is new data."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-html",children:"<script setup lang=\"ts\">\nimport { SalesInvoice } from '@/models/SalesInvoice.p';\nimport { ref } from 'vue';\nimport { useRouter } from 'vue-router';\nimport { useRealtimeList } from 'pocketto-vue';\n\nconst changedItem = ref<SalesInvoice>();\nconst salesInvoices = useRealtimeList(SalesInvoice, {\n  animationDelay: 3000, \n  itemChange: (item) => {\n    changedItem.value = item;\n  },\n});\nconst router = useRouter();\n\nfunction navigateToInvoice(invoice: SalesInvoice) {\n  router.push(`/invoices/${invoice.id}`);\n}\n<\/script>\n\n<template>\n    <div>\n        <div v-for=\"invoice in salesInvoices\" :key=\"invoice.id\" @click=\"navigateToInvoice(invoice)\">\n        <h1>{{ invoice.number }}</h1>\n        </div>\n    </div>\n</template>\n"})}),"\n",(0,i.jsx)(n.h3,{id:"userealtimelist---configuration",children:"useRealtimeList - Configuration"}),"\n",(0,i.jsxs)(n.p,{children:["There is also options that you can pass to ",(0,i.jsx)(n.code,{children:"useRealtimeList()"}),":"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["animationDelay: Delay in milliseconds to wait your custom animation done. Default: ",(0,i.jsx)(n.code,{children:"1ms"}),"."]}),"\n",(0,i.jsxs)(n.li,{children:["condition: A ",(0,i.jsx)(n.a,{href:"/docs/data-modelling/query-builder#complex-queries---callback",children:"query builder"})," condition to filter and sorting the data."]}),"\n",(0,i.jsxs)(n.li,{children:["onItemChange: Callback when the item is changed. After the ",(0,i.jsx)(n.code,{children:"animationDelay"})," is done, it will emit ",(0,i.jsx)(n.code,{children:"undefined"}),"."]}),"\n",(0,i.jsxs)(n.li,{children:["onItemCreate: Callback when the item is created. After the ",(0,i.jsx)(n.code,{children:"animationDelay"})," is done, it will emit ",(0,i.jsx)(n.code,{children:"undefined"}),"."]}),"\n",(0,i.jsxs)(n.li,{children:["onItemUpdate: Callback when the item is updated. After the ",(0,i.jsx)(n.code,{children:"animationDelay"})," is done, it will emit ",(0,i.jsx)(n.code,{children:"undefined"}),"."]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"Example:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-html",children:"<script setup lang=\"ts\">\nimport { SalesInvoice } from '@/models/SalesInvoice.p';\nimport { ref } from 'vue';\nimport { useRealtimeList } from 'pocketto-vue';\n\nconst changedItem = ref<SalesInvoice>();\nconst salesInvoices = useRealtimeList(SalesInvoice, {\n  animationDelay: 3000, \n  condition: (query) => query.where('status', 'draft').orderBy('date', 'desc'),\n  itemChange: (item) => {\n    changedItem.value = item;\n  },\n});\n<\/script>\n"})}),"\n",(0,i.jsx)(n.h3,{id:"userealtime",children:"useRealtime"}),"\n",(0,i.jsxs)(n.p,{children:["By using ",(0,i.jsx)(n.code,{children:"useRealtime()"})," hook, it will auto reflected to other similar page that have same model id."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-html",children:"<script setup lang=\"ts\">\nimport { SalesInvoice } from '@/models/SalesInvoice.p';\nimport { ref } from 'vue';\nimport { useRealtime } from 'pocketto-vue';\n\nconst route = useRoute();\nconst router = useRouter();\nconst id = route.params.id;\nconst invoice = useRealtime(SalesInvoice, id);\n\nwatch(() => route.params.id, (newId, oldId) => {\n  if (newId !== oldId) {\n    invoice = useRealtime(SalesInvoice, newId as string);\n  }\n});\n<\/script>\n\n<template>\n    <div>\n        <h1>{{ invoice.number }}</h1>\n\n        <input v-model=\"invoice.number\" />\n        {/* trigger save to submit to the database */}\n        <button @click=\"invoice.save()\">Save</button>\n    </div>\n</template>\n"})})]})}function u(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>a,x:()=>l});var i=t(6540);const o={},s=i.createContext(o);function a(e){const n=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:a(e.components),i.createElement(s.Provider,{value:n},e.children)}}}]);