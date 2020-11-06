<template>
  <div class="page-content">
    <el-card class="box-card">
      <el-form ref="list" :inline="true"  :model="list" label-width="100px" >
        <el-form-item label="用户姓名" prop="username">
          <el-select v-model="list.username"
                     filterable
                     remote
                     clearable
                     :remote-method="remoteMethodUser"
                     :loading="loading"
                     style="width: 185px"
                     placeholder="请输入关键词">
            <el-option
              v-for="item in UserOptions"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="填写时间" prop="logsDate">
          <el-date-picker v-model="list.logsDate" type="date" placeholder="选择日期" style="width: 185px"> </el-date-picker>
        </el-form-item>
        <el-form-item label="工作时长" prop="durTime">
          <el-input
            v-model="list.durTime"
            oninput="value=value.replace(/[^\d]/g,'')"
            maxLength='2'
            placeholder="请输入整数"
          />
        </el-form-item>
        <el-form-item label="加班时长" prop="extTime">
          <el-input
            v-model="list.extTime"
            oninput="value=value.replace(/[^\d]/g,'')"
            maxLength='2'
            placeholder="请输入整数"
          />
        </el-form-item>
      </el-form>
      <el-form ref="list"  :model="list" label-width="100px">
        <el-form-item label="日志" prop="logsContent">
          <el-input   type="textarea"
                      :rows="5"
                      maxlength="500"
                      show-word-limit
                      placeholder="请输入日志内容" v-model="list.logsContent"/>
        </el-form-item>
      </el-form>
      <el-button :plain="true" type="primary"  icon="el-icon-s-promotion" @click="automatic ">生成日志</el-button>
    </el-card>
    <el-card class="box-card">
      <h3>日志明细</h3>
      <el-button :plain="true" type="primary" @click="handleSpecificationShow">添加</el-button>
      <el-table  style="margin-top: 10px"  :data="list.logsDetails"   border fit highlight-current-row>
        <el-table-column align="center" label="任务" prop="taskname" />
        <el-table-column align="center" label="计划完成%" prop="dPlanPrecent" />
        <el-table-column align="center" label="实际完成%" prop="dActPrecent" />
        <el-table-column align="center" label="任务类型" prop="dTaskType" />
        <el-table-column align="center" label="备注" prop="memo" />
        <el-table-column align="center" label="花费时长" prop="durtime" />
        <el-table-column align="center" label="操作"  fixed="right" width="200" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button  type="primary" size="mini"  @click="handleUpdate(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini"  @click="handleSpecificationDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog :visible.sync="editVisiable" title="编辑日志明细">
        <el-form ref="attributeForm" :model="logsDetails" status-icon label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
          <el-form-item label="任务">
            <el-select v-model="logsDetails.taskname"
                       @change="autoPlan($event)"
                       clearable
                       :loading="loading"
                       style="width: 300px"
                       placeholder="请选择" >
              <el-option-group
                v-for="group in taskOptions"
                :key="group.name"
                :label="group.name">
                <el-option
                  v-for="item in group.projectTasks"
                  :key="item.id"
                  :label="item.tTask"
                  :value="item.tTask">
                </el-option>
              </el-option-group>
            </el-select>
          </el-form-item>
          <el-form-item label="计划完成%">
            <el-input v-model="logsDetails.dPlanPrecent"/>
          </el-form-item>
          <el-form-item label="实际完成%">
            <el-input
              v-model="logsDetails.dActPrecent"
              oninput="value=value.replace(/[^\d]/g,'')"
              maxLength='3'
              placeholder="请输入整数"
            />
          </el-form-item>
          <el-form-item label="任务类型">
            <el-select v-model="value1" style="width: 300px" placeholder="请选择">
              <el-option
                v-for="item in Options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注">
            <el-input   type="textarea"
                        :rows="3"
                        maxlength="50"
                        show-word-limit
                        placeholder="请输入备注内容" v-model="logsDetails.memo"/>
          </el-form-item>
          <el-form-item label="花费时长">
            <el-input
              v-model="logsDetails.durtime"
              oninput="value=value.replace(/[^\d]/g,'')"
              maxLength='2'
              placeholder="请输入整数"
            />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editVisiable = false">取消</el-button>
          <el-button type="primary" @click="updateComplete">确定</el-button>
        </div>
      </el-dialog>

      <el-dialog :visible.sync="specVisiable" title="添加日志明细">
        <el-form ref="attributeForm" :model="logsDetails" status-icon label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
          <el-form-item label="任务">
            <el-select v-model="logsDetails.taskname"
                       @change="autoPlan($event)"
                       clearable
                       :loading="loading"
                       style="width: 300px"
                       placeholder="请选择" >
              <el-option-group
                v-for="group in taskOptions"
                :key="group.name"
                :label="group.name">
                <el-option
                  v-for="item in group.projectTasks"
                  :key="item.id"
                  :label="item.tTask"
                  :value="item.tTask">
                </el-option>
              </el-option-group>
            </el-select>
          </el-form-item>
          <el-form-item label="计划完成%">
            <el-input v-model="logsDetails.dPlanPrecent"/>
          </el-form-item>
          <el-form-item label="实际完成%">
            <el-input
              v-model="logsDetails.dActPrecent"
              oninput="value=value.replace(/[^\d]/g,'')"
              maxLength='3'
              clearable
              placeholder="请输入整数"
            />
          </el-form-item>
          <el-form-item label="任务类型">
            <el-select v-model="value1" style="width: 300px" placeholder="请选择">
              <el-option
                v-for="item in Options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注">
            <el-input   type="textarea"
                        :rows="3"
                        maxlength="50"
                        show-word-limit
                        placeholder="请输入备注内容" v-model="logsDetails.memo"/>
          </el-form-item>
          <el-form-item label="花费时长">
            <el-input
              v-model="logsDetails.durtime"
              oninput="value=value.replace(/[^\d]/g,'')"
              maxLength='2'
              clearable
              placeholder="请输入整数"
            />
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
  import { selectlogsDetail,savelogsUpdate,getTasksList,getUserListByExample,getplanValue,getUserList } from '../../api/logManagement'
  export default {
    name: 'Edit',
    data () {
      return {
        rowId: '',
        loading: false,
        value: [],
        taskOptions: [],
        UserOptions: [],
        tasksname: '',
        task: '',
        specVisiable: false,
        editVisiable: false,
        list: null,
        deleteId:[],
        Options:  [{
          value: '项目任务',
          label: '项目任务'
        }, {
          value: '日常工作',
          label: '日常工作'
        }, {
          value: '其他',
          label: '其他'
        }],
        value1: '',
        status: 'unchanged',
        logsDetails: {
          id: '',
          projectTaskId: '',
          logsId: '',
          dContent: '',
          dPlanPrecent: '',
          dActPrecent: '',
          dTaskType: '',
          memo: '',
          durtime: '',
          taskname: ''
        },
      }
    },
    created () {
       this.getList()
       this.getTasks()
      //this.getUser()
        getUserList().then(response => {
          this.loading = false;
          this.UserOptions = response.data
        }).catch(() => {
          this.UserOptions = []
        })
    },
    mounted () {
      // 保留数据源

    },
    methods: {
      init: function() {
        if (this.$route.query.id == null) {
          return false;
        }
      },

      /**
       * @description 获取项目列表
       * @author freshman
       */
      getList () {
        selectlogsDetail(this.$route.query.id).then(response => {
          this.list = response.data
          for (let i = 0; i < this.list.logsDetails.length; i++) {
            this.$set(this.list.logsDetails[i], 'status', this.status)
          }
          console.log(this.list)
        }).catch(() => {
          this.list = []
        })
      },
      getTasks(){
        getTasksList().then(response => {
          this.taskOptions = response.data
        })
      },
      remoteMethodUser(query) {
        this.loading = true;
        if (query==null || query=='') {
          getUserList().then(response => {
            this.loading = false;
            this.UserOptions = response.data
          }).catch(() => {
            this.UserOptions = []
          })
        } else {
          this.loading = true;
          getUserListByExample(JSON.stringify(query)).then(response => {
            this.loading = false;
            this.UserOptions = response.data
          }).catch(() => {
            this.list = []
          })
        }
      },
      autoPlan(query) {
        console.log(query)
        if(query=='' || query==null || query==undefined){
          this.logsDetails.dPlanPrecent = ''
        }else{
          getplanValue(JSON.stringify(query)).then(response => {
            this.logsDetails.dPlanPrecent = response.data
            console.log(this.logsDetails.dPlanPrecent);
          }).catch(() => {
            this.$message.error({
              title: '失败',
              message: '自动获取失败'
            })
          })
        }
      },
      handleCancel: function() {
        this.$store.state.tagsView.visitedViews.splice(this.$store.state.tagsView.visitedViews.findIndex(item => item.path === this.$route.path), 1)
        this.$router.push({ path: '/logManagement/logManagement' })
      },
      handleSpecificationDelete(row) {
        const index = this.list.logsDetails.indexOf(row)
        this.list.logsDetails.splice(index, 1)
        this.deleteId.push(row.id)
      },
      handleSpecificationShow() {
        this.value1 = ''
        this.logsDetails = {  id: '', projectTaskId: '', logsId: '', dContent: '', dPlanPrecent: '', dActPrecent: '', dTaskType: '', memo: '', durtime: '', taskname:'' }
        this.specVisiable=true;
      },
      automatic() {
        let index = this.list.logsDetails.length;
        let memo = '';
        let allmemo = '';
        for (let i = 0; i < index; i++) {
          memo = "任务名: " + this.list.logsDetails[i].taskname + "   计划完成: " + this.list.logsDetails[i].dPlanPrecent + "%" + "   实际完成: " + this.list.logsDetails[i].dActPrecent + "%"  + "   花费时长: " + this.list.logsDetails[i].durtime + '\r\n';
          allmemo = allmemo + memo;
        }
        if(this.list.logsContent != ''){
          this.$confirm('此操作将重置日志, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: '日志重置成功!'
            });
            this.list.logsContent = allmemo;
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消日志重置'
            });
          });
        }else{
          this.list.logsContent = allmemo;
        }
      },
      handleSpecificationAdd() {
        let index = this.list.logsDetails.length
        if(this.logsDetails.taskname == ''||this.logsDetails.taskname == null||this.logsDetails.taskname == undefined){
          this.$message({
            message: '任务不能为空',
            type: 'warning'
          });
        }else{
          this.status = 'insert'
          this.$set(this.logsDetails,'status', this.status)
          this.logsDetails.dTaskType = this.value1
          this.list.logsDetails.splice(index, 0, this.logsDetails)
          this.specVisiable = false
          console.log(this.list.logsDetails)
          console.log(456)
          this.logsDetails.taskname == ''
          console.log(this.logsDetails.taskname)
        }
      },
      handleUpdate(row){
        this.editVisiable = true
        this.logsDetails = row;
        console.log(row)
        console.log(666)
        this.value1= row.dTaskType
        for (let i = 0; i < this.list.logsDetails.length; i++) {
          if(row.taskname == this.list.logsDetails[i].taskname && row.status !== 'insert'){
            this.status='update'
            this.$set(this.list.logsDetails[i],'status',this.status)
          }
        }
        this.rowId = row.id
      },
      handleEdit: function() {
        this.$set(this.list, 'deleteId', this.deleteId)
        let t = JSON.stringify(this.list)
        console.log(this.list);
        console.log(typeof t);
        savelogsUpdate(t).then(response => {
          // const index = this.list.indexOf(row)
          // this.list.splice(index, 1)
          this.$message.success({
            title: '成功',
            message: '更新成功'
          })
          // this.$store.state.tagsView.visitedViews.splice(this.$store.state.tagsView.visitedViews.findIndex(item => item.path === this.$route.path), 1)
          // this.$router.push({ path: '/logManagement/logManagement' })
        }).catch(response => {
          this.$message.error({
            title: '失败',
            message: '更新失败'
          })
        });
      },
      updateComplete(){
        this.logsDetails.dTaskType = this.value1
        let t = 0;
        for (let i = 0; i < this.list.logsDetails.length; i++) {
            if(this.list.logsDetails[i].taskname =='' || this.list.logsDetails[i].taskname == null){
              this.$message.error({
                title: '失败',
                message: '任务不能为空'
              })
              t++;
            }
        }
        if(t==0){
          for (let i = 0; i < this.list.logsDetails.length; i++) {
            if( this.rowId === this.list.logsDetails[i].id){
              this.list.logsDetails[i].taskname = this.logsDetails.taskname
            }
          }
             this.editVisiable = false
        }
      }
    },
    filters: {

    },
  }
</script>

<style lang="scss" scoped media="screen">
  .page-content {
    margin: 20px 16px;
    padding:10px  20px 10px;
    background-color: #fff;
    height: calc(100vh - 90px);
    margin-bottom: 40px;
    overflow: auto;
  }
  .filter-container{
    padding:6px  0px 10px;
    background-color: #fff;
  }
  .el-card {
    margin-bottom: 10px;
  }
  .el-card, .el-message {
    border-radius: 4px;
    overflow: auto;
  }
  .op-container{
    margin-bottom: 20px;
  }
</style>

