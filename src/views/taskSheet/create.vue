<template>
  <div class="page-content">
    <el-card class="box-card">
      <el-form ref="list" :inline="true" :model="list" label-width="100px">
        <el-form-item label="任务" prop="tTask">
          <el-input v-model="list.tTask"/>
        </el-form-item>
        <el-form-item label="所属项目" prop="pName">
          <el-select v-model="project"
                     clearable
                     style="width: 185px"
                     placeholder="请选择">
            <el-option
              v-for="item in ProjectOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <!--        <el-form-item label="上级任务" prop="preTaskName">-->
        <!--          <el-select v-model="pTask"-->
        <!--                     clearable-->
        <!--                     style="width: 185px"-->
        <!--                     placeholder="请选择">-->
        <!--            <el-option-->
        <!--              v-for="item in pTaskOptions"-->
        <!--              :key="item.value"-->
        <!--              :label="item.label"-->
        <!--              :value="item.value">-->
        <!--            </el-option>-->
        <!--          </el-select>-->
        <!--        </el-form-item>-->

        <el-form-item label="人天" prop="tPersonday">
          <el-input
            v-model="list.tPersonday"
            oninput="value=value.replace(/[^\d]/g,'')"
            maxLength='3'
            clearable
            style="width: 185px"
            placeholder="请输入整数"
          />
        </el-form-item>
        <el-form-item label="进度" prop="tActPercent">
          <el-input
            v-model="list.tActPercent"
            oninput="value=value.replace(/[^\d]/g,'')"
            maxLength='3'
            clearable
            style="width: 185px"
            placeholder="请输入整数"
          />
        </el-form-item>
        <el-form-item label="指派人" prop="username">
          <el-select v-model="list.assigonrUser"
                     filterable
                     remote
                     clearable
                     :remote-method="remoteMethodAssigorUser"
                     :loading="loading"
                     style="width: 185px"
                     placeholder="请输入指派人姓名">
            <el-option
              v-for="item in AssigorUserOptions"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <!--        <el-form-item label="开始时间" prop="tStartDate">-->
        <!--          <el-date-picker v-model="list.tStartDate"-->
        <!--                          type="date"-->
        <!--                          placeholder="选择日期"-->
        <!--                          value-format="yyyy-MM-dd"-->
        <!--                          style="width: 185px"> </el-date-picker>-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="结束时间" prop="tEndDate">-->
        <!--          <el-date-picker v-model="list.tEndDate"-->
        <!--                          type="date"-->
        <!--                          placeholder="选择日期"-->
        <!--                          value-format="yyyy-MM-dd"-->
        <!--                          style="width: 185px"> </el-date-picker>-->
        <!--        </el-form-item>-->
      </el-form>
    </el-card>
    <el-card class="box-card">
      <h3>任务人员安排</h3>
      <el-button :plain="true" type="primary" @click="handleSpecificationShow">添加</el-button>
      <el-table style="margin-top: 10px" :data="list.projectTaskResources" border fit highlight-current-row>
        <el-table-column align="center" label="接收人" prop="receiveUser"/>
        <el-table-column align="center" label="备注" prop="memo"/>
        <!--        <el-table-column align="center" label="开始时间" prop="time" />-->
        <!--        <el-table-column align="center" label="结束时间" prop="endtime" />-->
        <el-table-column align="center" label="操作" fixed="right" width="200" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleSpecificationDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog :visible.sync="editVisiable" title="编辑任务成员">
        <el-form ref="attributeForm" :model="projectTaskResources" status-icon label-position="left" label-width="100px"
                 style="width: 400px; margin-left:50px;">
          <el-form-item label="接收人" prop="receiveUser">
            <el-select v-model="projectTaskResources.receiveUser"
                       filterable
                       remote
                       clearable
                       :remote-method="remoteMethodReceiveUser"
                       :loading="loading"
                       style="width: 300px"
                       placeholder="请输入接收人姓名">
              <el-option
                v-for="item in ReceiveUserOptions"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注" prop="memo">
            <el-input type="textarea"
                      :rows="3"
                      maxlength="50"
                      show-word-limit
                      placeholder="请输入备注内容" v-model="projectTaskResources.memo"/>
          </el-form-item>
          <!--          <el-form-item label="开始时间" prop="time">-->
          <!--            <el-date-picker v-model="projectTaskResources.time"-->
          <!--                            type="date"-->
          <!--                            placeholder="选择日期"-->
          <!--                            value-format="yyyy-MM-dd"-->
          <!--                            style="width: 300px"/>-->
          <!--          </el-form-item>-->
          <!--          <el-form-item label="结束时间" prop="time">-->
          <!--            <el-date-picker v-model="projectTaskResources.endtime"-->
          <!--                            type="date"-->
          <!--                            placeholder="选择日期"-->
          <!--                            value-format="yyyy-MM-dd"-->
          <!--                            style="width: 300px"/>-->
          <!--          </el-form-item>-->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editVisiable = false">取消</el-button>
          <el-button type="primary" @click="updateComplete">确定</el-button>
        </div>
      </el-dialog>

      <el-dialog :visible.sync="specVisiable" title="添加任务成员">
        <el-form ref="attributeForm" :model="projectTaskResources" status-icon label-position="left" label-width="100px"
                 style="width: 400px; margin-left:50px;">
          <el-form-item label="接收人" prop="receiveUser">
            <el-select v-model="projectTaskResources.receiveUser"
                       filterable
                       remote
                       clearable
                       :remote-method="remoteMethodReceiveUser"
                       :loading="loading"
                       style="width: 300px"
                       placeholder="请输入接收人姓名">
              <el-option
                v-for="item in ReceiveUserOptions"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注" prop="memo">
            <el-input type="textarea"
                      :rows="3"
                      maxlength="50"
                      show-word-limit
                      placeholder="请输入备注内容" v-model="projectTaskResources.memo"/>
          </el-form-item>
          <el-form-item label="开始时间" prop="time">
            <el-date-picker v-model="projectTaskResources.time"
                            type="date"
                            placeholder="选择日期"
                            value-format="yyyy-MM-dd"
                            style="width: 300px"/>
          </el-form-item>
          <el-form-item label="结束时间" prop="time">
            <el-date-picker v-model="projectTaskResources.endtime"
                            type="date"
                            placeholder="选择日期"
                            value-format="yyyy-MM-dd"
                            style="width: 300px"/>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="specVisiable = false">取消</el-button>
          <el-button type="primary" @click="handleSpecificationAdd">确定</el-button>
        </div>
      </el-dialog>


    </el-card>

    <div class="op-container">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handleEdit">保存</el-button>
    </div>
  </div>
</template>

<script>
  import {
    selectTask,
    getUserListByExample,
    saveTasksInsert,
    getAllProject,
    getAllTask,
    getUserList
  } from '../../api/taskSheet'

  export default {
    name: 'Edit',
    data() {
      return {
        rowId: '',
        loading: false,
        value: [],
        taskOptions: [],
        UserOptions: [],
        ProjectOptions: [],
        project: '',
        pTaskOptions: [],
        pTask: '',
        AssigorUserOptions: [],
        ReceiveUserOptions: [],
        tasksname: '',
        task: '',
        specVisiable: false,
        editVisiable: false,
        list: {
          id: '',
          projectId: '',
          projectModulesId: '',
          tTask: '',
          tStartDate: '',
          tEndDate: '',
          parentTaskId: '',
          preTaskId: '',
          nextTaskId: '',
          tPersonday: '',
          tActPercent: '',
          pName: '',
          nextTaskName: '',
          preTaskName: '',
          assigonrUser: '',
          projectTaskResources: [],
        },
        deleteId: [],
        status: 'unchanged',
        projectTaskResources: {
          id: '',
          projectTaskId: '',
          assignorId: '',
          userId: '',
          assigorUser: '',
          receiveUser: '',
          memo: '',
          time: '',
          endtime: ''
        },
      }
    },
    created() {
      this.getProject()
      this.getAlltask()
      getUserList().then(response => {
        this.loading = false;
        this.ReceiveUserOptions = response.data
        this.AssigorUserOptions = response.data
      }).catch(() => {
        this.ReceiveUserOptions = []
      })

    },
    mounted() {
      // 保留数据源

    },

    methods: {
      // init: function() {
      //   if (this.$route.query.id == null) {
      //     return false;
      //   }
      // },
      getCookie: function(name) {
        let arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
          return unescape(arr[2]);
        else
          return '';
      },
      setCookie: function(name, value, expiredays) {
        debugger
        let exdate =new Date((new Date()).getTime() + 1 * 60000);//有效期1分钟
        exdate.setDate(exdate.getDate() + expiredays);
        document.cookie = name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
      },




    /**
       * @description 获取项目列表
       * @author freshman
       */
      getList() {
        selectTask(this.$route.query.id).then(response => {
          this.list = response.data
          for (let i = 0; i < this.list.projectTaskResources.length; i++) {
            this.$set(this.list.projectTaskResources[i], 'status', this.status)
          }
          console.log(this.list)
        }).catch(() => {
          this.list = []
        })
      },
      getProject() {
        getAllProject().then(response => {
          this.ProjectOptions = response.data
          console.log(this.ProjectOptions)
        })
      },
      getAlltask() {
        getAllTask().then(response => {
          this.pTaskOptions = response.data
          console.log(this.pTaskOptions)
        })
      },
      getTasks() {
        getTasksList().then(response => {
          this.taskOptions = response.data
        })
      },
      remoteMethodAssigorUser(query) {
        if (query == null || query == '') {
          getUserList().then(response => {
            this.loading = false;
            this.AssigorUserOptions = response.data
          }).catch(() => {
            this.AssigorUserOptions = []
          })
        } else {
          this.loading = true;
          getUserListByExample(JSON.stringify(query)).then(response => {
            this.loading = false;
            this.AssigorUserOptions = response.data
          }).catch(() => {
            this.list = []
          })
        }
      },
      remoteMethodReceiveUser(query) {
        if (query == null || query == '') {
          this.ReceiveUserOptions = []
          getUserList().then(response => {
            this.loading = false;
            this.ReceiveUserOptions = response.data
          }).catch(() => {
            this.ReceiveUserOptions = []
          })
        } else {
          this.loading = true;
          getUserListByExample(JSON.stringify(query)).then(response => {
            this.loading = false;
            this.ReceiveUserOptions = response.data
          }).catch(() => {
            this.list = []
          })
        }
      },
      handleCancel: function () {
        this.$store.state.tagsView.visitedViews.splice(this.$store.state.tagsView.visitedViews.findIndex(item => item.path === this.$route.path), 1)
        this.$router.push({path: '/taskSheet/taskSheet'})
      },
      handleSpecificationDelete(row) {
        const index = this.list.projectTaskResources.indexOf(row)
        this.list.projectTaskResources.splice(index, 1)
        this.deleteId.push(row.id)
      },
      handleSpecificationShow() {
        this.projectTaskResources = {
          id: '',
          projectTaskId: '',
          userId: '',
          receiveUser: '',
          memo: '',
          time: '',
          endtime: ''
        }
        this.specVisiable = true;
      },
      handleSpecificationAdd() {
        let index = this.list.projectTaskResources.length
        if (this.projectTaskResources.receiveUser === '' || this.projectTaskResources.receiveUser == null || this.projectTaskResources.receiveUser == undefined) {
          this.$message({
            message: '接收人不能为空',
            type: 'warning'
          });
        } else {
          let yy = 0
          for (let i = 0; i < index; i++) {
            if (this.projectTaskResources.receiveUser === this.list.projectTaskResources[i].receiveUser) {
              yy++
            }
          }
          if (yy != 0) {
            this.$message({
              message: '接收人不能为重复',
              type: 'warning'
            });
          } else {
            this.status = 'insert'
            this.$set(this.projectTaskResources, 'status', this.status)
            this.list.projectTaskResources.splice(index, 0, this.projectTaskResources)
            this.specVisiable = false
            console.log(this.list.logsDetails)
          }
        }
      },
      handleUpdate(row) {
        this.editVisiable = true
        this.projectTaskResources = row;
        console.log(row)
        for (let i = 0; i < this.list.projectTaskResources.length; i++) {
          if (row.receiveUser == this.list.projectTaskResources[i].receiveUser && row.status !== 'insert') {
            this.status = 'update'
            this.$set(this.list.projectTaskResources[i], 'status', this.status)
          }
        }
        this.rowId = row.id
        console.log(this.projectTaskResources)
      },
      handleEdit: function () {
       if(this.list.tTask == '' && this.list.tTask == null && this.list.tTask == undefined){
         this.$message.warning({
           title: '警告',
           message: '任务名不能为空'
         })
       }else{
         if (this.getCookie('addtaskName') ==  this.list.tTask) {
           console.log('has cookie')
           this.$message.warning({
             title: '警告',
             message: '你一分钟前刚刚已经保存过该任务，请勿重复保存!!!'
           })
         } else {
           console.log('no cookie')
           this.setCookie('addtaskName', this.list.tTask, 1)
           this.list.pName = this.project
           this.$set(this.list, 'deleteId', this.deleteId)
           let t = JSON.stringify(this.list)
           saveTasksInsert(t).then(response => {
             this.$message.success({
               title: '成功',
               message: '添加成功'
             })
             // this.$store.state.tagsView.visitedViews.splice(this.$store.state.tagsView.visitedViews.findIndex(item => item.path === this.$route.path), 1)
             // this.$router.push({ path: '/taskSheet/taskSheet' })
           }).catch(response => {
             this.$message.error({
               title: '失败',
               message: '添加失败'
             })
           });
         }
       }
      },
      updateComplete() {
        let t = 0;
        for (let i = 0; i < this.list.projectTaskResources.length; i++) {
          if (this.list.projectTaskResources[i].receiveUser == '' || this.list.projectTaskResources[i].receiveUser == null) {
            this.$message.error({
              title: '失败',
              message: '接收人不能为空'
            })
            t++;
          }
        }
        if (t == 0) {
          let index = this.list.projectTaskResources.length;
          let yy = 0
          for (let i = 0; i < index; i++) {
            for (let j = i + 1; j < index; j++) {
              if (this.list.projectTaskResources[i].receiveUser == this.list.projectTaskResources[j].receiveUser) {
                yy++
              }
            }
          }
          console.log(yy)
          if (yy != 0) {
            this.$message({
              message: '接收人不能重复',
              type: 'warning'
            });
          } else {
            this.editVisiable = false
          }
        }
      }
    },
    filters: {},
  }
</script>

<style lang="scss" scoped media="screen">
  .page-content {
    margin: 20px 16px;
    padding: 10px 20px 10px;
    background-color: #fff;
    height: calc(100vh - 90px);
    margin-bottom: 40px;
    overflow: auto;
  }

  .filter-container {
    padding: 6px 0px 10px;
    background-color: #fff;
  }

  .el-card {
    margin-bottom: 10px;
  }

  .el-card, .el-message {
    border-radius: 4px;
    overflow: auto;
  }

  .op-container {
    margin-bottom: 20px;
  }
</style>

