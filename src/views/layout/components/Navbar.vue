<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
    <breadcrumb/>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <span class="user-name">{{name}}</span>
        <!--        <img src="@/assets/avatar.png" class="user-avatar">-->
        <i class="el-icon-caret-bottom"/>
      </div>
      <el-dropdown-menu slot="dropdown" class="user-dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            首页
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span style="display:block;" @click="logout">注销</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
    import moment from 'moment'
    import {mapGetters} from 'vuex'
    import Breadcrumb from '@/components/Breadcrumb'
    import Hamburger from '@/components/Hamburger'

    export default {
        data() {
            return {
                myPlanYearMonth: ''
            }
        },
        components: {
            Breadcrumb,
            Hamburger
        },
        computed: {
            ...mapGetters([
                'sidebar',
                'avatar',
                'name'
            ])
        },
        watch: {

        },
        created() {

        },
        methods: {
            toggleSideBar() {
                this.$store.dispatch('ToggleSideBar')
            },
            logout() {
                this.$store.dispatch('LogOut').then(() => {
                    location.reload() // 为了重新实例化vue-router对象 避免bug
                })
            },
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .navbar {
    height: 50px;
    line-height: 50px;
    border-radius: 0px !important;
    background-color: #3F526B;

    .el-menu-item:hover {
      background-color: #3F526B !important;
    }

    .hamburger-container {
      line-height: 52px;
      height: 50px;
      float: left;
      padding: 0 14px;
    }

    .screenfull {
      position: absolute;
      right: 90px;
      top: 16px;
      color: red;
    }


    .avatar-container {
      height: 50px;
      display: inline-block;
      position: absolute;
      right: 35px;

      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        line-height: initial;

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 11px;
          font-size: 17px;
          color: #fff;
        }

        .user-name {
          display: inline-block;
          height: 40px;
          line-height: 40px;
          color: #fff;
        }
      }
    }
  }
</style>

