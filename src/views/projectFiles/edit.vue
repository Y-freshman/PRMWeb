<template>
  <div class="page-content">
    <el-card class="box-card">
      <el-form ref="list" :inline="true"  :model="list" label-width="100px" >
        <el-form-item label="编码" prop="code">
          <el-input v-model="list.code"/>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="list.name"/>
        </el-form-item>

        <el-form-item label="项目经理" prop="pm">
          <el-select v-model="list.pm"
                     filterable
                     remote
                     clearable
                     :remote-method="remoteMethodPm"
                     :loading="loading"
                     style="width: 185px"
                     placeholder="请输入关键词">
            <el-option
              v-for="item in PmOptions"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开发经理" prop="devManagement">
          <el-select v-model="list.devManagement"
                     filterable
                     remote
                     clearable
                     :remote-method="remoteMethodDev"
                     :loading="loading"
                     style="width: 185px"
                     placeholder="请输入关键词">
            <el-option
              v-for="item in DevOptions"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="测试经理" prop="testManagement">
          <el-select v-model="list.testManagement"
                     filterable
                     remote
                     clearable
                     :remote-method="remoteMethodTest"
                     :loading="loading"
                     style="width: 185px"
                     placeholder="请输入关键词">
            <el-option
              v-for="item in TestOptions"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="运维经理" prop="deplyManagement">
          <el-select v-model="list.deplyManagement"
                     filterable
                     remote
                     clearable
                     :remote-method="remoteMethodDeply"
                     :loading="loading"
                     style="width: 185px"
                     placeholder="请输入关键词">
            <el-option
              v-for="item in DeplyOptions"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="list.status" style="width: 185px" placeholder="请选择">
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="人天" prop="personday">
          <el-input
            v-model="list.personday"
            oninput="value=value.replace(/[^\d]/g,'')"
            maxLength='3'
            clearable
            style="width: 185px"
            placeholder="请输入整数"
          />
        </el-form-item>
        <el-form-item label="进度(%)" prop="actPercent">
          <el-input
            v-model="list.actPercent"
            oninput="value=value.replace(/[^\d]/g,'')"
            maxLength='3'
            clearable
            style="width: 185px"
            placeholder="请输入整数"
          />
        </el-form-item>
        <el-form-item label="开始时间" prop="startDate">
          <el-date-picker v-model="list.startDate"
                          type="date"
                          placeholder="选择日期"
                          value-format="yyyy-MM-dd"
                          style="width: 185px"> </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="endDate">
          <el-date-picker v-model="list.endDate"
                          type="date"
                          placeholder="选择日期"
                          value-format="yyyy-MM-dd"
                          style="width: 185px"> </el-date-picker>
        </el-form-item>
      </el-form>

<!--      <el-form ref="list" :inline="true"  :model="list" label-width="100px">-->
<!--        <el-form-item label="开始时间" prop="startDate">-->
<!--          <el-date-picker v-model="list.startDate" type="date" placeholder="选择日期"> </el-date-picker>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="结束时间" prop="endDate">-->
<!--          <el-date-picker v-model="list.endDate" type="date" placeholder="选择日期" > </el-date-picker>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
      <el-form ref="list"  :model="list" label-width="100px">
        <el-form-item label="备注" prop="memo">
          <el-input   type="textarea"
                      :rows="3"
                      maxlength="150"
                      show-word-limit
                      placeholder="请输入备注内容" v-model="list.memo"/>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <h3>项目成员</h3>
      <el-button :plain="true" type="primary" @click="handleSpecificationShow">添加</el-button>
      <el-table  style="margin-top: 10px"  :data="list.projectGroups"   border fit highlight-current-row>
        <el-table-column align="center" label="成员姓名" prop="username" />
        <el-table-column align="center" label="备注" prop="gMemo" />
        <el-table-column align="center" label="操作"  fixed="right" width="200" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button  type="primary" size="mini"  @click="handleUpdate(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini"  @click="handleSpecificationDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog :visible.sync="editVisiable" title="编辑项目成员">
        <el-form ref="attributeForm" :model="projectGroups" status-icon label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
          <el-form-item label="成员姓名" prop="username">
            <el-select v-model="projectGroups.username"
                       filterable
                       remote
                       clearable
                       :remote-method="remoteMethodUser"
                       :loading="loading"
                       style="width: 300px"
                       placeholder="请输入成员姓名">
              <el-option
                v-for="item in UserOptions"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
<!--          <el-form-item label="成员姓名" >-->
<!--            <el-input v-model="projectGroups.username"/>-->
<!--          </el-form-item>-->
          <el-form-item label="成员备注">
            <el-input   type="textarea"
                        :rows="3"
                        maxlength="50"
                        show-word-limit
                        placeholder="请输入备注内容" v-model="projectGroups.gMemo"/>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editVisiable = false">取消</el-button>
          <el-button type="primary" @click="updateComplete">确定</el-button>
        </div>
      </el-dialog>

      <el-dialog :visible.sync="specVisiable" title="添加项目成员">
        <el-form ref="attributeForm" :model="projectGroups" status-icon label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
          <el-form-item label="成员姓名" prop="username">
            <el-select v-model="projectGroups.username"
                       filterable
                       remote
                       clearable
                       :remote-method="remoteMethodUser"
                       :loading="loading"
                       style="width: 300px"
                       placeholder="请输入成员姓名">
              <el-option
                v-for="item in UserOptions"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
<!--          <el-form-item label="成员姓名" >-->
<!--            <el-input v-model="projectGroups.username"/>-->
<!--          </el-form-item>-->
          <el-form-item label="成员备注">
            <el-input   type="textarea"
                        :rows="3"
                        maxlength="50"
                        show-word-limit
                        placeholder="请输入备注内容" v-model="projectGroups.gMemo"/>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="specVisiable = false">取消</el-button>
          <el-button type="primary" @click="handleSpecificationAdd">确定</el-button>
        </div>
      </el-dialog>

    </el-card>

    <el-card class="box-card">
      <h3>项目里程碑</h3>
      <el-button :plain="true" type="primary" @click="ProjectStateAdd()">添加</el-button>
      <el-table  style="margin-top: 10px"  :data="list.projectStates"   border fit highlight-current-row>
        <el-table-column align="center" label="项目阶段" prop="projectStage" />
        <el-table-column align="center" label="备注" prop="memo" />
        <el-table-column align="center" label="日期" prop="date" />
        <el-table-column align="center" label="操作"  fixed="right" width="200" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button  type="primary" size="mini"  @click="ProjectStateEdit(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini"  @click="ProjectStateDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog :visible.sync="specVisiableProjectStates" title="添加项目里程碑">
        <el-form ref="attributeForm" :model="projectStates" status-icon label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
          <el-form-item label="项目阶段">
            <el-select v-model="projectStates.projectStage" style="width: 300px" placeholder="请选择">
              <el-option
                v-for="item in typeOptions"
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
                        placeholder="请输入备注内容" v-model="projectStates.memo"/>
          </el-form-item>
          <el-form-item label="日期">
            <el-date-picker v-model="projectStates.date"
                            type="date"
                            placeholder="选择日期"
                            value-format="yyyy-MM-dd"
                            style="width: 300px"/>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="specVisiableProjectStates = false">取消</el-button>
          <el-button type="primary" @click="ProjectStatesAddSure">确定</el-button>
        </div>
      </el-dialog>

      <el-dialog :visible.sync="editVisiableProjectStates" title="编辑项目里程碑">
        <el-form ref="attributeForm" :model="projectStates" status-icon label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
          <el-form-item label="项目阶段">
            <el-select v-model="projectStates.projectStage" style="width: 300px" placeholder="请选择">
              <el-option
                v-for="item in typeOptions"
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
                        placeholder="请输入备注内容" v-model="projectStates.memo"/>
          </el-form-item>
          <el-form-item label="日期">
            <el-date-picker v-model="projectStates.date"
                            type="date"
                            placeholder="选择日期"
                            value-format="yyyy-MM-dd"
                            style="width: 300px"> </el-date-picker>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editVisiableProjectStates = false">取消</el-button>
          <el-button type="primary" @click="ProjectStatesEditSure">确定</el-button>
        </div>
      </el-dialog>
    </el-card>

    <el-card class="box-card">
      <h3>项目变更</h3>
      <el-button :plain="true" type="primary" @click="ProjectChangeAdd">添加</el-button>
      <el-table  style="margin-top: 10px"  :data="list.projectChanges"   border fit highlight-current-row>
        <el-table-column align="center" label="原因" prop="reason" />
        <el-table-column align="center" label="备注" prop="memo" />
        <el-table-column align="center" label="类型" prop="type" />
        <el-table-column align="center" label="日期" prop="time" />
        <el-table-column align="center" label="提交人" prop="username" />
        <el-table-column align="center" label="操作"  fixed="right" width="200" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button  type="primary" size="mini"  @click="ProjectChangeEdit(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini"  @click="ProjectChangeDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog :visible.sync="specVisiableProjectChanges" title="添加项目变更">
        <el-form ref="attributeForm" :model="projectChanges" status-icon label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
          <el-form-item label="原因">
            <el-input v-model="projectChanges.reason"/>
          </el-form-item>
          <el-form-item label="类型">
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
                        placeholder="请输入备注内容" v-model="projectChanges.memo"/>
          </el-form-item>
          <el-form-item label="日期">
            <el-date-picker v-model="projectChanges.time"
                            type="date"
                            placeholder="选择日期"
                            value-format="yyyy-MM-dd"
                            style="width: 300px"> </el-date-picker>
          </el-form-item>
          <el-form-item label="提交人" prop="username">
            <el-select v-model="projectChanges.username"
                       filterable
                       remote
                       clearable
                       :remote-method="remoteMethodCheckUser"
                       :loading="loading"
                       style="width: 300px"
                       placeholder="请输入提交人姓名">
              <el-option
                v-for="item in CheckUserOptions"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="specVisiableProjectChanges = false">取消</el-button>
          <el-button type="primary" @click="ProjectChangesAddSure">确定</el-button>
        </div>
      </el-dialog>

      <el-dialog :visible.sync="editVisiableProjectChanges" title="编辑项目变更">
        <el-form ref="attributeForm" :model="projectChanges" status-icon label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
          <el-form-item label="原因">
            <el-input v-model="projectChanges.reason"/>
          </el-form-item>
          <el-form-item label="类型">
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
                        placeholder="请输入备注内容" v-model="projectChanges.memo"/>
          </el-form-item>
          <el-form-item label="日期">
            <el-date-picker v-model="projectChanges.time"
                            type="date" placeholder="选择日期"
                            value-format="yyyy-MM-dd"
                            style="width: 300px"> </el-date-picker>
          </el-form-item>
          <el-form-item label="提交人" prop="username">
            <el-select v-model="projectChanges.username"
                       filterable
                       remote
                       clearable
                       :remote-method="remoteMethodCheckUser"
                       :loading="loading"
                       style="width: 300px"
                       placeholder="请输入提交人姓名">
              <el-option
                v-for="item in CheckUserOptions"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editVisiableProjectChanges = false">取消</el-button>
          <el-button type="primary" @click="ProjectChangesEditSure">确定</el-button>
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
  import { selectProject,saveUpdate,getUserList,getUserListByExample} from '../../api/projectFiles'
  export default {
    name: 'Editor',
    data () {
      return {
        users: [],
        loading: false,
        PmOptions: [],
        DevOptions: [],
        TestOptions: [],
        DeplyOptions: [],
        UserOptions: [],
        CheckUserOptions: [],
        value: [],
        typeOptions: [{
          value: 'M1供应商选择',
          label: 'M1供应商选择'
        }, {
          value: 'M2需求确认',
          label: 'M2需求确认'
        }, {
          value: 'M3方案设计',
          label: 'M3方案设计'
        }, {
          value: 'M4系统交付',
          label: 'M4系统交付'
        },{
          value: 'M5系统测试',
          label: 'M5系统测试'
        },{
          value: 'M6上线运维',
          label: 'M6上线运维'
        }],
        Options:  [{
          value: '资源',
          label: '资源'
        }, {
          value: '需求',
          label: '需求'
        }, {
          value: '计划',
          label: '计划'
        }],
        value1: '',
        specVisiable: false,
        editVisiable: false,
        specVisiableProjectStates: false,
        editVisiableProjectStates: false,
        specVisiableProjectChanges: false,
        editVisiableProjectChanges: false,
        list: null,
        deleteId:[],
        deleteprojectStateId:[],
        deleteprojectChangeId:[],
        status: 'unchanged',
        projectGroups: {
          id: '',
          projectId: '',
          userId: '',
          gMemo: '',
          gRole: '',
          username: ''
        },
        projectStates: {
          id: '',
          projectId: '',
          projectStage: '',
          memo: '',
          date: ''
        },
        projectChanges: {
          id: '',
          projectId: '',
          userId: '',
          reason: '',
          memo: '',
          time: '',
          type: '',
          username: ''
        }
      }
    },
    created () {
      this.getList()
      //this.getUser()
      getUserList().then(response => {
        this.loading = false;
        this.PmOptions  = response.data
        this.TestOptions = response.data
        this.DeplyOptions  = response.data
        this.UserOptions = response.data
        this.CheckUserOptions  = response.data
        this.DevOptions = response.data
      }).catch(() => {
        this.PmOptions  = []
        this.TestOptions =[]
        this.DeplyOptions  = []
        this.DevOptions  = []
        this.UserOptions = []
        this.CheckUserOptions  = []
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
        selectProject(this.$route.query.id).then(response => {
          this.list = response.data
          for (let i = 0; i < this.list.projectGroups.length; i++) {
            this.$set(this.list.projectGroups[i], 'status', this.status)
            this.users.push(this.list.projectGroups[i].username)
          }
          for (let i = 0; i < this.list.projectStates.length; i++) {
            this.$set(this.list.projectStates[i], 'status', this.status)
          }
          for (let i = 0; i < this.list.projectChanges.length; i++) {
            this.$set(this.list.projectChanges[i], 'status', this.status)
          }
          console.log(this.list)
          console.log(this.users)

        }).catch(() => {
          this.list = []
        })
      },
      remoteMethodPm(query) {
        if (query==null || query=='') {
          this.loading = true;
          getUserList().then(response => {
            this.loading = false;
            this.PmOptions  = response.data
          }).catch(() => {
            this.PmOptions = []
          })
        } else {
          this.loading = true;
          getUserListByExample(JSON.stringify(query)).then(response => {
            this.loading = false;
            this.PmOptions  = response.data
          }).catch(() => {
            this.PmOptions = []
          })
        }
      },
      remoteMethodDev(query) {
        if (query==null || query=='') {
          this.loading = true;
          getUserList().then(response => {
            this.loading = false;
            this.DevOptions = response.data
          }).catch(() => {
            this.DevOptions = []
          })
        } else {
          this.loading = true;
          getUserListByExample(JSON.stringify(query)).then(response => {
            this.loading = false;
            this.DevOptions  = response.data
          }).catch(() => {
            this.DevOptions = []
          })
        }
      },
      remoteMethodTest(query) {
        if (query==null || query=='') {
          this.loading = true;
          getUserList().then(response => {
            this.loading = false;
            this.TestOptions  = response.data
          }).catch(() => {
            this.TestOptions = []
          })
        } else {
          this.loading = true;
          getUserListByExample(JSON.stringify(query)).then(response => {
            this.loading = false;
            this.TestOptions = response.data
          }).catch(() => {
            this.TestOptions = []
          })
        }
      },
      remoteMethodDeply(query) {
        if (query==null || query=='') {
          this.loading = true;
          getUserList().then(response => {
            this.loading = false;
            this.DeplyOptions = response.data
          }).catch(() => {
            this.DeplyOptions = []
          })
        } else {
          this.loading = true;
          getUserListByExample(JSON.stringify(query)).then(response => {
            this.loading = false;
            this.DeplyOptions  = response.data
          }).catch(() => {
            this.DeplyOptions = []
          })
        }
      },
      remoteMethodUser(query) {
        if (query==null || query=='') {
          this.loading = true;
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
            this.UserOptions  = response.data
          }).catch(() => {
            this.UserOptions = []
          })
        }
      },
      remoteMethodCheckUser(query) {
        if (query==null || query=='') {
          this.loading = true;
          getUserList().then(response => {
            this.loading = false;
            this.CheckUserOptions = response.data
          }).catch(() => {
            this.CheckUserOptions = []
          })
        } else {
          this.loading = true;
          getUserListByExample(JSON.stringify(query)).then(response => {
            this.loading = false;
            this.CheckUserOptions  = response.data
          }).catch(() => {
            this.CheckUserOptions = []
          })
        }
      },
      handleCancel: function() {
        this.$store.state.tagsView.visitedViews.splice(this.$store.state.tagsView.visitedViews.findIndex(item => item.path === this.$route.path), 1)
        this.$router.push({ path: '/projectFiles/projectFiles' })
      },
      handleSpecificationDelete(row) {
        const index = this.list.projectGroups.indexOf(row)
        this.list.projectGroups.splice(index, 1)
        this.deleteId.push(row.id)
      },
      handleSpecificationShow() {
       this.projectGroups = {  id: '', projectId: '', userId: '', gMemo: '', gRole: '', username: '' }
        this.specVisiable=true;
      },
      ProjectStatesEditSure() {
        this.list.status = this.list.projectStates[this.list.projectStates.length-1].projectStage
        this.editVisiableProjectStates = false
      },
      ProjectStateDelete(row) {
        const index = this.list.projectStates.indexOf(row)
        this.list.projectStates.splice(index, 1)
        this.deleteprojectStateId.push(row.id)
      },
      ProjectStateEdit(row) {
        this.editVisiableProjectStates = true
        this.projectStates = row;
        console.log(row)
        for (let i = 0; i < this.list.projectStates.length; i++) {
          if(row.projectStage == this.list.projectStates[i].projectStage && row.status !== 'insert'){
            this.status='update'
            this.$set(this.list.projectStates[i],'status',this.status)
          }
        }
        console.log( this.list.status )
        console.log(this.list.projectStates)
      },
      ProjectStateAdd() {
        this.projectStates = {  id: '', projectId: '', projectStage: '', memo: '', date: ''}
        this.specVisiableProjectStates=true;
      },
      ProjectStatesAddSure() {
        let index = this.list.projectStates.length
        if(this.projectStates.projectStage === ''){
          this.$message({
            message: '项目阶段不能为空',
            type: 'warning'
          });
        }else{
          console.log(this.projectStates.projectStage)
          console.log(this.projectStates.memo)
          this.status = 'insert'
          this.$set(this.projectStates,'status', this.status)
          this.list.projectStates.splice(index, 0, this.projectStates)
          this.list.status = this.projectStates.projectStage
          this.specVisiableProjectStates = false
        }
      },

      ProjectChangesEditSure() {
        this.projectChanges.type = this.value1
        this.editVisiableProjectChanges = false
      },
      ProjectChangeDelete(row) {
        const index = this.list.projectChanges.indexOf(row)
        this.list.projectChanges.splice(index, 1)
        this.deleteprojectChangeId.push(row.id)
      },
      ProjectChangeEdit(row) {
        this.value1= row.type
        this.editVisiableProjectChanges = true
        this.projectChanges = row;
        console.log(row)
        for (let i = 0; i < this.list.projectChanges.length; i++) {
          if(row.reason == this.list.projectChanges[i].reason && row.status !== 'insert'){
            this.status='update'
            this.$set(this.list.projectChanges[i],'status',this.status)
          }
        }
        console.log(this.list.projectChanges)
      },
      ProjectChangeAdd() {
        this.projectChanges = { id: '', projectId: '', reason: '', memo: '', time: '', type: ''}
        this.value1=''
        this.specVisiableProjectChanges=true;
      },
      ProjectChangesAddSure() {
        let index = this.list.projectChanges.length
        if(this.projectChanges.reason === ''){
          this.$message({
            message: '项目变更原因不能为空',
            type: 'warning'
          });
        }else{
          this.status = 'insert'
          this.$set(this.projectChanges,'status', this.status)
          this.projectChanges.type = this.value1
          this.list.projectChanges.splice(index, 0, this.projectChanges)
          this.specVisiableProjectChanges = false
        }
      },

      handleSpecificationAdd() {
        let index = this.list.projectGroups.length
        let yy=0
        if(this.projectGroups.username === ''){
          this.$message({
                message: '用户名不能为空',
                type: 'warning'
              });
        } else{
          for (let i = 0; i < index; i++) {
            if(this.projectGroups.username === this.list.projectGroups[i].username){
              yy++
            }
          }
          if(yy != 0){
            this.$message({
              message: '项目成员不能为重复',
              type: 'warning'
            });
          }else{
            this.status = 'insert'
            this.$set(this.projectGroups,'status', this.status)
            this.list.projectGroups.splice(index, 0, this.projectGroups)
            // let t = this.list.projectGroups.length
            // this.$set(this.list.projectGroups[t-1],'status',this.status)
            this.specVisiable = false
            console.log(this.list.projectGroups)
          }
        }
      },
      handleUpdate(row){
        this.editVisiable = true
        this.projectGroups = row;
        console.log(row)
        for (let i = 0; i < this.list.projectGroups.length; i++) {
          if(row.username == this.list.projectGroups[i].username && row.status !== 'insert'){
            this.status='update'
            this.$set(this.list.projectGroups[i],'status',this.status)
          }
        }
        console.log(this.list.projectGroups)
      },
      updateComplete(){
        let index = this.list.projectGroups.length;
        let yy = 0
        for (let i = 0; i < index; i++){
          for (let j = i+1; j < index; j++) {
            if (this.list.projectGroups[i].username == this.list.projectGroups[j].username) {
              yy++
              console.log(this.list.projectGroups[i].username + "====" +this.list.projectGroups[j].username)
            }
          }
        }
        console.log(yy)
        if(yy != 0){
          this.$message({
            message: '项目成员不能重复',
            type: 'warning'
          });
        }else{
          this.editVisiable = false
        }
      },
      handleEdit: function() {
        this.$set(this.list, 'deleteId', this.deleteId)
        this.$set(this.list, 'deleteprojectStateId', this.deleteprojectStateId)
        this.$set(this.list, 'deleteprojectChangeId', this.deleteprojectChangeId)
        let t = JSON.stringify(this.list)
        console.log(typeof t);
        saveUpdate(t).then(response => {
            this.$message.success({
              title: '成功',
              message: '修改成功'
            })
          // this.$store.state.tagsView.visitedViews.splice(this.$store.state.tagsView.visitedViews.findIndex(item => item.path === this.$route.path), 1)
          // this.$router.push({ path: '/projectFiles/projectFiles' })
          }).catch(response => {
          this.$message.error({
            title: '失败',
            message: '修改失败'
          })
        });
      }
    },filters: {

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
