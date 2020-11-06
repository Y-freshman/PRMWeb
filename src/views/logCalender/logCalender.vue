<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="left-container">
        <scheduler class="left-container" :events="events" @event-updated="logEventUpdate"></scheduler>
      </div>
    </div>
  </div>
</template>

<script>
  import Scheduler from '@/components/Scheduler.vue'
  import {getUserLogList, insertLog, updateLog, deleteLog} from '../../api/logCalender'

  export default {
    name: 'logCalender',
    components: {Scheduler},
    data() {
      return {
        events: []
      }
    },
    created() {
      getUserLogList().then(res => {
        this.events = res.data;
        scheduler.parse(this.events);
      })
    },
    methods: {
      logEventUpdate(id, mode, ev) {
        let text = (ev && ev.text ? ` (${ev.text})`: '')
        if (mode == "inserted") {
          let params = {content: ev.text, start_date: ev.start_date, end_date: ev.end_date};
          let t = JSON.stringify(params)
          insertLog(t).then(res => {
            scheduler.changeEventId(ev.id, res.data);
            dhtmlx.message("添加成功");
            console.log(res.data)
          })
        }
        if (mode == "updated") {
          debugger
          let params = {id: id, content: ev.text, start_date: ev.start_date, end_date: ev.end_date};
          let t = JSON.stringify(params)
          updateLog(t).then(response => {
            dhtmlx.message("修改成功");
          });
        }
        if (mode == "deleted") {
          let t = id;
          let x = String(t).length
          if (x != 13 && x != 9) {
            deleteLog(t).then(res => {
              dhtmlx.message("删除成功");
            })
          }
        }
      }
    }
  }
</script>

<style lang="scss">
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  .container {
    height: 100%;
    width: 100%;
  }

  .left-container {
    overflow: hidden;
    position: relative;
    /*height: 500px;*/
    height: calc(100vh - 160px);
  }

  .right-container {
    border-right: 1px solid #cecece;
    float: right;
    height: 100%;
    width: 340px;
    box-shadow: 0 0 5px 2px #aaa;
    position: relative;
    z-index: 2;
  }

  .filter-container {
    padding: 6px 0px 10px;
    background-color: #fff;
  }


</style>
