import request from '@/utils/request'

export function login(data) {
  return request({
    contentType:'application/x-www-form-urlencoded',
    url: '/login',
    serverName: 'AUTH',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    contentType:'application/x-www-form-urlencoded',
    url: '/menu/getCurrentUserMenus',
    method: 'post',
    serverName: 'AUTH',
    params: {
      token: token,
      serverFlag: 'PRM'
    }
  })
}

export function logout() {
  return request({
    contentType:'application/x-www-form-urlencoded',
    url: '/logout',
    serverName: 'AUTH',
    method: 'post'
  })
}

export function setOrgSession (params) {
  return request({
    contentType:'application/x-www-form-urlencoded',
    url: '/common/chooseOrg',
    serverName: '/PRM',
    method: 'post',
    params: params
  })
}
