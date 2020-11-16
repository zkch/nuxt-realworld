const cookieparser = process.server ? require('cookieparser') : undefined

// 服务端渲染期间运行的都是同一个实例
// 为了防止数据冲突，要把state定义成一个函数，返回数据对象
export const state = () => {
  return {
    user: null
  }
}

export const mutations = {
  setUser(state, data) {
    state.user = data
  }
}

export const actions = {
  // 一个特殊的action方法i
  // 初始化容器以及需要传递给客户端的数据
  // 这个特殊容器的action只会在服务端渲染期间自动调用
  nuxtServerInit ({ commit }, { req }) {
    let user = null
    // 如果请求头有Cookie
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try{
        user = JSON.parse(parsed.user)
      } catch (err) {
        // No valid cookie found
      }
    }

    commit('setUser', user)
  }
}