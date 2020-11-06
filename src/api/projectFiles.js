import request from '@/utils/request'

// const PATH = "/PRM"

export function getSelectProject(a,b) {
  debugger
  return request({
    url: '/project/selectProject/?pageSize='+a+'&pageNum='+b,
    method: 'get',
  })
}

export function getListByName(a,b,c) {
  debugger
  return request({
    url: '/project/selectProjectByName/?pageSize='+a+'&pageNum='+b+'&name='+c,
    method: 'get',
  })
}

export function removeProject(params) {
  return request({
    url: '/project/delete/?id='+params.id,
    method: 'get',
  })
}

export function selectProject(id) {
  return request({
    url: '/project/getDetail/?id='+id,
    method: 'get',
  })
}

export function saveUpdate(params) {
  debugger
  return request({
     url: '/project/projectGetDetailUpdate',
     method: 'post',
    data: params
  })
}

export function saveInsert(params) {
  debugger
  return request({
    url: '/project/projectGetDetailInsert',
    method: 'post',
    data: params
  })
}

export function getUserList() {
  return request({
    url: '/users/getAllUser',
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




/*
export function saveUpdate(data) {
  return request({
    url: '/prop/save',
    method: 'post',
    data: data
  })
}
*/


export function saveOrUpdateProjectInfo(id) {
  return request({
    url: '/project/saveOrUpdateProjectInfo',
    method: 'post',
    data: params
  })
}


/**
 * @description 分页查询数据源
 * @param params 分页信息
 * @returns {Promise<AxiosResponse<T>>}
 * @author webYouth
 */
/*
export const getSelectProject = (params) => instance.get(`${baseURL}project/selectProject`, { params: params })

/!**
 * @description 查询所有项目
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 * @author webYouth
 *!/
export const getProjectList = (params) => instance.get(`${baseURL}project/getAll`, { params: params })

/!**
 * @description 新增或更新项目信息
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 * @author webYouth
 *!/
export const saveOrUpdateProjectInfo = (params) => instance.post(`${baseURL}project/saveOrUpdateProjectInfo`, params)

/!**
 * @description 连接测试
 * @param params
 * @returns {Promise<AxiosResponse<T>>}
 * @author webYouth
 *!/
export const checkDataSource = (params) => instance.post(`${baseURL}datasourceConfig/checkDatasource`, params)

/!**
 * @description 删除数据源
 * @param id 数据源Id
 * @returns {Promise<AxiosResponse<T>>}
 * @author webYouth
 *!/
export const removeProject = (id) => instance.get(`${baseURL}project/delete/${id}`)
*/
