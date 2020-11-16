<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form @submit.prevent="update">
            <fieldset>
              <fieldset class="form-group">
                <input
                  v-model="userForm.image"
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="userForm.username"
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="userForm.bio"
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="userForm.email"
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="userForm.password"
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                />
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right">
                Update Settings
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUser, updateUser } from '@/api/user'
import { mapState } from 'vuex'
export default {
  name: 'setting',
  async asyncData(){
    const {data: userForm} = await getUser()
    console.log(userForm)
    return {
      userForm: {
        bio: userForm.user.bio,
        email: userForm.user.email,
        image: userForm.user.image,
        username: userForm.user.username,
        password: ''
      }
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async update() {
      const data = {
        user: {}
      }
      for(const key in this.userForm) {
        if (this.userForm[key]) {
          data.user[key] = this.userForm[key]
        }
      }
      await updateUser(data)
      this.$router.push(`/profile/${this.user.username}`)
    }
  }
};
</script>

<style>
</style>