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

export function deleteLog(params) {
  return request({
    url: '/logs/delete/?id='+params.id,
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
  debugger
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


