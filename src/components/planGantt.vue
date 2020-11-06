<template>
  <div id="planGantt"></div>
</template>

<script>
  import 'dhtmlx-gantt/codebase/dhtmlxgantt'
  import 'dhtmlx-gantt/codebase/dhtmlxgantt.css'
  import 'dhtmlx-gantt/codebase/locale/locale_cn'
  import 'dhtmlx-gantt/codebase/skins/dhtmlxgantt_terrace.css'
  import "dhtmlx-gantt/codebase/ext/dhtmlxgantt_tooltip.js";
  import  {getAllUserKey} from  '../api/resourceScheduling'
  import '../assets/dhtmlxgantt/jquery_multiselect.css'
  import '../assets/dhtmlxgantt/jquery_multiselect.js'
  import "dhtmlx-gantt/codebase/ext/dhtmlxgantt_marker.js"
  import "dhtmlx-gantt/codebase/ext/dhtmlxgantt_keyboard_navigation.js"
  export default {
    name: 'PlanGantt',
    props: {
      tasks: {
        type: Object
      },
      users:[]
    },

    created (){
      console.log('planGantt ********************************')
      $(".gantt_tooltip").css("display","block");
      gantt.config.sort = true;
    },
    methods: {
      abcinitGanttEvents: function () {
        console.log('planGantt init')
        if(!gantt.$_eventsInitialized) {
          getAllUserKey().then(response => {
            this.users = response.data;
            gantt.locale.labels.section_owner = "任务成员";
            gantt.locale.labels.section_description = "任务名";
            gantt.config.resource_property = "usernames";
            gantt.locale.labels.section_memo = "描述";
            // gantt.config.open_tree_initially = true;
            gantt.config.lightbox.sections = [
              {name: "description", height: 30, map_to: "text", type: "textarea", focus: true},
              {name: "memo", height: 70, map_to: "memo", type: "textarea", focus: true},
              {name:"owner",height:30, type:"multiselect", options:response.data, map_to:"usernames", label: "用户" },
              {name: "time",height:30,type: "duration", map_to: "auto",time_format:["%Y","%m","%d"]}
            ];
          })
        }
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
          debugger
          this.$emit('task-updated', id, 'updated', task)
        })
        gantt.attachEvent('onAfterTaskDelete', (id,task) => {
          this.$emit('task-updated', id, 'deleted',task)
          if(!gantt.getSelectedId()) {
            this.$emit('task-selected', null)
          }
        })
        gantt.attachEvent("onAfterTaskMove", (id) => {
          debugger
          let task = gantt.getTask(id);
          this.$emit('task-moved', id,'updated', task)
        });
        gantt.$_eventsInitialized = true;
      },
    },

    beforeMount () {
      // debugger
      // gantt.config.grid_elastic_columns = true;
      gantt.config.layout = {
        css: "gantt_container",
        rows: [
          {
            cols: [
              {
                width: 500,
                group:"grids",
                rows:[
                  { view: "grid", scrollable: true, scrollX: "gridScroll", scrollY: "scrollVer" },
                  { view: "scrollbar", id: "gridScroll", group:"horizontal" }
                ]
              },
              { resizer: true, width: 1 },
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
      // gantt.config.drag_move = true;
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
                let dateToStr = gantt.date.date_to_str("%M%d");
                let endDate = gantt.date.add(gantt.date.add(date, 1, "week"), -1, "day");
                return  dateToStr(date) + " - " + dateToStr(endDate);
              }},
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
      gantt.config.show_tasks_outside_timescale = true;
      gantt.config.grid_width = 400;
      gantt.config.columns = [
        {name: "text", tree: true, width: "*",min_width: 170, resize: true, editor: {type: "text", map_to: "text"}},
        {name: "owner", align: "center", width: 60, label: "用户", resize: true,template: function (task) {
            if (task.usernames) {
              if(task.usernames.length > 1){
                let result = '';
                for (let i = 0; i < task.usernames.length; i++) {
                  result += "<div class='owner-label'>" + task.usernames[i].substr(0, 1) + "</div>";
                }
                return result;
              }else {
                return task.usernames
              }
            } else {
              return "N/A";
            }
          }
        },
        {name: "start_date", align: "center",width: 80, resize: true,editor:{type: "date", map_to: "start_date", min: new Date(2020, 0, 1), max: new Date(2025, 0, 1)}},
        {name: "end_date",  label: "结束时间",align: "center",width: 80, resize: true,editor:{type: "date", map_to: "start_date", min: new Date(2020, 0, 1), max: new Date(2025, 0, 1)}},
        {name: "duration", width: 50, align: "center",resize: true,editor:{type: "number", map_to: "duration", min:0, max: 100}},
        {name: "add", width: 34,resize: true}
      ]
      gantt.templates.timeline_cell_class = function(task,date){
        if(date.getDay()==0||date.getDay()==6){
          return "weekend" ;
        }
      };
      gantt.templates.tooltip_text = function(start,end,task){
        if(task.$level==0){
          return "<b>项目名称:</b> "+task.text+"" + "<br/><b>完成进度:</b> " +Math.round((task.progress) * 100)+ "%" + "<br/><b>开始时间:</b> "  + gantt.templates.tooltip_date_format(start)+
            "<br/><b>结束时间:</b> "+gantt.templates.tooltip_date_format(end);
        }else{
          return "<b>任务名称:</b> "+task.text+"" + "<br/><b>完成进度:</b> " +Math.round((task.progress) * 100)+ "%" + "<br/><b>开始时间:</b> "  + gantt.templates.tooltip_date_format(start)+
            "<br/><b>结束时间:</b> "+gantt.templates.tooltip_date_format(end)+"<br/><b> 任务成员:</b> " + task.usernames;
        }
      };
      gantt.templates.task_class = gantt.templates.grid_row_class = function (start, end, task) {
        if(task.$level == 0 ){
          return "gantt_project";
        }else{
          return "";
        }
      };
      gantt.config.tooltip_hide_timeout = 10;
      gantt.templates.task_text = function (start, end, task) {
        return task.text
      };
      gantt.templates.progress_text = function (start, end, task) {
        return "<span style='text-align:left;'>" + Math.round(task.progress * 100) + "% </span>";
      };
      gantt.attachEvent("onBeforeLightbox", function(id) {
        let task = gantt.getTask(id);
        if(task.$level==0){
          return false;
        }else{
          return true;
        }
      });
      gantt.config.drag_progress = true
      // gantt.config.drag_move = true;
      // gantt.config.reorder_grid_columns = true;
      gantt.config.order_branch = true;
      gantt.config.order_branch_free = true;
      gantt.config.order_branch = "marker";
      gantt.config.keyboard_navigation_cells = true;
      gantt.config.fit_tasks = true;
      gantt.attachEvent("onBeforeTaskMove", function(id, parent, tindex){
        let task = gantt.getTask(id);
        if(task.parent != parent)
          return false;
        return true;
      });
      $(".gantt_tooltip").css("display","block");
    },
    mounted () {
      this.abcinitGanttEvents();
      gantt.init(document.getElementById('planGantt'))
    },
    destroyed() {
      $(".gantt_tooltip").css("display","none");
    }
  }
</script>

<style lang="scss" >
  .weekend{ background: #f4f7f4 !important;}
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
  .gantt_task_progress {
    text-align: left;
    padding-left: 10px;
    box-sizing: border-box;
    color: white;
    font-weight: bold;
  }
  .owner-label {
    width: 20px;
    height: 20px;
    line-height: 20px;
    font-size: 12px;
    display: inline-block;
    /* border: 1px solid #2881dd; */
    border-radius: 25px;
    background: #62302905;
    color: #3f93e9;
    margin: 0 3px;
    font-weight: bold;
  }
</style>
