"use strict";(self.webpackChunkpocketto_docs=self.webpackChunkpocketto_docs||[]).push([[1097],{5352:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>a,contentTitle:()=>l,default:()=>u,frontMatter:()=>s,metadata:()=>r,toc:()=>d});var o=t(4848),i=t(8453);const s={sidebar_label:"Environment Setup",title:"Environment Setup",sidebar_position:2},l=void 0,r={id:"environment-setup",title:"Environment Setup",description:"Introduction",source:"@site/docs/environment-setup.md",sourceDirName:".",slug:"/environment-setup",permalink:"/docs/environment-setup",draft:!1,unlisted:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/environment-setup.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_label:"Environment Setup",title:"Environment Setup",sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Introduction",permalink:"/docs/intro"},next:{title:"Installation"}},a={},d=[{value:"Introduction",id:"introduction",level:3},{value:"Prerequisites",id:"prerequisites",level:3},{value:"Platform Installation",id:"platform-installation",level:3},{value:"Debug for npm/yarn install",id:"debug-for-npmyarn-install",level:3}];function c(e){const n={a:"a",code:"code",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,i.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.h3,{id:"introduction",children:"Introduction"}),"\n",(0,o.jsx)(n.p,{children:"Before you start using Pocketto, you need to set up your environment. This guide will help you set up your environment to start using Pocketto."}),"\n",(0,o.jsx)(n.h3,{id:"prerequisites",children:"Prerequisites"}),"\n",(0,o.jsx)(n.p,{children:"Before you start setting up your environment, make sure you have the following installed:"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.a,{href:"https://couchdb.apache.org/#download",children:"CouchDB"}),", a real-time NoSQL database that allows you to store your data in local as well as in the cloud."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.a,{href:"https://nodejs.org/en/download/",children:"Node.js"}),", version 14 or above is recommended."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.a,{href:"https://www.python.org/downloads/",children:"python"}),". In order to build native modules of npm modules: leveldown, sqlite3, etc."]}),"\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://github.com/nodejs/node-gyp",children:"node-gyp"})}),"\n"]}),"\n",(0,o.jsx)(n.h3,{id:"platform-installation",children:"Platform Installation"}),"\n",(0,o.jsx)(n.p,{children:"Depending on your project platform, you can pick one of the following installation methods:"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"/docs/installation/react",children:"React"})}),"\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"/docs/installation/react-native",children:"React Native"})}),"\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"/docs/installation/vue",children:"Vue.js"})}),"\n"]}),"\n",(0,o.jsx)(n.h3,{id:"debug-for-npmyarn-install",children:"Debug for npm/yarn install"}),"\n",(0,o.jsxs)(n.p,{children:["If you found the issue for the python dependencies problem ",(0,o.jsx)(n.code,{children:"ModuleNotFoundError: No module named 'distutils'"}),", you can try the following"]}),"\n",(0,o.jsxs)(n.ol,{children:["\n",(0,o.jsx)(n.li,{children:"Install python 3.8 or above"}),"\n",(0,o.jsxs)(n.li,{children:["Install the ",(0,o.jsx)(n.code,{children:"distutils"})," package by running the following command:\nvenv init"]}),"\n"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"python -m venv venv\nsource venv/bin/activate\npip install distutils\n"})}),"\n",(0,o.jsxs)(n.ol,{start:"3",children:["\n",(0,o.jsx)(n.li,{children:"Install node-gyp globally by running the following command:"}),"\n"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"npm install -g node-gyp\n"})}),"\n",(0,o.jsx)(n.p,{children:"You can now proceed with the installation of Pocketto in your project."})]})}function u(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(c,{...e})}):c(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>l,x:()=>r});var o=t(6540);const i={},s=o.createContext(i);function l(e){const n=o.useContext(s);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:l(e.components),o.createElement(s.Provider,{value:n},e.children)}}}]);