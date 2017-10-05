webpackJsonp([1],{"15xn":function(t,a){},"1ImC":function(t,a){},"4xjk":function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"card rounded-0 mt-4 shadow-1"},[e("h4",{staticClass:"card-header text-center"},[t._v("\n        Search "+t._s(t.globalConfig.dbName)+"\n    ")]),t._v(" "),e("div",{staticClass:"card-body rounded-0"},[e("form",{on:{submit:function(a){a.preventDefault(),t.submitForm(a)}}},[t._m(0),t._v(" "),e("div",{staticClass:"row"},[e("div",{staticClass:"col"},t._l(t.globalConfig.metadataFields.source,function(a){return e("div",{key:a.label,staticClass:"input-group rounded-0 pb-3"},[e("span",{staticClass:"input-group-addon rounded-0"},[t._v(t._s(a.label))]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.formValues[a.value],expression:"formValues[field.value]"}],staticClass:"form-control",attrs:{type:"text",name:a.value},domProps:{value:t.formValues[a.value]},on:{input:function(e){e.target.composing||t.$set(t.formValues,a.value,e.target.value)}}})])})),t._v(" "),e("div",{staticClass:"col border border-top-0 border-right-0 border-bottom-0"},t._l(t.globalConfig.metadataFields.target,function(a){return e("div",{key:a.label,staticClass:"input-group pb-3"},[e("span",{staticClass:"input-group-addon rounded-0"},[t._v(t._s(a.label))]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.formValues[a.value],expression:"formValues[field.value]"}],staticClass:"form-control",attrs:{type:"text",name:a.value},domProps:{value:t.formValues[a.value]},on:{input:function(e){e.target.composing||t.$set(t.formValues,a.value,e.target.value)}}})])}))]),t._v(" "),t._m(1),t._v(" "),e("div",{staticClass:"tab-content mt-3",attrs:{id:"myTabContent"}},[e("div",{staticClass:"tab-pane fade show active",attrs:{id:"search-alignments",role:"tabpanel","aria-labelledby":"search-alignments-tab"}},[e("button",{staticClass:"btn btn-primary rounded-0",attrs:{type:"submit"}},[t._v("Search")]),t._v(" "),e("button",{staticClass:"btn btn-secondary rounded-0",attrs:{type:"button"},on:{click:function(a){t.clearForm()}}},[t._v("Reset")])]),t._v(" "),e("div",{staticClass:"tab-pane fade",attrs:{id:"graph",role:"tabpanel","aria-labelledby":"graph-tab"}},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-1"},[t._v("\n                            Source metadata:\n                        ")]),t._v(" "),e("div",{staticClass:"col-2"},[e("div",{staticClass:"my-dropdown"},[e("button",{staticClass:"btn btn-light rounded-0",on:{click:function(a){t.toggleDropdown("source")}}},[t._v(t._s(t.formGraphValues.source.label)+" ▾")]),t._v(" "),t.dropdownShow.source?e("ul",{staticClass:"my-dropdown-menu shadow-1"},t._l(t.globalConfig.metadataFields.source,function(a){return e("li",{key:a.label,staticClass:"my-dropdown-item",on:{click:function(e){t.selectItem("source",a)}}},[t._v(t._s(a.label))])})):t._e()])])]),t._v(" "),e("div",{staticClass:"row mt-3"},[e("div",{staticClass:"col-1"},[t._v("\n                            Target metadata:\n                        ")]),t._v(" "),e("div",{staticClass:"col-2"},[e("div",{staticClass:"my-dropdown"},[e("button",{staticClass:"btn btn-light rounded-0",on:{click:function(a){t.toggleDropdown("target")}}},[t._v(t._s(t.formGraphValues.target.label)+" ▾")]),t._v(" "),t.dropdownShow.target?e("ul",{staticClass:"my-dropdown-menu shadow-1"},t._l(t.globalConfig.metadataFields.target,function(a){return e("li",{key:a.label,staticClass:"my-dropdown-item",on:{click:function(e){t.selectItem("target",a)}}},[t._v(t._s(a.label))])})):t._e()])])]),t._v(" "),e("div",{staticClass:"mt-3"},[e("button",{staticClass:"btn btn-primary rounded-0",attrs:{type:"button"},on:{click:function(a){t.getGraphData()}}},[t._v("Display network graph")]),t._v(" "),e("button",{staticClass:"btn btn-secondary rounded-0",attrs:{type:"button"},on:{click:function(a){t.clearForm()}}},[t._v("Reset")])])])])])])])},r=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"row"},[e("div",{staticClass:"col"},[e("h6",{staticClass:"text-center pb-2"},[t._v("\n                        Source\n                    ")])]),t._v(" "),e("div",{staticClass:"col border border-top-0 border-right-0 border-bottom-0"},[e("h6",{staticClass:"text-center pb-2"},[t._v("\n                        Target\n                    ")])])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("ul",{staticClass:"nav nav-tabs",attrs:{id:"myTab",role:"tablist"}},[e("li",{staticClass:"nav-item"},[e("a",{staticClass:"nav-link active",attrs:{id:"search-alignments-tab","data-toggle":"tab",href:"#search-alignments",role:"tab","aria-controls":"search-alignments","aria-expanded":"true"}},[t._v("Search Alignments")])]),t._v(" "),e("li",{staticClass:"nav-item"},[e("a",{staticClass:"nav-link",attrs:{id:"graph-tab","data-toggle":"tab",href:"#graph",role:"tab","aria-controls":"graph","aria-expanded":"true"}},[t._v("Display Network")])])])}],n={render:s,staticRenderFns:r};a.a=n},"8R6f":function(t,a,e){"use strict";var s=e("BO1k"),r=e.n(s);a.a={name:"graphResults",data:function(){return{graphResults:null,loading:null,error:null}},created:function(){this.fetchData()},watch:{$route:"fetchData",graphResults:"drawGraph"},methods:{fetchData:function(){var t=this;this.graphResults=null;var a=this.cloneObject(this.$route.query);a.db_table=this.$globalConfig.databaseName,this.loading=!0,this.$http.get(this.$globalConfig.apiServer+"/search_alignments_full/?",{params:a}).then(function(a){t.graphResults=a.data}).catch(function(a){t.loading=!1,t.error=a.toString(),console.log(a)})},drawGraph:function(){var t={},a=0,e=[],s=[],n=!0,i=!1,o=void 0;try{for(var l,c=r()(this.graphResults.results.slice(0,100));!(n=(l=c.next()).done);n=!0){var u=l.value,d=u[0],v=u[1];t.hasOwnProperty(d)||(t[d]=a,e.push({id:a,label:d}),a++),t.hasOwnProperty(v)||(t[v]=a,e.push({id:a,label:v}),a++),s.push({from:t[d],to:t[v]})}}catch(t){i=!0,o=t}finally{try{!n&&c.return&&c.return()}finally{if(i)throw o}}console.log(a),console.log(e,s),this.loading=!1}}}},"90Mm":function(t,a,e){"use strict";var s=e("BO1k"),r=e.n(s),n=e("NHnr");a.a={name:"search-form",data:function(){return{globalConfig:this.$globalConfig,formValues:this.populateSearchForm(),formGraphValues:{source:this.$globalConfig.metadataFields.source[0],target:this.$globalConfig.metadataFields.target[0]},dropdownShow:{source:!1,target:!1}}},created:function(){var t=this;n.EventBus.$on("urlUpdate",function(a){for(var e in a)e in t.formValues&&a[e]!=t.formValues[e]&&(t.formValues[e]=a[e])})},methods:{populateSearchForm:function(){var t={};if(this.$route.query){var a=!0,e=!1,s=void 0;try{for(var n,i=r()(this.$globalConfig.metadataFields.source);!(a=(n=i.next()).done);a=!0){var o=n.value;o.value in this.$route.query&&(t[o.value]=this.$route.query[o.value])}}catch(t){e=!0,s=t}finally{try{!a&&i.return&&i.return()}finally{if(e)throw s}}var l=!0,c=!1,u=void 0;try{for(var d,v=r()(this.$globalConfig.metadataFields.target);!(l=(d=v.next()).done);l=!0){var h=d.value;h.value in this.$route.query&&(t[h.value]=this.$route.query[h.value])}}catch(t){c=!0,u=t}finally{try{!l&&v.return&&v.return()}finally{if(c)throw u}}}else t.page=1;return t},submitForm:function(){this.$router.push("/search?"+this.paramsToUrl(this.formValues))},clearForm:function(){for(var t in this.formValues)this.formValues[t]=""},toggleDropdown:function(t){this.dropdownShow[t]?this.dropdownShow[t]=!1:this.dropdownShow[t]=!0},selectItem:function(t,a){this.formGraphValues[t]=a,this.toggleDropdown(t)},getGraphData:function(){this.$router.push("/graph?"+this.paramsToUrl({source:this.formGraphValues.source.value,target:this.formGraphValues.target.value}))}}}},"9IW3":function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"mt-5"},[e("div",{staticClass:"row"},[t.loading?e("div",{staticClass:"loading"},[t._v("\n            Loading...\n        ")]):t._e(),t._v(" "),t.error?e("div",{staticClass:"error"},[t._v("\n            "+t._s(t.error)+"\n        ")]):t._e(),t._v(" "),e("div",{staticClass:"col"},[e("transition-group",{attrs:{name:"staggered-fade",tag:"div",css:!1},on:{"before-enter":t.beforeEnter,enter:t.enter}},t._l(t.results.alignments,function(a,s){return e("div",{key:t.results.start_position+s+1,staticClass:"card mb-3 rounded-0 shadow-1",staticStyle:{position:"relative"},attrs:{"data-index":s}},[e("div",{staticClass:"border border-top-0 border-left-0",staticStyle:{position:"absolute",padding:"5px",overflow:"hidden"}},[t._v("\n                        "+t._s(t.results.start_position+s+1)+"\n                    ")]),t._v(" "),e("div",{staticClass:"row"},[e("div",{staticClass:"col mt-4"},[e("h6",{staticClass:"text-center pb-2"},[t._v("\n                                Source\n                            ")]),t._v(" "),e("p",{staticClass:"pt-3 px-3"},[t._v("\n                                "+t._s(a.source_author)+"\n                                "),e("i",[t._v(t._s(a.source_title))]),t._v(" ["+t._s(a.source_year)+"]\n                            ")])]),t._v(" "),e("div",{staticClass:"col mt-4 border border-top-0 border-right-0 border-bottom-0"},[e("h6",{staticClass:"text-center pb-2"},[t._v("\n                                Target\n                            ")]),t._v(" "),e("p",{staticClass:"pt-3 px-3"},[t._v("\n                                "+t._s(a.target_author)+",\n                                "),e("i",[t._v(t._s(a.target_title))]),t._v(" ["+t._s(a.target_year)+"]\n                            ")])])]),t._v(" "),e("div",{staticClass:"row"},[e("div",{staticClass:"col mb-2"},[e("p",{staticClass:"card-text text-justify px-3 pt-2 pb-4 mb-4"},[t._v("\n                                "+t._s(a.source_context_before)+"\n                                "),e("span",{staticStyle:{color:"red"}},[t._v(t._s(a.source_passage))]),t._v("\n                                "+t._s(a.source_context_after)+"\n                            ")]),t._v(" "),e("a",{staticClass:"card-link px-3 pt-2",staticStyle:{position:"absolute",bottom:"0"},on:{click:function(e){t.goToContext(a.source_link_to_philologic)}}},[t._v("View passage in context")])]),t._v(" "),e("div",{staticClass:"col mb-2 border border-top-0 border-right-0 border-bottom-0"},[e("p",{staticClass:"card-text text-justify px-3 pt-2 pb-4 mb-4"},[t._v("\n                                "+t._s(a.target_context_before)+"\n                                "),e("span",{staticStyle:{color:"red"}},[t._v(t._s(a.target_passage))]),t._v("\n                                "+t._s(a.target_context_after)+"\n                            ")]),t._v(" "),e("a",{staticClass:"card-link px-3 pt-2",staticStyle:{position:"absolute",bottom:"0"},on:{click:function(e){t.goToContext(a.target_link_to_philologic)}}},[t._v("View passage in context")])])]),t._v(" "),e("div",{staticClass:"text-muted text-center mb-1 py-1",staticStyle:{"font-size":"90%"}},[t._v("\n                        "+t._s(a.passage_similarity)+" similar\n                    ")])])}))],1),t._v(" "),e("div",{staticClass:"col-3 pl-0"},[e("div",{staticClass:"card rounded-0 shadow-1"},[e("h6",{staticClass:"card-header text-center"},[t._v("Browse by Metadata Counts")]),t._v(" "),e("div",{staticClass:"mt-3 p-3"},[e("h6",{staticClass:"text-center"},[t._v("Source")]),t._v(" "),e("div",{staticClass:"list-group"},t._l(t.globalConfig.metadataFields.source,function(a,s){return e("button",{key:s,staticClass:"list-group-item list-group-item-action",attrs:{type:"button"},on:{click:function(e){t.facetSearch(a.value)}}},[t._v("\n                            "+t._s(a.label)+"\n                        ")])}))]),t._v(" "),e("div",{staticClass:"mt-3 p-3"},[e("h6",{staticClass:"text-center"},[t._v("Target")]),t._v(" "),e("div",{staticClass:"list-group"},t._l(t.globalConfig.metadataFields.target,function(a,s){return e("button",{key:s,staticClass:"list-group-item list-group-item-action",attrs:{type:"button"},on:{click:function(e){t.facetSearch(a.value)}}},[t._v("\n                            "+t._s(a.label)+"\n                        ")])}))])]),t._v(" "),t.facetResults?e("div",{staticClass:"card rounded-0 shadow-1 mt-3"},[e("h6",{staticClass:"card-header text-center"},[t._v("Frequency by "+t._s(t.facetResults.facet))]),t._v(" "),e("div",{staticClass:"mt-3 p-3"},[e("div",{staticClass:"list-group"},t._l(t.facetResults.results,function(a,s){return e("div",{key:s,staticClass:"list-group-item list-group-item-action facet-result",on:{click:function(e){t.filteredSearch(t.facetResults.facet,a.field)}}},[e("div",{staticClass:"row"},[e("div",{staticClass:"col"},[t._v(t._s(a.field))]),t._v(" "),e("div",{staticClass:"col-4 facet-count"},[t._v(t._s(a.count))])])])}))])]):t._e()])]),t._v(" "),t.done?e("nav",{attrs:{"aria-label":"Page navigation"}},[e("ul",{staticClass:"pagination justify-content-center mb-4"},[t.results.page>1?e("li",{staticClass:"page-item"},[e("a",{staticClass:"page-link",attrs:{"aria-label":"Previous"},on:{click:function(a){t.previousPage()}}},[e("span",{attrs:{"aria-hidden":"true"}},[t._v("«")]),t._v(" "),e("span",{staticClass:"sr-only"},[t._v("Previous")])])]):t._e(),t._v(" "),e("li",{staticClass:"page-item"},[e("a",{staticClass:"page-link"},[t._v("Page "+t._s(t.results.page))])]),t._v(" "),""!=t.results.next_url?e("li",{staticClass:"page-item"},[e("a",{staticClass:"page-link",attrs:{"aria-label":"Next"},on:{click:function(a){t.nextPage()}}},[e("span",{attrs:{"aria-hidden":"true"}},[t._v("»")]),t._v(" "),e("span",{staticClass:"sr-only"},[t._v("Next")])])]):t._e()])]):t._e()])},r=[],n={render:s,staticRenderFns:r};a.a=n},BH4K:function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{attrs:{id:"app"}},[e("div",{staticClass:"container-fluid"},[e("search-form"),t._v(" "),e("router-view")],1)])},r=[],n={render:s,staticRenderFns:r};a.a=n},ED2W:function(t,a,e){"use strict";var s=e("8R6f"),r=e("N44i"),n=e("VU/8"),i=n(s.a,r.a,null,null,null);a.a=i.exports},EIYC:function(t,a,e){"use strict";var s=e("NHnr");a.a={name:"searchResults",data:function(){return{loading:!1,done:!1,results:{alignments:[]},error:null,globalConfig:this.$globalConfig,facetResults:null,facetLoading:null}},created:function(){this.fetchData()},watch:{$route:"fetchData"},methods:{fetchData:function(){var t=this;this.results={alignments:[]},this.facetResults=null;var a=this.cloneObject(this.$route.query);a.db_table=this.$globalConfig.databaseName,this.$http.get(this.$globalConfig.apiServer+"/search_alignments/?",{params:a}).then(function(a){t.results=a.data,t.loading=!1,t.done=!0}).catch(function(a){t.loading=!1,t.error=a.toString(),console.log(a)})},goToContext:function(t){this.$http.get(this.$globalConfig.apiServer+"/"+t).then(function(t){window.open(t.data.link,"_blank")}).catch(function(t){alert(t)})},previousPage:function(){var t=this.cloneObject(this.$route.query);t.page=parseInt(this.results.page)-1,t.direction="previous",t.id_anchor=this.results.alignments[0].rowid_ordered,this.$router.push("/search?"+this.paramsToUrl(t))},nextPage:function(t){var a=this.cloneObject(this.$route.query);a.page=parseInt(this.results.page)+1,a.direction="next",a.id_anchor=this.results.alignments[this.results.alignments.length-1].rowid_ordered,this.$router.push("/search?"+this.paramsToUrl(a))},facetSearch:function(t){var a=this,e=this.cloneObject(this.$route.query);delete e.page,delete e.id_anchor,e.db_table=this.$globalConfig.databaseName,e.facet=t,this.facetLoading=!0,this.$http.get(this.$globalConfig.apiServer+"facets/?",{params:e}).then(function(t){a.facetResults=t.data}).catch(function(t){a.facetLoading=!1,a.error=t.toString(),console.log("ERROR",t)})},filteredSearch:function(t,a){var e=this.cloneObject(this.$route.query);e.db_table=this.$globalConfig.databaseName,e[t]=a,s.EventBus.$emit("urlUpdate",e),this.facetResults=null,this.results={alignments:[]},this.$router.push("/search?"+this.paramsToUrl(e))},beforeEnter:function(t){t.style.opacity=0,t.style.height=0},enter:function(t,a){var e=100*t.dataset.index;setTimeout(function(){Velocity(t,{opacity:1,height:"100%"},{complete:a})},e)}}}},IcnI:function(t,a,e){"use strict";var s=e("7+uW"),r=e("NYxO");s.a.use(r.a);a.a=new r.a.Store({strict:!1,state:{currentQuery:{}}})},M93x:function(t,a,e){"use strict";function s(t){e("1ImC")}var r=e("xJD8"),n=e("BH4K"),i=e("VU/8"),o=s,l=i(r.a,n.a,o,null,null);a.a=l.exports},N44i:function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"card mb-3 rounded-0 shadow-1 mt-5 p-4",attrs:{id:"graph-results"}},[t.loading?e("div",{staticClass:"loading"},[t._v("\n        Loading...\n    ")]):t._e(),t._v(" "),t.error?e("div",{staticClass:"error"},[t._v("\n        "+t._s(t.error)+"\n    ")]):t._e(),t._v(" "),e("div",{attrs:{id:"graph"}})])},r=[],n={render:s,staticRenderFns:r};a.a=n},NHnr:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),e.d(a,"EventBus",function(){return v});var s=e("7+uW"),r=e("M93x"),n=e("YaEn"),i=e("IcnI"),o=e("mtWM"),l=e.n(o),c=e("9qgI"),u=(e.n(c),e("fcm7")),d=e.n(u);s.a.config.productionTip=!1,s.a.prototype.$http=l.a,s.a.prototype.$globalConfig=d.a;var v=new s.a;s.a.mixin({methods:{paramsToUrl:function(t){var a=[];for(var e in t)a.push(e+"="+encodeURIComponent(t[e]));return a.join("&")},cloneObject:function(t){var a={};for(var e in t)a[e]=t[e];return a}}}),new s.a({el:"#app",router:n.a,store:i.a,template:"<App/>",components:{App:r.a}})},"YGN+":function(t,a,e){"use strict";function s(t){e("wv29")}var r=e("90Mm"),n=e("4xjk"),i=e("VU/8"),o=s,l=i(r.a,n.a,o,null,null);a.a=l.exports},YaEn:function(t,a,e){"use strict";var s=e("7+uW"),r=e("/ocq"),n=e("ibwM"),i=e("ED2W");s.a.use(r.a),a.a=new r.a({mode:"history",routes:[{path:"/search",name:"searchResults",component:n.a},{path:"/graph",name:"graphResults",component:i.a}],scrollBehavior:function(t,a,e){return e||{x:0,y:0}}})},fcm7:function(t,a){t.exports={apiServer:"http://condorcet.uchicago.edu/alignment/",databaseName:"frantext",databaseLabel:"Frantext alignments",metadataFields:{source:[{label:"Title",value:"source_title"},{label:"Author",value:"source_author"},{label:"Year",value:"source_year"}],target:[{label:"Title",value:"target_title"},{label:"Author",value:"target_author"},{label:"Year",value:"target_year"}]},facetsFields:{source:[{label:"Title",value:"source_title"},{label:"Author",value:"source_author"},{label:"Year",value:"source_year"}],target:[{label:"Title",value:"target_title"},{label:"Author",value:"target_author"},{label:"Year",value:"target_year"}]}}},ibwM:function(t,a,e){"use strict";function s(t){e("15xn")}var r=e("EIYC"),n=e("9IW3"),i=e("VU/8"),o=s,l=i(r.a,n.a,o,null,null);a.a=l.exports},wv29:function(t,a){},xJD8:function(t,a,e){"use strict";var s=e("YGN+");a.a={name:"app",components:{searchForm:s.a}}}},["NHnr"]);
//# sourceMappingURL=app.9a0502d2b89bf96960c0.js.map