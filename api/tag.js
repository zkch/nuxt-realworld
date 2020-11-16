// import request from '@/utils/request'
import { request } from '@/plugins/request'


// 获取公共文章列表
export const getTags = params => {
  return request({
    method: 'GET',
    url: '/api/tags',
    params
  })
}
