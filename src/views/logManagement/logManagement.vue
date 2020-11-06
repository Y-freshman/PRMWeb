<template>
  <div class="page-content">
    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input  v-model="searchName"  clearable class="filter-item" style="width: 200px;" placeholder="请输入用户姓名查找"/>
      <el-button  class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
      <el-button  class="filter-item" type="primary" icon="el-icon-edit" @click="handleInsert">添加</el-button>
    </div>
    <el-table v-loading="listLoading" :data="list"   element-loading-text="正在查询中。。。" border fit highlight-current-row>
      <el-table-column align="center" label="用户姓名"  prop="username"  sortable/>
      <el-table-column align="center" label="填写时间" prop="logsDate" />
      <el-table-column align="center" label="日志内容" show-overflow-tooltip  prop="logsContent" >
<!--        <template slot-scope="scope">-->
<!--          <span>{{scope.row.logsContent}}</span>-->
<!--        </template>-->
      </el-table-column>
      <el-table-column align="center" label="上班时长" prop="durTime" />
      <el-table-column align="center" label="额外时长" prop="extTime" />
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
  import { getSelectLog,deleteLog,getListByName} from '../../api/logManagement'
  import Pagination from '@/components/Pagination'
  export default {
    name: 'logManagement',
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
        searchName: '',
      }
    },
    created () {
      this.getList()
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
          getSelectLog(a,b).then(response => {
            console.log(response)
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
        deleteLog(row.id).then(response => {
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
    //    this.getProjectList()
      },
      handleUpdate(row) {
        this.$router.push({ path: '/logManagement/edit', query: { id: row.id }})
      },
      handleInsert(){
        this.$router.push({ path: '/logManagement/create' })
      }

    },
    filters: {

    },
  }
</script>

<style lang="scss" >
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
