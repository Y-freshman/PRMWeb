<template>
  <div id="propGantt"></div>
</template>

<script>
  import 'dhtmlx-gantt/codebase/dhtmlxgantt'
  import  {getAllUserKey} from  '../../api/resourceScheduling'
  import 'dhtmlx-gantt/codebase/dhtmlxgantt.css'
  import 'dhtmlx-gantt/codebase/skins/dhtmlxgantt_terrace.css'
  import "dhtmlx-gantt/codebase/ext/dhtmlxgantt_tooltip.js";
  import 'dhtmlx-gantt/codebase/locale/locale_cn'
  import '../../assets/dhtmlxgantt/jquery_multiselect.css'
  import '../../assets/dhtmlxgantt/jquery_select.js'
  export default {
    name: 'gantt',
    props: {
      tasks: {
        type: Object
      },
    },
    created (){
      console.log('proggtannakakak ********************************')
      gantt.$_eventsInitialized = false;
      $(".gantt_tooltip").css("display","block");
    },
    data() {
      return {
        options: [],
      };
    },
    methods: {
     initGanttEvents: function () {
        if(!gantt.$_eventsInitialized){
          getAllUserKey().then(response => {
            gantt.locale.labels.section_user = '成员';
            gantt.locale.labels.section_description = "描述";
            gantt.config.lightbox.sections = [
              {name:"description", height:60, map_to:"description", type:"textarea", focus:true},
              {name:"user", height:38, map_to:"user", type:"propselect", focus:true, options:response.data},
              {name:"time", height:38, map_to:"auto", type:"duration",time_format:["%Y","%m","%d"]}
            ];
          })
        }
       gantt.attachEvent("onBeforeLightbox", function(id) {
         debugger
         let xx = gantt.getTask(id);
           return true;
       });
        gantt.attachEvent('onTaskSelected', (id) => {
          let task = gantt.getTask(id)
          this.$emit('task-selected', task)
        })
        gantt.attachEvent('onAfterTaskAdd', (id, task) => {
          this.$emit('task-updated', id, 'inserted', task)
          task.progress = task.progress || 0
          if(gantt.getSelectedId() == id) {
            this.$emit('task-selected', task)
          }
        })
        gantt.attachEvent('onAfterTaskUpdate', (id, task) => {
          this.$emit('task-updated', id, 'updated', task)
        })
        gantt.attachEvent('onAfterTaskDelete', (id,task) => {
          this.$emit('task-updated', id, 'deleted',task)
          if(!gantt.getSelectedId()) {
            this.$emit('task-selected', null)
          }
        })
      }

    },
    beforeMount() {
      gantt.config.grid_elastic_columns = true;
      gantt.config.layout = {
        css: "gantt_container",
        rows: [
          {
            cols: [
              {
                width: 400,
                group:"grids",
                rows:[
                  { view: "grid", scrollable: false, scrollX: "gridScroll", scrollY: "scrollVer" },
                  { view: "scrollbar", id: "gridScroll", group:"horizontal" }
                ]
              },
              { resizer: false, width: 1 },
              {
                rows:[
                  { view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer" },
                  { view: "scrollbar", id: "scrollHor", group:"horizontal" }
                ]
              },
              { view: "scrollbar", id: "scrollVer" }
            ]
          }
        ]
      };

      gantt.config.min_column_width = 80;
      let zoomConfig = {
        minColumnWidth: 80,
        maxColumnWidth: 160,
        levels: [
          [
            { unit: "day", format: "%M%d", step: 1},
          ],
          [
            { unit: "month", format: "%Y/%M", step: 1},
            {unit: "week", step: 1, format: function (date) {
                var dateToStr = gantt.date.date_to_str("%M%d");
                var endDate = gantt.date.add(gantt.date.add(date, 1, "week"), -1, "day");
                return  dateToStr(date) + " - " + dateToStr(endDate);
              }}
            // {unit: "week", step: 1, format: function (date) {
            //     return "第"+ gantt.date.getWeek(date)+"周";
            //   }}
          ],
          [
            {unit: "month", step: 1, format: "%M"},
            {
              unit: "quarter", step: 1, format: function (date) {
                var dateToStr = gantt.date.date_to_str("%M");
                var endDate = gantt.date.add(gantt.date.add(date, 3, "month"), -1, "day");
                return dateToStr(date) + " - " + dateToStr(endDate);
              }
            }
          ],
          [
            {unit: "year", step: 1, format: "%Y"}
          ]
        ],
        useKey: "ctrlKey",
        trigger: "wheel",
        element: function(){
          return gantt.$root.querySelector(".gantt_task");
        }
      }

      gantt.ext.zoom.init(zoomConfig);

      gantt.templates.scale_cell_class = function(date){
        if(date.getDay()==0||date.getDay()==6){
          return "weekend";
        }
      };
      gantt.templates.task_class = gantt.templates.grid_row_class = function (start, end, task) {
        if(task.$level == 0 ){
          return "gantt_project";
        }else{
          return "user";
        }
      };
      gantt.templates.task_text = function (start, end, task) {
        if(task.$level == 0 ){
          return task.tnt
        }else{
          return task.user
        }
      };
      gantt.config.columns = [
        {name: "tnt",label: "项目", tree: true, min_width: "*",min_width: 160, max_width:250, resize: true},
        {name: "start_date", align: "center", width: 90, resize: true},
        {name: "duration", width: 50, align: "center",resize: true},
        {name: "add", width: 34,resize: true}
      ];
      gantt.config.autofit = false;
      gantt.config.grid_width = 360;
      gantt.templates.tooltip_text = function(start,end,task){
        if(task.$level==0){
          return "<b>项目名称:</b> "+task.tnt+"" + "<br/><b>完成进度:</b> " +Math.round((task.progress) * 100)+ "%" + "<br/><b>开始时间:</b> "  + gantt.templates.tooltip_date_format(start)+
            "<br/><b>结束时间:</b> "+gantt.templates.tooltip_date_format(end);
        }else{
          return "<b>项目成员:</b> "+task.user+"" + "<br/><b>开始时间:</b> "  + gantt.templates.tooltip_date_format(start)+
            "<br/><b>结束时间:</b> "+gantt.templates.tooltip_date_format(end);
        }

      };
      gantt.attachEvent("onLightboxSave", function (id, item) {
        item.tnt = item.user;
        return true;
      });
      gantt.attachEvent("onBeforeLightbox", function(id) {
        let task = gantt.getTask(id);
        if(task.$level==0){
          return false;
        }else{
          return true;
        }
      });
      gantt.config.drag_multiple = true;
      gantt.config.drag_progress = false;
      gantt.config.drag_move = true;
      gantt.config.reorder_grid_columns = true;
      gantt.config.order_branch = true;
      gantt.config.order_branch = "marker";
      gantt.attachEvent("onBeforeTaskMove", function(id, parent, tindex){
        let task = gantt.getTask(id);
        if(task.$level==0){
          gantt.message({
            type:"confirm-warning",
            text:"任务不能拖成项目！"
          })
          return false;
        }
        return true;
      });
      $(".gantt_tooltip").css("display","block");
    },
    mounted() {
      gantt.$_eventsInitialized = false;
      this.initGanttEvents();
      gantt.init(document.getElementById('propGantt'));
    },
    destroyed() {
      $(".gantt_tooltip").css("display","none");
    }
  }
</script>

<style lang="scss">
  .gantt_grid_head_cell.gantt_grid_head_add {
     -moz-opacity: .6;
     opacity: .6;
     top: 0;
     display: none;
   }
  .gantt_tooltip {
    padding: 10px;
    position: absolute;
    z-index: 50;
    white-space: nowrap;
    display:block;
  }
</style>

