import request from '@/utils/request'

export function getUserLogList(data) {
  return request({
    url: '/logs/getAllCalender',
    method: 'get',
    data
  })
}

export function insertLog(params) {
  debugger
  return request({
    url: '/logs/insertLogCalender',
    method: 'post',
    data: params,
    dataType: "json"
  })
}

export function updateLog(params) {
  debugger
  return request({
    url: '/logs/updateLogCalender',
    method: 'post',
    data: params,
    dataType: "json"
  })
}

export function deleteLog(id) {
  debugger
  return request({
    url: `/logs/deleteCalender/${id}`,
    method: 'get',
  })
}

/**
 * @description 查询所有用户日志信息
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 * @author webYouth
 */
/*
export const getUserLogList = (params) => instance.get(`${baseURL}logs/getAll`, { params: params })

export const insertLog = (params) => instance.post(`${baseURL}logs/insertLog`, { params: params })

export const updateLog = (params) => instance.post(`${baseURL}logs/updateLog`, { params: params })

export const deleteLog = (id) => instance.get(`${baseURL}logs/deleteLog/${id}`)
*/


