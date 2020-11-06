<template>
  <div class="page-content">
    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input  v-model="searchName"  clearable class="filter-item" style="width: 200px;" placeholder="请输入项目名称"/>
      <el-button  class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
      <el-button  class="filter-item" type="primary" icon="el-icon-edit" @click="handleInsert">添加</el-button>
    </div>
    <el-table v-loading="listLoading" :data="list"   element-loading-text="正在查询中。。。" border fit highlight-current-row>
<!--      <el-table-column align="center" label="编码"  prop="code"  sortable/>-->
      <el-table-column align="center" label="名称" prop="name" />
      <el-table-column align="center" label="项目经理" prop="pm" />
      <el-table-column align="center" label="开发经理" prop="devManagement" />
      <el-table-column align="center" label="测试经理" prop="testManagement" />
<!--      <el-table-column align="center" label="运维经理" prop="deplyManagement" />-->
      <el-table-column align="center" label="开始时间" prop="startDate" width="120"  />
      <el-table-column align="center" label="结束时间" prop="endDate" width="120"  />
      <el-table-column align="center" label="状态" prop="status" />
<!--      <el-table-column align="center" label="人天" prop="personday" />-->
      <el-table-column align="center" label="进度(%)" prop="actPercent" />
<!--      <el-table-column align="center" label="备注" show-overflow-tooltip  prop="memo" />-->
      <el-table-column align="center" label="操作"  fixed="right" width="150" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button  type="primary" size="mini" @click="handleUpdate(scope.row)" >编辑</el-button>
          <el-button   type="danger" size="mini" @click="handleDelete(scope.row)" icon="el-icon-delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />
  </div>
</template>

<script>
  import { getSelectProject,getListByName,removeProject} from '../../api/projectFiles'
  import { getUser } from '../../utils/auth'
  import Pagination from '@/components/Pagination'
  /*import 'dhtmlx-gantt/codebase/dhtmlxgantt'
  import "dhtmlx-gantt/codebase/ext/dhtmlxgantt_tooltip.js"*/

  //import "../../assets/gantttip.css"
  export default {
    name: 'Project',
    components: { Pagination },
    data () {
      return {
        list: null,
        total: 0,
        listLoading: true,
        listQuery: {
          pageSize: 10,
          pageNum: 1,
        },
        searchName: 'freshman',
      }
    },
    created () {
      this.getList()
      /*gantt.plugins({
        tooltip: false
      });
      gantt.init("gantt_here");*/
    },
    mounted (){
      // document.getElementById('propGantt')
      console.log(getUser().name)
    },
    methods: {
      /**
       * @description 获取项目列表
       * @author freshman
       */

        getList () {
        this.listLoading = true
        let a = this.listQuery.pageSize;
        let b = this.listQuery.pageNum;
        if(this.searchName===''){
          getSelectProject(a,b).then(response => {
            this.list = response.data.list
            this.total = response.data.total
            this.listLoading = false
          }).catch(() => {
            this.list = []
            this.total = 0
            this.listLoading = false
          })
        }else{
            let c = this.searchName
            console.log(this.searchName)
            getListByName(a,b,JSON.stringify(c)).then(response => {
              this.list = response.data.list
              this.total = response.data.total
              this.listLoading = false
            }).catch(() => {
              this.list = []
              this.total = 0
              this.listLoading = false
            })
           }
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },

      handleDelete(row) {
        removeProject(row).then(response => {
          this.$message.success({
            title: '成功',
            message: '删除成功'
          })
          const index = this.list.indexOf(row)
          this.list.splice(index, 1)
        }).catch(response => {
          this.$message.error({
            title: '失败',
            message: '删除失败'
          })
        })
      },
      handlePageChange ({ currentPage }) {
        this.getList.pageNum = currentPage
        this.getList()
      },
      handleUpdate(row) {
        this.$router.push({ path: '/projectFiles/edit', query: { id: row.id }})
      },
      handleInsert(){
        this.$router.push({ path: '/projectFiles/create' })
      }

    },
    filters: {

    },
  }
</script>

<style lang="scss">
  .page-content {
    margin: 20px 16px;
    padding:6px  20px 10px;
    background-color: #fff;
    height: calc(100vh - 90px);
    margin-bottom: 40px;
    overflow: auto;
  }
 .filter-container{
   padding:6px  0px 10px;
   background-color: #fff;
 }
  .el-tooltip__popper {
    max-width:30%
  }

</style>
