<template>
  <div class="app-container">
    <div class="filter-container">
      <el-date-picker
        style="float:left"
        v-model="value"
        type="month"
        value-format="yyyy-MM-dd"
        @change="change"
        placeholder="按月份查找资源排程">
      </el-date-picker>
      <el-button class="filter-item"  type="primary" @click="Save()" >保存</el-button>
      <el-button class="filter-item" icon="el-icon-zoom-in" type="primary"  @click="zoomIn()" ></el-button>
      <el-button class="filter-item" icon="el-icon-zoom-out" type="primary"  @click="zoomOut()" ></el-button>
      <el-button v-if="Screenclose" class="filter-item" icon="el-icon-full-screen" type="primary" @click="clickFullscreen()"></el-button>
      <el-button v-else="Screenclose"  class="filter-item" icon="el-icon-rank" type="primary" @click="clickFullscreen()"></el-button>
    </div>
    <router-view v-if="isRouterAlive"></router-view>
    <gantt class="left-container" :tasks="tasks" @task-updated="logTaskUpdate" @link-updated="logLinkUpdate" @task-selected="selectTask"></gantt>
  </div>
</template>

<script>
  import Gantt from '@/components/Gantt/propGantt.vue'
  import screenfull from 'screenfull'
  import { saveProp,getAllProjectPlan,getAllProjectPlanByTime } from  '../../api/resourceScheduling'
    export default {
      name: "resourceScheduling",
      components: { Gantt },
      provide(){
        return{
          reload:this.reload
        }
      },
      data () {
        return {
          Screenclose: true,
          loading: false,
          isRouterAlive: false,
          total: 0,
          tasks: {
            data: [],
            /*  links: [
                {id: 1, source: 1, target: 2, type: '0'}
              ]*/
          },
          selectedTask: null,
          updatedTask: new Map(),
          messages: [],
          value: '',
          radios: ''
        }
      },
      filters: {
        toPercent (val) {
          if(!val) return '0'
          return Math.round((+val) * 100)
        },
        niceDate (obj){
          debugger
          console.log(obj.getMonth()+1)
          return `${obj.getFullYear()} / ${(obj.getMonth()+1)} / ${obj.getDate()}`
        }
      },
      created () {
        // gantt.load(`http://localhost:8903/prop/getAllProjectPlan`)
         this.getAll()
        this.radios = document.getElementsByName("scale");
        for (let i = 0; i < radios.length; i++) {
          radios[i].onclick = function (event) {
            gantt.ext.zoom.setLevel(event.target.value);
          };
        }
      },
      destroyed() {
        $(".gantt_tooltip").css("display","none");
      },
      methods: {
        clickFullscreen(){
          if (!screenfull.isEnabled) {
            this.$message({
              message: 'you browser can not work',
              type: 'warning'
            })
            return false
          }
          this.Screenclose = this.Screenclose? false : true
          screenfull.toggle()
        },
        zoomIn(){
          gantt.ext.zoom.zoomIn();
        },
        zoomOut(){
          gantt.ext.zoom.zoomOut()
        },
        selectTask (task) {
          this.selectedTask = task
        },
        getAll(){
          getAllProjectPlan().then(res => {
            debugger
            this.tasks.data = [];
            this.tasks.data = res.data
            gantt.clearAll();
            gantt.parse(this.tasks);
          })
            .catch(response => {
              this.$message.error({
                title: '失败',
                message: '获取数据失败'
              })
            })
        },
        addMessage (message) {
          this.messages.unshift(message)
          if (this.messages.length > 40) {
            this.messages.pop()
          }
        },
        logTaskUpdate (id, mode, task) {
          let text = (task && task.text ? ` (${task.text})` : '')
          let message = `Task ${mode}: ${id} ${text}`
          let t = this.updatedTask.get(id);
          if(!t){
            t = task;
            t["mode"] = mode;
            this.updatedTask.set(id, t);
          }
          else{
            if(t["mode"] == "inserted" && mode == "deleted"){
              this.updatedTask.delete(id);
            }
            else{
              this.updatedTask.set(id, t);
            }
          }
        },
        logLinkUpdate (id, mode, link) {
          let message = `Link ${mode}: ${id}`
          if (link) {
            message += ` ( source: ${link.source}, target: ${link.target} )`
          }
          this.addMessage(message)
        },
        change(val) {
          // 选择时间之后触发的函数
          if (this.value != '' || this.value!=null) {
            let t = JSON.stringify(this.value);
            getAllProjectPlanByTime(t)
              .then(res => {
                this.tasks.data = [];
                this.tasks.data = res.data
                gantt.clearAll();
                gantt.parse(this.tasks);
              }).catch(response => {
              this.$message.error({
                title: '失败',
                message: '获取数据失败'
              })
            })
          }
          if(this.value == '' ||this.value==null){
            getAllProjectPlan().then(res => {
              this.tasks.data = [];
              this.tasks.data = res.data
              gantt.clearAll();
              gantt.parse(this.tasks);
            })
              .catch(response => {
                this.$message.error({
                  title: '失败',
                  message: '获取数据失败'
                })
              })
          }
        },
        Save(){
          let arrUpdatedTask = Array.from(this.updatedTask)
          let t = JSON.stringify(arrUpdatedTask)
          console.log(t)
          saveProp(t)
            .then(response => {
              this.isRouterAlive = true;
              this.$message.success({
                title: '成功',
                message: '修改成功'
              })
              this.updatedTask.clear()
            })
            .catch(response => {
              this.$message.error({
                title: '失败',
                message: '修改失败'
              })
            });
        }
      }
    }
</script>

<style   lang="scss">
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
    width: 200px;
    box-shadow: 0 0 5px 2px #aaa;
    position: relative;
    z-index: 2;
  }

  .gantt-messages > .gantt-message {
    background-color: #f4f4f4;
    box-shadow: inset 5px 0 #d69000;
    font-family: Geneva, Arial, Helvetica, sans-serif;
    font-size: 14px;
    margin: 5px 0;
    padding: 8px 0 8px 10px;
  }

  .gantt-selected-info {
    border-bottom: 1px solid #cecece;
    box-sizing: border-box;
    font-family: Geneva, Arial, Helvetica, sans-serif;
    height: 50%;
    line-height: 28px;
    padding: 10px;
  }

  .gantt-selected-info h2 {
    border-bottom: 1px solid #cecece;
  }


  .select-task-prompt h2 {
    color: #d9d9d9;
  }
  .filter-container{
    padding:6px  0px 10px;
    background-color: #fff;
  }

  .gantt_tooltip {
    padding: 10px;
    position: absolute;
    z-index: 50;
    white-space: nowrap;
    display:block;
  }
  .user .gantt_add {
    display: none;
  }

</style>


