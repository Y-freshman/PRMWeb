<template>
  <div class="app-container">
    <div class="filter-container">
        <el-select v-model="value"
                   filterable
                   remote
                   clearable
                   multiple
                   collapse-tags
                   :remote-method="multiselectproject"
                   :loading="loading"
                   style="width: 200px"
                   placeholder="请输入关键词">
          <el-option
            v-for="item in projectOptions"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
      <el-button class="filter-item" type="primary" @click="Save()">保存</el-button>
      <el-button class="filter-item" icon="el-icon-zoom-in" type="primary" @click="zoomIn()"></el-button>
      <el-button class="filter-item" icon="el-icon-zoom-out" type="primary" @click="zoomOut()"></el-button>
      <el-button v-if="Screenclose" class="filter-item" icon="el-icon-full-screen" type="primary" @click="clickFullscreen()"></el-button>
      <el-button v-else="Screenclose"  class="filter-item" icon="el-icon-rank" type="primary" @click="clickFullscreen()"></el-button>
    </div>
    <router-view v-if="isRouterAlive"></router-view>
    <gantt class="left-container" :tasks="tasks" @task-updated="logTaskUpdate" @task-moved="logTaskMoved"
           @task-selected="selectTask"></gantt>
  </div>
</template>

<script>
  import Gantt from '@/components/planGantt.vue'
  import screenfull from 'screenfull'
  import {getAllTask, saveTask, getAllTaskByProject} from '../../api/projectPlan'
  import { getAllProject } from '../../api/taskSheet'
  export default {
    name: "projectPlan",
    components: {Gantt},
    provide() {
      return {
        reload: this.reload
      }
    },
    data() {
      return {
        Screenclose: true,
        loading: false,
        isRouterAlive: false,
        total: 0,
        tasks: {
          data: [],
        },
        selectedTask: null,
        updatedTask: new Map(),
        messages: [],
        value: [],
        taskUser: [],
        loading: false,
        projectOptions: []
      }
    },
    filters: {
      toPercent(val) {
        if (!val) return '0'
        return Math.round((+val) * 100)
      },
      niceDate(obj) {
        return `${obj.getFullYear()} / ${obj.getMonth() + 1} / ${obj.getDate()}`
      }
    },
    created() {
      gantt.clearAll()
    },
    mounted(){
      this.getAll();
      this.allpeoject()
    },
    destroyed() {
      $(".gantt_tooltip").css("display","none");
    },
    methods: {
      allpeoject(){
        getAllProject().then(response => {
          this.loading = false;
          this.projectOptions = response.data
          console.log( this.projectOptions)
        }).catch(() => {
          this.projectOptions  = []
        })
      },
      multiselectproject() {
        if (query==null || query=='') {
          this.loading = true;
          getAllProject().then(response => {
            this.loading = false;
            this.projectOptions  = response.data
          }).catch(() => {
            this.projectOptions = []
          })
        } else {
          this.loading = true;
          getAllProject(JSON.stringify(query)).then(response => {
            this.loading = false;
            this.projectOptions  = response.data
          }).catch(() => {
            this.projectOptions = []
          })
        }
      },
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
      zoomIn() {
        gantt.ext.zoom.zoomIn();
      },
      zoomOut() {
        gantt.ext.zoom.zoomOut()
      },
      sortwbscode(a, b) {
        debugger;
        a = a.wbscode;
        b = b.wbscode;
        return a > b ? 1 : (a < b ? -1 : 0);
      },
      selectTask(task) {
        this.selectedTask = task
      },
      getAll() {
        getAllTask().then(res => {
          this.tasks.data = [];
          this.tasks.data = res.data
          for (let i = 0; i < this.tasks.data.length; i++) {
            let a = this.tasks.data[i].usernames
            if (a.length < 0) {
              this.tasks.data[i].usernames = []
            } else {
              for (let i = 0; i < a.length; i++) {
                this.taskUser.push(a[i].username)
              }
            }
            this.tasks.data[i].usernames = this.taskUser
            this.taskUser = [];
          }
          console.log("==============")
          console.log(this.tasks)
          gantt.parse(this.tasks);
          gantt.sort(this.sortwbscode);
        })
          .catch(response => {
            debugger
            this.$message.error({
              title: '失败',
              message: '获取数据失败'
            })
          })
      },
      logTaskUpdate(id, mode, task) {
        debugger
        let text = (task && task.text ? ` (${task.text})` : '')
        let message = `Task ${mode}: ${id} ${text}`
        let t = this.updatedTask.get(id);
        if (!t) {
          t = task;
          t["mode"] = mode;
          this.updatedTask.set(id, t);
        } else {
          if (t["mode"] == "inserted" && mode == "deleted") {
            this.updatedTask.delete(id);
          } else {
            this.updatedTask.set(id, t);
          }
        }
      },
      logTaskMoved(id, mode, task) {
        debugger
        let t = task;
        for (let i = 0; i < this.tasks.data.length; i++) {
          if (this.tasks.data[i].parent == t.parent) {
            t["mode"] = mode;
            this.tasks.data[i]["mode"] = mode;
            this.tasks.data[i]["$wbs"] = gantt.getWBSCode(gantt.getTask(this.tasks.data[i].id));
            this.updatedTask.set(this.tasks.data[i].id, this.tasks.data[i]);
          }
        }
      },
      handleFilter() {
        if(this.value.length > 0){
          let t = JSON.stringify(this.value)
          t = t.replace(/\[|]/g,'')
          console.log (t)
          getAllTaskByProject(t).then(res => {
            this.tasks.data = [];
            this.tasks.data = res.data
            console.log(res);
            gantt.clearAll();
            for (let i = 0; i < this.tasks.data.length; i++) {
              let a = this.tasks.data[i].usernames
              if (a.length < 0) {
                this.tasks.data[i].usernames = []
              } else {
                for (let i = 0; i < a.length; i++) {
                  this.taskUser.push(a[i].username)
                }
              }
              this.tasks.data[i].usernames = this.taskUser
              this.taskUser = [];
            }
            gantt.parse(this.tasks);
            gantt.sort(this.sortwbscode);
            this.allpeoject()
          })
            .catch(response => {
              this.$message.error({
                title: '失败',
                message: '获取数据失败'
              })
            })
        }else{
          this.getAll()
          this.allpeoject()
        }
      },
      Save() {
        let arrUpdatedTask = Array.from(this.updatedTask)
        let t = JSON.stringify(arrUpdatedTask)
        console.log(t)
        saveTask(t)
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

  .gantt-messages {
    list-style-type: none;
    height: 50%;
    margin: 0;
    overflow-x: hidden;
    overflow-y: auto;
    padding-left: 5px;
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

  .filter-container {
    padding: 6px 0px 10px;
    background-color: #fff;
  }

  .gantt_tooltip {
    padding: 10px;
    position: absolute;
    z-index: 50;
    white-space: nowrap;
  }


</style>
