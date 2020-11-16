<template>
  <div>
    <form class="card comment-form">
      <div class="card-block">
        <textarea
          v-model="comment"
          class="form-control"
          placeholder="Write a comment..."
          rows="3"
        ></textarea>
      </div>
      <div class="card-footer">
        <img :src="user.image" class="comment-author-img" />
        <button :disabled="isRequesting" @click="addComment" type="button" class="btn btn-sm btn-primary">Post Comment</button>
      </div>
    </form>

    <div class="card" v-for="comment in comments" :key="comment.id">
      <div class="card-block">
        <p class="card-text">
          {{comment.body}}
        </p>
      </div>
      <div class="card-footer">
        <nuxt-link :to="{
          name: 'profile',
          params: {
            username: comment.author.name
          }
        }" class="comment-author">
          <img
            :src="comment.author.image"
            class="comment-author-img"
          />
        </nuxt-link>
        &nbsp;
        <nuxt-link :to="{
          name: 'profile',
          params: {
            username: comment.author.name
          }
        }" class="comment-author">{{comment.author.username}}</nuxt-link>
        <span class="date-posted">{{comment.createdAt | date('MMM DD, YYYY')}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticleComments, addComment } from '@/api/article'
import { mapState } from 'vuex'

export default {
  name: 'articleComments',
   computed: {
    ...mapState(['user'])
  },
  props: ['article'],
  data() {
    return {
      comments: [],
      comment: '',
      isRequesting: false
    }
  },
  async mounted() {
    const { data } = await getArticleComments(this.article.slug)
    this.comments = data.comments
  },
  methods: {
    async addComment() {
      const data = {
        comment: {
          body: this.comment
        }
      }
      this.isRequesting = true
      console.log(data, this.article.slug)
      const {data:res} = await addComment(data, this.article.slug)
      this.comments.push(res)
      this.isRequesting = false
    }
  }
};
</script>

<style>
</style>