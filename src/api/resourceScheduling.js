import request from '@/utils/request'

export function saveProp(data) {
  return request({
    url: '/prop/save',
    method: 'post',
    data: data
  })
}

export function getAllProjectPlan() {
  return request({
    url: '/prop/getAllProjectPlan',
    method: 'get',
  })
}
export function getAllProjectPlanByTime(t) {
  return request({
    url: '/prop/getAllProjectPlanByTime',
    method: 'post',
    data: t
  })
}


export function getAllUserKey() {
  return request({
    url: '/users/getAllUserKey',
    method: 'get',
  })
}
