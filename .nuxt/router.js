import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _7018ff85 = () => interopDefault(import('..\\pages\\layout' /* webpackChunkName: "" */))
const _134a53fa = () => interopDefault(import('..\\pages\\home' /* webpackChunkName: "" */))
const _563873ae = () => interopDefault(import('..\\pages\\login' /* webpackChunkName: "" */))
const _f9dddea4 = () => interopDefault(import('..\\pages\\profile' /* webpackChunkName: "" */))
const _705115be = () => interopDefault(import('..\\pages\\settings' /* webpackChunkName: "" */))
const _644a25c8 = () => interopDefault(import('..\\pages\\editor' /* webpackChunkName: "" */))
const _69db53fb = () => interopDefault(import('..\\pages\\article' /* webpackChunkName: "" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _7018ff85,
    children: [{
      path: "",
      component: _134a53fa,
      name: "home"
    }, {
      path: "/login",
      component: _563873ae,
      name: "login"
    }, {
      path: "/register",
      component: _563873ae,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _f9dddea4,
      name: "profile"
    }, {
      path: "/settings",
      component: _705115be,
      name: "settings"
    }, {
      path: "/editor",
      component: _644a25c8,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _69db53fb,
      name: "article"
    }]
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
