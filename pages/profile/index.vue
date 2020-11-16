<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="image" class="user-img" />
            <h4>{{authorName}}</h4>
            <p>
              {{bio}}
            </p>
            <nuxt-link to="/settings" v-if="user.username === authorName" class="btn btn-sm btn-outline-secondary action-btn">
              <i class="ion-gear-a"></i>
              &nbsp;Edit Profile Setting
            </nuxt-link>
            <button
              :class="{
                active: following
              }"
             v-else :disabled="followDisabled" type="button" @click="onFollow()" class="btn btn-sm btn-outline-secondary action-btn">
              <i class="ion-plus-round"></i>
              &nbsp; Follow {{authorName}}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link class="nav-link"
                :class="{
                  active: type === 'my'
                }"
                 exact :to="{
                  name: 'profile',
                  query: {
                    type: 'my'
                  }
                }">My Articles</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link class="nav-link"
                  :class="{
                  active: type === 'other'
                }"
                 exact :to="{
                  name: 'profile',
                  query: {
                    type: 'other'
                  }
                }">Favorited Articles</nuxt-link>
              </li>
            </ul>
          </div>

          <div 
            class="article-preview"
            v-for="article in articles"
            :key="article.slug"
          >
            <div class="article-meta">
              <nuxt-link :to="{
                name: 'profile',
                params: {
                  username: article.author.username
                }
              }"
                ><img :src="article.author.image"
              /></nuxt-link>
              <div class="info">
                <nuxt-link :to="{
                    name: 'profile',
                    params: {
                      username: article.author.username
                    }
                  }" 
                  class="author"
                >
                  {{article.author.username}}
                </nuxt-link>
                <span class="date">{{article.createdAt | date('MMM DD, YYYY')}}</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{
                  active: article.favorited
                }"
                @click="onFavorite(article)"
                :disabled="article.favoriteDisabled"
              >
                <i class="ion-heart"></i> {{article.favoritesCount}}
              </button>
            </div>
            <nuxt-link :to="{
              name: 'article',
              params: {
                slug: article.slug
              }
            }" class="preview-link">
              <h1>{{article.title}}</h1>
              <p>{{article.description}}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>
          <!-- 分页-->
          <nav>
            <ul class="pagination">

              <li class="page-item"
                :class="{
                  active: item === page
                }"
                v-for="item in totalPage"
                :key="item"
              >

                <nuxt-link class="page-link" :to="{
                  name: 'home',
                  query: {
                    page: item,
                    type: type
                  }
                }">{{item}}</nuxt-link>

              </li>

            </ul>
          </nav>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getProfile, unFollowUser, followUser } from '@/api/profiles'
import { getArticles, addFavorite, deleteFavorite } from '@/api/article'
import { mapState } from 'vuex'
export default {
  middleware: 'authenticated',
  name: 'profileIndex',
  watchQuery: ['type', 'page'], // 监听url参数变化，触发事件
  async asyncData({ query, params }) {
    // const {username} = query
    console.log(params)
    const limit = 20
    const page = Number.parseInt(query.page || 1)
    const type = query.type || 'my'
    const articleParams = {
      limit,
      offset: (page - 1) * limit
    }
    type === 'my' ? articleParams.author = params.username : articleParams.favorited = params.username
    const [profileRes, articleRes] = await Promise.all([
      getProfile(params.username),
      getArticles(articleParams)
    ])
    console.log('pro', profileRes)
    console.log('arti', articleRes)
    const { articles, articlesCount } = articleRes.data
    articles.forEach(article => {
      article.favoriteDisabled = false
    })
    return {
      followDisabled: false,
      articles,
      articlesCount,
      limit,
      page,
      type,
      authorName: profileRes.data.profile.username,
      bio: profileRes.data.profile.bio,
      image: profileRes.data.profile.image,
      following: profileRes.data.profile.following
    }
  },
  computed:{
    ...mapState(['user']),
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit)
    }
  },
  methods: {
     async onFollow() {
      const { article } = this
      this.followDisabled = true
      if (this.following) {
        await unFollowUser(this.authorName)
        this.following = false
      } else {
        await followUser(this.authorName)
        this.following = true
      }
      this.followDisabled = false
    },
    async onFavorite(article) {
      article.favoriteDisabled = true
      if (article.favorited) {
        await deleteFavorite(article.slug)
        article.favorited = false
        article.favoritesCount += -1
      } else {
        await addFavorite(article.slug)
        article.favorited = true
        article.favoritesCount += 1
      }
      article.favoriteDisabled = false
    }
  }
};
</script>

<style>
</style>