<template>
  <div>
    <!-- 导航 -->
    <nav class="navbar navbar-light">
      <div class="container">
        <!-- <a class="navbar-brand" href="index.html">conduit</a> -->
        <nuxt-link class="navbar-brand" to="/">conduit</nuxt-link>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <!-- Add "active" class when you're on that page" -->
            <!-- <a class="nav-link active" href="">Home</a> -->
            <!-- exact 精准匹配路由，否则子路由激活，父路由也是激活状态 -->
            <nuxt-link class="nav-link" to="/" exact>Home</nuxt-link>
          </li>
          <template v-if="user">
            <li class="nav-item">
              <!-- <a class="nav-link" href="">
                <i class="ion-compose"></i>&nbsp;New Post
              </a> -->
              <nuxt-link class="nav-link" to="/editor">
                <i class="ion-compose"></i>&nbsp;New Post
              </nuxt-link>
            </li>
            <li class="nav-item">
              <!-- <a class="nav-link" href="">
                <i class="ion-gear-a"></i>&nbsp;Settings
              </a> -->
              <nuxt-link class="nav-link" to="/settings">
                <i class="ion-gear-a"></i>&nbsp;Settings
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link
                class="nav-link"
                :to="{
                  name: 'profile',
                  params: {
                    username: user.username
                  }
                }"
              >
                <img
                  class="user-pic"
                  :src="user.image"/>
                {{user.username}}
              </nuxt-link>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <!-- <a class="nav-link" href="">Sign up</a> -->
              <nuxt-link class="nav-link" to="/login">sign in</nuxt-link>
            </li>
            <li class="nav-item">
              <!-- <a class="nav-link" href="">Sign up</a> -->
              <nuxt-link class="nav-link" to="/register">sign up</nuxt-link>
            </li>
          </template>
          
        </ul>
      </div>
    </nav>

    <nuxt-child />

    <!-- 底部 -->
    <footer>
      <div class="container">
        <a href="/" class="logo-font">conduit</a>
        <span class="attribution">
          An interactive learning project from
          <a href="https://thinkster.io">Thinkster</a>. Code &amp; design
          licensed under MIT.
        </span>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'layoutIndex',
  computed: {
    ...mapState(['user'])
  }
};
</script>

<style>
</style>