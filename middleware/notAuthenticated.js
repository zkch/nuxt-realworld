// 检验是否登录中间件

export default function({ store, redirect }) {
  if (store.state.user) {
    return redirect('/')
  }
}