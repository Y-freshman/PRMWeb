(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-0bc1"],{"6Qjy":function(t,e,n){},A947:function(t,e,n){"use strict";n.r(e);var a=n("rfXi"),o=n.n(a),s=n("gDS+"),i=n.n(s),r=n("ODRq"),l=n.n(r),c=n("YEIV"),u=n.n(c),d=(n("a/tU"),n("C0Ld")),g=(n("9Eyt"),n("39pj"),n("jmkI"),n("THdl"),n("n/nR"),n("U8Sb"),{name:"gantt",props:{tasks:{type:Object}},created:function(){console.log("proggtannakakak ********************************"),gantt.$_eventsInitialized=!1,$(".gantt_tooltip").css("display","block")},data:function(){return{options:[]}},methods:{initGanttEvents:function(){var t=this;gantt.$_eventsInitialized||Object(d.c)().then(function(t){gantt.locale.labels.section_user="成员",gantt.locale.labels.section_description="描述",gantt.config.lightbox.sections=[{name:"description",height:60,map_to:"description",type:"textarea",focus:!0},{name:"user",height:38,map_to:"user",type:"propselect",focus:!0,options:t.data},{name:"time",height:38,map_to:"auto",type:"duration",time_format:["%Y","%m","%d"]}]}),gantt.attachEvent("onBeforeLightbox",function(t){gantt.getTask(t);return!0}),gantt.attachEvent("onTaskSelected",function(e){var n=gantt.getTask(e);t.$emit("task-selected",n)}),gantt.attachEvent("onAfterTaskAdd",function(e,n){t.$emit("task-updated",e,"inserted",n),n.progress=n.progress||0,gantt.getSelectedId()==e&&t.$emit("task-selected",n)}),gantt.attachEvent("onAfterTaskUpdate",function(e,n){t.$emit("task-updated",e,"updated",n)}),gantt.attachEvent("onAfterTaskDelete",function(e,n){t.$emit("task-updated",e,"deleted",n),gantt.getSelectedId()||t.$emit("task-selected",null)})}},beforeMount:function(){var t;gantt.config.grid_elastic_columns=!0,gantt.config.layout={css:"gantt_container",rows:[{cols:[{width:400,group:"grids",rows:[{view:"grid",scrollable:!1,scrollX:"gridScroll",scrollY:"scrollVer"},{view:"scrollbar",id:"gridScroll",group:"horizontal"}]},{resizer:!1,width:1},{rows:[{view:"timeline",scrollX:"scrollHor",scrollY:"scrollVer"},{view:"scrollbar",id:"scrollHor",group:"horizontal"}]},{view:"scrollbar",id:"scrollVer"}]}]},gantt.config.min_column_width=80;var e={minColumnWidth:80,maxColumnWidth:160,levels:[[{unit:"day",format:"%M%d",step:1}],[{unit:"month",format:"%Y/%M",step:1},{unit:"week",step:1,format:function(t){var e=gantt.date.date_to_str("%M%d"),n=gantt.date.add(gantt.date.add(t,1,"week"),-1,"day");return e(t)+" - "+e(n)}}],[{unit:"month",step:1,format:"%M"},{unit:"quarter",step:1,format:function(t){var e=gantt.date.date_to_str("%M"),n=gantt.date.add(gantt.date.add(t,3,"month"),-1,"day");return e(t)+" - "+e(n)}}],[{unit:"year",step:1,format:"%Y"}]],useKey:"ctrlKey",trigger:"wheel",element:function(){return gantt.$root.querySelector(".gantt_task")}};gantt.ext.zoom.init(e),gantt.templates.scale_cell_class=function(t){if(0==t.getDay()||6==t.getDay())return"weekend"},gantt.templates.task_class=gantt.templates.grid_row_class=function(t,e,n){return 0==n.$level?"gantt_project":"user"},gantt.templates.task_text=function(t,e,n){return 0==n.$level?n.tnt:n.user},gantt.config.columns=[(t={name:"tnt",label:"项目",tree:!0,min_width:"*"},u()(t,"min_width",160),u()(t,"max_width",250),u()(t,"resize",!0),t),{name:"start_date",align:"center",width:90,resize:!0},{name:"duration",width:50,align:"center",resize:!0},{name:"add",width:34,resize:!0}],gantt.config.autofit=!1,gantt.config.grid_width=360,gantt.templates.tooltip_text=function(t,e,n){return 0==n.$level?"<b>项目名称:</b> "+n.tnt+"<br/><b>完成进度:</b> "+Math.round(100*n.progress)+"%<br/><b>开始时间:</b> "+gantt.templates.tooltip_date_format(t)+"<br/><b>结束时间:</b> "+gantt.templates.tooltip_date_format(e):"<b>项目成员:</b> "+n.user+"<br/><b>开始时间:</b> "+gantt.templates.tooltip_date_format(t)+"<br/><b>结束时间:</b> "+gantt.templates.tooltip_date_format(e)},gantt.attachEvent("onLightboxSave",function(t,e){return e.tnt=e.user,!0}),gantt.attachEvent("onBeforeLightbox",function(t){return 0!=gantt.getTask(t).$level}),gantt.config.drag_multiple=!0,gantt.config.drag_progress=!1,gantt.config.drag_move=!0,gantt.config.reorder_grid_columns=!0,gantt.config.order_branch=!0,gantt.config.order_branch="marker",gantt.attachEvent("onBeforeTaskMove",function(t,e,n){return 0!=gantt.getTask(t).$level||(gantt.message({type:"confirm-warning",text:"任务不能拖成项目！"}),!1)}),$(".gantt_tooltip").css("display","block")},mounted:function(){gantt.$_eventsInitialized=!1,this.initGanttEvents(),gantt.init(document.getElementById("propGantt"))},destroyed:function(){$(".gantt_tooltip").css("display","none")}}),f=(n("jGaK"),n("KHd+")),p=Object(f.a)(g,function(){var t=this.$createElement;return(this._self._c||t)("div",{attrs:{id:"propGantt"}})},[],!1,null,null,null);p.options.__file="propGantt.vue";var m=p.exports,h=n("k7+O"),v=n.n(h),k={name:"resourceScheduling",components:{Gantt:m},provide:function(){return{reload:this.reload}},data:function(){return{Screenclose:!0,loading:!1,isRouterAlive:!1,total:0,tasks:{data:[]},selectedTask:null,updatedTask:new l.a,messages:[],value:"",radios:""}},filters:{toPercent:function(t){return t?Math.round(100*+t):"0"},niceDate:function(t){return console.log(t.getMonth()+1),t.getFullYear()+" / "+(t.getMonth()+1)+" / "+t.getDate()}},created:function(){this.getAll(),this.radios=document.getElementsByName("scale");for(var t=0;t<radios.length;t++)radios[t].onclick=function(t){gantt.ext.zoom.setLevel(t.target.value)}},destroyed:function(){$(".gantt_tooltip").css("display","none")},methods:{clickFullscreen:function(){if(!v.a.isEnabled)return this.$message({message:"you browser can not work",type:"warning"}),!1;this.Screenclose=!this.Screenclose,v.a.toggle()},zoomIn:function(){gantt.ext.zoom.zoomIn()},zoomOut:function(){gantt.ext.zoom.zoomOut()},selectTask:function(t){this.selectedTask=t},getAll:function(){var t=this;Object(d.a)().then(function(e){t.tasks.data=[],t.tasks.data=e.data,gantt.clearAll(),gantt.parse(t.tasks)}).catch(function(e){t.$message.error({title:"失败",message:"获取数据失败"})})},addMessage:function(t){this.messages.unshift(t),this.messages.length>40&&this.messages.pop()},logTaskUpdate:function(t,e,n){n&&n.text&&n.text;var a=this.updatedTask.get(t);a?"inserted"==a.mode&&"deleted"==e?this.updatedTask.delete(t):this.updatedTask.set(t,a):((a=n).mode=e,this.updatedTask.set(t,a))},logLinkUpdate:function(t,e,n){var a="Link "+e+": "+t;n&&(a+=" ( source: "+n.source+", target: "+n.target+" )"),this.addMessage(a)},change:function(t){var e=this;if(""!=this.value||null!=this.value){var n=i()(this.value);Object(d.b)(n).then(function(t){e.tasks.data=[],e.tasks.data=t.data,gantt.clearAll(),gantt.parse(e.tasks)}).catch(function(t){e.$message.error({title:"失败",message:"获取数据失败"})})}""!=this.value&&null!=this.value||Object(d.a)().then(function(t){e.tasks.data=[],e.tasks.data=t.data,gantt.clearAll(),gantt.parse(e.tasks)}).catch(function(t){e.$message.error({title:"失败",message:"获取数据失败"})})},Save:function(){var t=this,e=o()(this.updatedTask),n=i()(e);console.log(n),Object(d.d)(n).then(function(e){t.isRouterAlive=!0,t.$message.success({title:"成功",message:"修改成功"}),t.updatedTask.clear()}).catch(function(e){t.$message.error({title:"失败",message:"修改失败"})})}}},_=(n("LmYw"),Object(f.a)(k,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"app-container"},[n("div",{staticClass:"filter-container"},[n("el-date-picker",{staticStyle:{float:"left"},attrs:{type:"month","value-format":"yyyy-MM-dd",placeholder:"按月份查找资源排程"},on:{change:t.change},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}}),t._v(" "),n("el-button",{staticClass:"filter-item",attrs:{type:"primary"},on:{click:function(e){return t.Save()}}},[t._v("保存")]),t._v(" "),n("el-button",{staticClass:"filter-item",attrs:{icon:"el-icon-zoom-in",type:"primary"},on:{click:function(e){return t.zoomIn()}}}),t._v(" "),n("el-button",{staticClass:"filter-item",attrs:{icon:"el-icon-zoom-out",type:"primary"},on:{click:function(e){return t.zoomOut()}}}),t._v(" "),t.Screenclose?n("el-button",{staticClass:"filter-item",attrs:{icon:"el-icon-full-screen",type:"primary"},on:{click:function(e){return t.clickFullscreen()}}}):n("el-button",{staticClass:"filter-item",attrs:{icon:"el-icon-rank",type:"primary"},on:{click:function(e){return t.clickFullscreen()}}})],1),t._v(" "),t.isRouterAlive?n("router-view"):t._e(),t._v(" "),n("gantt",{staticClass:"left-container",attrs:{tasks:t.tasks},on:{"task-updated":t.logTaskUpdate,"link-updated":t.logLinkUpdate,"task-selected":t.selectTask}})],1)},[],!1,null,null,null));_.options.__file="resourceScheduling.vue";e.default=_.exports},C0Ld:function(t,e,n){"use strict";n.d(e,"d",function(){return o}),n.d(e,"a",function(){return s}),n.d(e,"b",function(){return i}),n.d(e,"c",function(){return r});var a=n("t3Un");function o(t){return Object(a.a)({url:"/prop/save",method:"post",data:t})}function s(){return Object(a.a)({url:"/prop/getAllProjectPlan",method:"get"})}function i(t){return Object(a.a)({url:"/prop/getAllProjectPlanByTime",method:"post",data:t})}function r(){return Object(a.a)({url:"/users/getAllUserKey",method:"get"})}},LmYw:function(t,e,n){"use strict";var a=n("qKuA");n.n(a).a},U8Sb:function(t,e){!function(){function t(t){t.form_blocks.propselect={render:function(t){var e="<div class='gantt_cal_ltext gantt_cal_chosen gantt_cal_multiselect' style='height:"+((t.height||"23")+"px")+";'><select data-placeholder='...' class='chosen-select'>";if(t.options)for(var n=0;n<t.options.length;n++)void 0!==t.unassigned_value&&t.options[n].key==t.unassigned_value||(e+="<option value='"+t.options[n].key+"'>"+t.options[n].label+"</option>");return e+="</select></div>"},set_value:function(t,e,n,a){t.style.overflow="visible",t.parentNode.style.overflow="visible",t.style.display="inline-block";var o=$(t.firstChild);e?(e=(e+"").split(","),o.val(e)):o.val([]),o.chosen(),a.onchange&&o.change(function(){a.onchange.call(this)}),o.trigger("chosen:updated"),o.trigger("change")},get_value:function(t,e){return $(t.firstChild).val()},focus:function(t){$(t.firstChild).focus()}}}window.Gantt?window.Gantt.plugin(t):t(window.gantt)}()},jGaK:function(t,e,n){"use strict";var a=n("6Qjy");n.n(a).a},"n/nR":function(t,e,n){},qKuA:function(t,e,n){}}]);