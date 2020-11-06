import request from '@/utils/request'

export function saveTask(data) {
  debugger
  return request({
    url: '/task/save',
    method: 'post',
    data: data
  })
}

export function getAllTask() {
  return request({
    url: '/task/selectAllProjectTask',
    method: 'get',
  })
}
export function getAllTaskByProject(t) {
  return request({
    url: '/task/selectAllProjectTaskByProject',
    method: 'post',
    data: t
  })
}


