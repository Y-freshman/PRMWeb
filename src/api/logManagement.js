import request from '@/utils/request'

export function getSelectLog(a,b) {
  return request({
    url: '/logs/getAllLogsByPage/?pageSize='+a+'&pageNum='+b,
    method: 'get',
  })
}

export function getListByName(a,b,c) {
  return request({
    url: '/logs/getAllLogsByName/?pageSize='+a+'&pageNum='+b+'&name='+c,
    method: 'get',
  })
}


export function deleteLog(id) {
  debugger
  return request({
    url: `/logs/delete/${id}`,
    method: 'get',
  })
}

export function selectlogsDetail(id) {
  return request({
    url: '/logs/getDetail/?id='+id,
    method: 'get',
  })
}

export function savelogsInsert(params) {
  return request({
    url: '/logs/logsGetDetailInsert',
    method: 'post',
    data: params
  })
}

export function savelogsUpdate(params) {
  debugger
  return request({
    url: '/logs/logsGetDetailUpdate',
    method: 'post',
    data: params
  })
}

export function getTasksList() {
  return request({
    url: '/project/getAlltasks',
    method: 'get',
  })
}

export function getUserListByExample(params) {
  return request({
    url: '/users/getUserByExample',
    method: 'post',
    data: params
  })
}

export function getplanValue(param) {
  return request({
    url: '/task/autoPlan',
    method: 'post',
    data: param
  })
}

export function getUserList() {
  return request({
    url: '/users/getAllUser',
    method: 'get',
  })
}

export function getlogTask(param) {
  return request({
    url: '/logs/logsGetDetailAutoInsert',
    method: 'post',
    data: param
  })
}

