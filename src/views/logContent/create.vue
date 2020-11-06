<template>
  <div class="page-content">
    <el-card class="box-card">
      <h3>日志编辑</h3>
      <el-form ref="list" :inline="true"  :model="list" label-width="100px" >
        <el-form-item label="用户姓名" prop="username">
          <el-input v-model="list.username"/>
        </el-form-item>
        <el-form-item label="填写时间" prop="logsDate">
          <el-date-picker v-model="list.logsDate" type="date" placeholder="选择日期" style="width: 185px"> </el-date-picker>
        </el-form-item>
        <el-form-item label="工作时长" prop="durTime">
          <el-time-select
            v-model="list.durTime"
            :picker-options="{
            start: '00:00',
            step: '01:00',
            end: '8:00'
            }"
            style="width: 185px"
            placeholder="选择时间">
          </el-time-select>
        </el-form-item>
        <el-form-item label="加班时长" prop="extTime">
          <el-time-select
            v-model="list.extTime"
            :picker-options="{
            start: '00:00',
            step: '01:00',
            end: '8:00'
            }"
            style="width: 185px"
            placeholder="选择时间">
          </el-time-select>
        </el-form-item>
        <el-form-item label="开始时间" prop="startDate">
          <el-date-picker v-model="list.startDate" type="date" placeholder="选择日期" style="width: 185px"> </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="endDate">
          <el-date-picker v-model="list.endDate" type="date" placeholder="选择日期" style="width: 185px"> </el-date-picker>
        </el-form-item>
      </el-form>
      <el-form ref="list"  :model="list" label-width="100px">
        <el-form-item label="备注" prop="memo">
          <el-input   type="textarea"
                      :rows="3"
                      placeholder="请输入备注内容" v-model="list.memo"/>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <h3>日志明细</h3>
      <el-button :plain="true" type="primary" @click="handleSpecificationShow">添加</el-button>
      <el-table  style="margin-top: 10px"  :data="list.logsDetails"   border fit highlight-current-row>
        <el-table-column align="center" label="任务" prop="dContent" />
        <el-table-column align="center" label="计划完成%" prop="dPlanPrecent" />
        <el-table-column align="center" label="实际完成" prop="dActPrecent" />
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
            <el-input v-model="logsDetails.dContent"/>
          </el-form-item>
          <el-form-item label="计划完成">
            <el-input v-model="logsDetails.dPlanPrecent"/>
          </el-form-item>
          <el-form-item label="实际完成">
            <el-input v-model="logsDetails.dActPrecent"/>
          </el-form-item>
          <el-form-item label="任务类型">
            <el-input v-model="logsDetails.dTaskType"/>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="logsDetails.memo"/>
          </el-form-item>
          <el-form-item label="花费时长">
            <el-input v-model="logsDetails.durtime"/>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editVisiable = false">取消</el-button>
          <el-button type="primary" @click="updateComplete">确定</el-button>
        </div>
      </el-dialog>

      <el-dialog :visible.sync="specVisiable" title="添加日志明细">
        <el-form ref="attributeForm" :model="logsDetails" status-icon label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
          <el-form-item label="任务">
            <el-input v-model="logsDetails.dContent"/>
          </el-form-item>
          <el-form-item label="计划完成">
            <el-input v-model="logsDetails.dPlanPrecent"/>
          </el-form-item>
          <el-form-item label="实际完成">
            <el-input v-model="logsDetails.dActPrecent"/>
          </el-form-item>
          <el-form-item label="任务类型">
            <el-input v-model="logsDetails.dTaskType"/>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="logsDetails.memo"/>
          </el-form-item>
          <el-form-item label="花费时长">
            <el-input v-model="logsDetails.durtime"/>
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
  import { selectlogsDetail,savelogsInsert } from '../../api/logContent'
  export default {
    name: 'Create',
    data () {
      return {
        loading: false,
        value: [],
        specVisiable: false,
        editVisiable: false,
        list: {
          id: '',
          userId: '',
          logsDate: '',
          logsContent: '',
          durTime: '',
          extTime: '',
          startDate: '',
          endDate: '',
          username: '',
          logsDetails: [],
        },
        deleteId:[],
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
          durtime: ''
        },
      }
    },
    created () {
      //this.getList()
      //this.getUser()
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
      handleCancel: function() {
        this.$store.state.tagsView.visitedViews.splice(this.$store.state.tagsView.visitedViews.findIndex(item => item.path === this.$route.path), 1)
        this.$router.push({ path: '/logContent/logContent' })
      },
      handleSpecificationDelete(row) {
        const index = this.list.logsDetails.indexOf(row)
        this.list.logsDetails.splice(index, 1)
        this.deleteId.push(row.id)
      },
      handleSpecificationShow() {
        this.logsDetails = {  id: '', projectTaskId: '', logsId: '', dContent: '', dPlanPrecent: '', dActPrecent: '', dTaskType: '', memo: '' }
        this.specVisiable=true;
      },
      handleSpecificationAdd() {
        let index = this.list.logsDetails.length

        if(this.logsDetails.dContent === ''){
          this.$message({
            message: '任务不能为空',
            type: 'warning'
          });
        }else{
          this.status = 'insert'
          this.$set(this.logsDetails,'status', this.status)
          this.list.logsDetails.splice(index, 0, this.logsDetails)
          // let t = this.list.logsDetails.length
          // this.$set(this.list.logsDetails[t-1],'status',this.status)
          this.specVisiable = false
          console.log(this.list.logsDetails)
        }
      },
      handleUpdate(row){
        this.editVisiable = true
        this.logsDetails = row;
        console.log(row)
        for (let i = 0; i < this.list.logsDetails.length; i++) {
          if(row.dContent == this.list.logsDetails[i].dContent && row.status !== 'insert'){
            this.status='update'
            this.$set(this.list.logsDetails[i],'status',this.status)
          }
        }
        console.log(this.list.logsDetails)
      },
      handleEdit: function() {
        this.$set(this.list, 'deleteId', this.deleteId)
        let t = JSON.stringify(this.list)
        console.log(typeof t);
        if(this.list.name==''||this.list.name==null){
          this.$message.error({
            title: '失败',
            message: '项目名不能为空'
          })
          return false;
        }else{
          savelogsInsert(t).then(response => {
            // const index = this.list.indexOf(row)
            // this.list.splice(index, 1)
            this.$message.success({
              title: '成功',
              message: '创建日志成功'
            })
            this.$store.state.tagsView.visitedViews.splice(this.$store.state.tagsView.visitedViews.findIndex(item => item.path === this.$route.path), 1)
            this.$router.push({ path: '/logContent/logContent' })
          }).catch(response => {
            this.$message.error({
              title: '失败',
              message: '创建日志失败'
            })
          });
        }
      },
      updateComplete(){
        this.editVisiable = false
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

