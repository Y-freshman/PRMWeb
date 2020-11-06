import request from '@/utils/request'

export function getSelectProjectWithTask(a,b) {
  return request({
    url: '/task/selectTaskWithProject/?pageSize='+a+'&pageNum='+b,
    method: 'get',
  })
}
export function getListByName(a,b,c) {
  return request({
    url: '/task/selectTaskWithProjectByName/?pageSize='+a+'&pageNum='+b+'&name='+c,
  })
}

export function deleteTask(params) {
  return request({
    url: '/task/delete/?id='+params.id,
    method: 'get',
  })
}

export function selectTask(id) {
  return request({
    url: '/task/getTaskDetailById/?id='+id,
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

export function saveTasksUpdate(params) {
  debugger
  return request({
    url: '/task/taskGetDetailUpdate',
    method: 'post',
    data: params
  })
}

export function saveTasksInsert(params) {
  debugger
  return request({
    url: '/task/taskGetDetailInsert',
    method: 'post',
    data: params
  })
}

export function getProjectListByExample(params) {
  return request({
    url: '/project/getProjectByExample',
    method: 'post',
    data: params
  })
}

export function getAllProject() {
  return request({
    url: '/project/getAllProject',
    method: 'get',
  })
}

export function getAllTask() {
  return request({
    url: '/task/selectAlltask',
    method: 'get',
  })
}

export function getUserList() {
  return request({
    url: '/users/getAllUser',
    method: 'get',
  })
}
