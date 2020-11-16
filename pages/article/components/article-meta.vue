<template>
  <div class="article-meta">
    <nuxt-link :to="{
      name: 'profile',
      params: {
        username: article.author.username
      }
      }">
      <img :src="article.author.image" />
    </nuxt-link>
    <div class="info">
      <nuxt-link :to="{
        name: 'profile',
        params: {
          username: article.author.username
        }
      }" class="author">
        {{article.author.username}}
      </nuxt-link>
      <span class="date">{{article.createdAt | date('MMM DD,YYYY')}}</span>
    </div>
    <button class="btn btn-sm btn-outline-secondary"
      :class="{
        active: article.author.following
      }"
      :disabled="article.followDisabled"
      @click="onFollow()"
      >
      <i class="ion-plus-round"></i>
      &nbsp; Follow {{article.author.username}} <span class="counter"></span>
    </button>
    &nbsp;&nbsp;
    <button class="btn btn-sm btn-outline-primary"
      :class="{
        active: article.favorited
      }"
      :disabled="article.favoriteDisabled"
      @click="onFavorite()"
    >
      <i class="ion-heart"></i>
      &nbsp; Favorite Post <span class="counter">({{article.favoritesCount}})</span>
    </button>
  </div>
</template>

<script>
import { addFavorite, deleteFavorite } from '@/api/article'
import { getProfile, unFollowUser, followUser } from '@/api/profiles'
export default {
  name: 'article-meta',
  props: ['article'],
  async mounted() {
    const { data } = await getProfile(this.article.author.username)
    console.log(data)
  },
  methods: {
    async onFavorite() {
      const { article } = this
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
    },
    async onFollow() {
      const { article } = this
      article.followDisabled = true
      if (article.author.following) {
        await unFollowUser(article.author.username)
        article.author.following = false
      } else {
        await followUser(article.author.username)
        article.author.following = true
      }
      article.followDisabled = false
    } 
  }
};
</script>

<style>
</style>