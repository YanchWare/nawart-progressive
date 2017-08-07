<template>
  <div class="post">
    <div v-if="loading">
        <Loading></Loading>
    </div>
    <div v-if="post" class="content">
      <h1>{{post.title}}</h1>
      <div v-if="post.imageURL" class="row center-align image-article">
        <img :src="post.imageURL" alt="Article image"/>
      </div>
      <p v-html="post.content" ></p>
      <div v-if="post.authorId" class="author">
        <hr/>
        <div class="row">
          <div class="s12 col center">
            <router-link :to="{ name: 'user', params: { userId: post.authorId }}">
              <img :src="post.authorAvatarURL" alt="Author"/>
            </router-link>
          </div>
        </div>
        <div class="row">
          <div class="s6 col">
            <h5>Author</h5>
            <router-link :to="{ name: 'user', params: { userId: post.authorId }}">
              {{post.authorPublicName}}
            </router-link>
          </div>
          <div class="s6 col right-align">
            <h5>Share this article</h5>
            <a href="#" @click="shareWithFacebook"><i class="fa fa-facebook"></i></a>
            <a href="#" @click="shareWithTwitter"><i class="fa fa-twitter" aria-hidden="true"></i></a>
            <a href="#" @click="shareWithGooglePlus"><i class="fa fa-google-plus" aria-hidden="true"></i></a>
            <a href="#" @click="shareWithLinkedin"><i class="fa fa-linkedin" aria-hidden="true"></i></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '../components/Loading'
import { FACEBOOK_APP_ID } from '../utilities/constants'
import Showdown from 'showdown'

export default {
  name: 'article',

  components: {
    Loading,
    Error
  },

  data () {
    return {
      loading: false,
      post: null,
      error: null,
      issuesLink: 'https://github.com/YanchWare/yanchware-cms-web/issues'
    }
  },

  head: {
    title: function () {
      return {
        inner: this.post ? this.post.title : ''
      }
    },
    meta: function () {
      return [
        { property: 'og:title', content: this.post ? this.post.title : '' },
        { property: 'og:type', content: 'article' },
        { property: 'og:image', content: this.post ? this.post.imageURL : '' },
        { property: 'og:url', content: 'https://' + window.location.host + window.location.pathname }
      ]
    }
  },

  created () {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData()
  },

  watch: {
    // call again the method if the route changes
    '$route': 'fetchData'
  },

  methods: {
    fetchData () {
      this.error = this.post = null
      this.loading = true
      // replace getPost with your data fetching util / API wrapper
      let contentsSlug = null
      switch (this.$route.name) {
        // Handle pages
        case 'about':
        case 'howto':
        case 'security':
        case 'notFound':
          contentsSlug = this.$route.name
          break

        // Handle blog articles:
        case 'blogArticle':
          contentsSlug = this.$route.params.articleSlug
          break

        default:
          throw new Error('Article view: Path not recognized')
      }
      if (!contentsSlug) {
        throw new Error('Article view: Content slug failed to be correctly set')
      }

      // TODO: Call API to retrieve content
      console.log('Call api to retrieve content: ' + this.$route.name + Showdown)
    },

    shareWithTwitter () {
      window.open('https://twitter.com/share?url=https://' + window.location.host + window.location.pathname + '&via=yanchware&text=' + this.post.title)
    },

    shareWithFacebook () {
      window.open('https://www.facebook.com/dialog/feed?app_id=' + FACEBOOK_APP_ID + '&display=popup&caption=' + this.post.title + '&link=https://www.yanchware.com' + window.location.host + window.location.pathname + '&redirect_uri=https://www.yanchware.com')
    },

    shareWithLinkedin () {
      window.open('https://www.linkedin.com/shareArticle?mini=true&url=https://' + window.location.host + window.location.pathname + '&title=' + this.post.title + '&summary=' + this.post.title + '&source=YanchWare')
    },

    shareWithGooglePlus () {
      window.open('https://plus.google.com/share?url=https://' + window.location.host + window.location.pathname, 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600')
    }

  }
}

</script>

<style scope>
.post{
  padding: 0 10%;
}

.author img{
  border-radius: 50%;
  display: initial;
  width: 100px;
  padding: 5px;
  background-color: #fff;
  border: #bbb solid 2px;
}

.author hr{
  border: #bbb solid 1px;
  background-color: #bbb;
  position: relative;
  z-index: -1;
  top: 55px;
}

.author i{
  padding: 5px;
}

.image-article{
  display: initial;
}

</style>