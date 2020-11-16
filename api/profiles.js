import { request } from '@/plugins/request'

// 获取用户信息
export const getProfile = name => {
  return request({
    method: 'GET',
    url: `/api/profiles/${name}`
  })
}

// 关注用户
export const followUser = name => {
  return request({
    method: 'post',
    url: `/api/profiles/${name}/follow`
  })
}

// 取消关注用户
export const unFollowUser = name => {
  return request({
    method: 'delete',
    url: `/api/profiles/${name}/follow`
  })
}