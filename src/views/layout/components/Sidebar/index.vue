<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <div class="logo-wrap">
      <img src="../../../../assets/LOGO.png" class="logo" alt="">
    </div>
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      mode="vertical"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path"/>
    </el-menu>
  </el-scrollbar>
</template>

<script>
  import { mapGetters } from 'vuex'
  import SidebarItem from './SidebarItem'

  export default {
    components: { SidebarItem },
    computed: {
      ...mapGetters([
        'sidebar',
        'roles'
      ]),
      // routes() {
      //   return this.$router.options.routes
      // },
      routes() {
        let myroutes = this.$router.options.routes

        function contain(myroles, auth) {
          for (let i in myroles) {
            if (myroles[i].flag == auth) {
              return true
            }
          }
          return false
        }

        //返回值为true表示为有权限，false为无权限
        function setRouts(parent, routes, myroles) {
          let result = false
          for (let index in routes) {
            let auth = routes[index].auth
            if (!auth) {
              routes[index].hidden = true
            } else {
              if (contain(myroles, auth)) {
                //拥有该菜单routes[index]权限
                if (parent != null) {
                  parent.hidden = false
                }
                routes[index].hidden = false
                if (routes[index].children != null) {
                  setRouts(routes[index], routes[index].children, myroles)
                }
                result = true
              } else {
                //无该菜单routes[index]权限
                if (routes[index].children != null) {
                  //查找菜单routes[index]的子菜单权限，
                  if (setRouts(routes[index], routes[index].children, myroles)) {
                    //子菜单拥有权限
                    routes[index].hidden = false
                    result = true
                  } else {
                    //子菜单无权限
                    routes[index].hidden = true
                  }

                } else {
                  routes[index].hidden = true
                }

              }
            }
          }

          return result
        }

        // setRouts(null, myroutes, this.roles.concat({flag: 'yes'}))
        console.log(myroutes)
        return myroutes
      },
      isCollapse() {
        return !this.sidebar.opened
      }
    }
  }
</script>

<style lang="scss" scoped>
  .logo-wrap{
    height: 49px;
    line-height: 49px;
    box-sizing: border-box;
    background-color: #374769;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all .3s;
    .logo{
      height: 28px;
    }
  }

  .app-wrapper.hideSidebar{
    .logo{
      /*display: none;*/
    }
    .logo-wrap{
      justify-content: flex-start;
      padding-left: 7px;
    }
    .roles{
      opacity: 0;
    }
  }

</style>
