<template>
  <div id="top-nav">
    <div class="multilevel-offcanvas off-canvas position-left" id="offCanvasLeft" data-off-canvas>
      <ul class="vertical menu">
        <li><router-link to="/about">{{$t('About')}}</router-link></li>
        <li><router-link to="/portfolio">Portfolio</router-link></li>
        <li><router-link to="/magazine">Magazine</router-link></li>
        <li><router-link to="/consulenze">{{$t('Consultancies')}}</router-link></li>
        <li><router-link to="/visibility-ngo">{{$t('Visibility NGO')}}</router-link></li>
        <li><router-link to="/category/blog">Blog</router-link></li>
        <li><router-link to="/contacts">{{$t('Contacts')}}</router-link></li>
      </ul>
      <ul class="vertical menu" data-accordion-menu>
        <li><a href="#">{{$t('Language')}}</a>
          <ul class="menu vertical nested">
            <li><a @click="changeLanguage('en')">English</a></li>
            <li><a @click="changeLanguage('it')">Italiano</a></li>
            <li><a @click="changeLanguage('fr')">Français</a></li>
          </ul>
        </li>
      </ul>
      <ul class="menu simple social-links">
        <li><a href="#" target="_blank"><i class="fa fa-twitter-square" aria-hidden="true"></i></a></li>
        <li><a href="#" target="_blank"><i class="fa fa-facebook-square" aria-hidden="true"></i></a></li>
        <li><a href="#" target="_blank"><i class="fa fa-github-square" aria-hidden="true"></i></a></li>
        <li><a href="#" target="_blank"><i class="fa fa-google-plus-square" aria-hidden="true"></i></a></li>
      </ul>
    </div>

    <div class="off-canvas-content" data-off-canvas-content>
      <div class="nav-bar">
        <div class="nav-bar-left">
          <ul class="menu">
            <li>
              <button class="offcanvas-trigger hide-for-medium" type="button">
                <span class="offcanvas-trigger-text"></span>
                <div class="hamburger" @click="closeOffCanvas">
                  <span class="line"></span>
                  <span class="line"></span>
                  <span class="line"></span>
                </div>
              </button>
            </li>
          </ul>
        </div>
        <div class="nav-bar-center text-center">
          <router-link to="/"><img id="header-logo" src="/static/img/NawartLogo_Header.png" alt="" /></router-link>

        <hr>
        <div class="top-bar show-for-medium" id="responsive-menu">
          <div class="top-bar-center">
            <ul class="dropdown menu" data-dropdown-menu>
              <li><router-link to="/about" :class="{'active': subIsActive('/about/')}">{{$t('About')}}</router-link></li>
              <li><router-link to="/portfolio" :class="{'active': subIsActive('/portfolio')}">Portfolio</router-link></li>
              <li><router-link to="/magazine" :class="{'active': subIsActive('/magazine')}">Magazine</router-link></li>
              <li><router-link to="/consulenze" :class="{'active': subIsActive('/consulenze')}">{{$t('Consultancies')}}</router-link></li>
              <li><router-link to="/visibility-ngo" :class="{'active': subIsActive('/visibility-ngo')}">{{$t('Visibility NGO')}}</router-link></li>
              <li><router-link to="/category/blog" :class="{'active': subIsActive('/category/blog/')}">Blog</router-link></li>
              <li><router-link to="/contacts" :class="{'active': subIsActive('/contacts/')}">{{$t('Contacts')}}</router-link></li>
              <li class="has-submenu">
                <a href="#0">{{$t('Language')}}</a>
                <ul class="submenu menu vertical" data-submenu>
                  <li><a @click="changeLanguage('en')">English</a></li>
                  <li><a @click="changeLanguage('it')">Italiano</a></li>
                  <li><a @click="changeLanguage('fr')">Français</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <hr>

        </div>
        <div class="nav-bar-right">
          <ul class="menu">
            <li>
              <button class="offcanvas-trigger">
                <svg version="1.1" id="search_icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve">
                  <path d="M19.769,18.408l-5.408-5.357c1.109-1.364,1.777-3.095,1.777-4.979c0-4.388-3.604-7.958-8.033-7.958
                    c-4.429,0-8.032,3.57-8.032,7.958s3.604,7.958,8.032,7.958c1.805,0,3.468-0.601,4.811-1.6l5.435,5.384
                    c0.196,0.194,0.453,0.29,0.71,0.29c0.256,0,0.513-0.096,0.709-0.29C20.16,19.426,20.16,18.796,19.769,18.408z M2.079,8.072
                    c0-3.292,2.703-5.97,6.025-5.97s6.026,2.678,6.026,5.97c0,3.292-2.704,5.969-6.026,5.969S2.079,11.364,2.079,8.072z"></path>
                </svg>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'topnav',

  computed: mapGetters({
  }),

  data () {
    return {
      email: null,
      password: null,
      loading: false
    }
  },

  methods: {
    ...mapActions([
      'registerNewUser'
    ]),
    closeOffCanvas () {
      window.$('#offCanvasLeft').foundation('toggle')
    },
    subIsActive (input) {
      const paths = Array.isArray(input) ? input : [input]
      return paths.some(path => {
        return this.$route.path.indexOf(path) === 0 // current path starts with this path string
      })
    },
    changeLanguage (languageCode) {
      this.$i18n.set(languageCode)
      this.$store.dispatch('initializeArticlesFromLocalDB', languageCode)
      this.$store.dispatch('initializeCategoriesFromLocalDB', languageCode)
    }
  },

  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.top-bar, .top-bar ul, .top-bar ul a {
  background-color: #fff;
  color: #000;
  text-transform: uppercase;
  font-weight: bold;
}

.top-bar ul a.active {
  background-color: #000;
  color: #fff;
}

hr {
  margin: 0 !important;
  width: 100vw;
  position: absolute;
  left: 0;
}

#top-nav button {
  position: relative;
  top: -50px;
}

#top-nav {
  position: fixed;
  top: 0;
  width: 100vw;
  background-color: #fff;
  z-index: 100;
}

.nav-bar {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-justify-content: space-between;
      -ms-flex-pack: justify;
          justify-content: space-between;
  -webkit-align-items: center;
      -ms-flex-align: center;
          align-items: center;
}

.nav-bar .nav-bar-logo {
  padding: 1.8rem;
}

.nav-bar a {
  color: #fefefe;
  transition: color 0.2s ease-in;
}

.nav-bar a:hover {
  color: #a8b8c3;
}

.nav-bar .offcanvas-trigger {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: center;
      -ms-flex-align: center;
          align-items: center;
  -webkit-justify-content: center;
      -ms-flex-pack: center;
          justify-content: center;
  padding: 1.6rem;
  color: #fefefe;
  text-transform: uppercase;
  background-color: #fff;
  transition: background-color 0.2s ease-in;
  cursor: pointer;
}

.nav-bar .offcanvas-trigger .offcanvas-trigger-text {
  margin-right: 0.25rem;
  margin-top: 0.25rem;
}

@media screen and (max-width: 39.9375em) {
  .nav-bar .offcanvas-trigger {
    padding: 0.9rem;
  }
}

.multilevel-offcanvas {
  background: #222b31;
  padding: 20px;
  color: #fefefe;
}

.multilevel-offcanvas > .menu {
  margin-bottom: 1rem;
}

.multilevel-offcanvas .menu a {
  color: rgba(254, 254, 254, 0.6);
  padding-top: 7px;
  padding-bottom: 7px;
  transition: color 0.2s ease-in;
}

.multilevel-offcanvas .menu a:hover {
  color: #fefefe;
}

.multilevel-offcanvas .fa {
  color: #fefefe;
}

.multilevel-offcanvas .is-accordion-submenu-parent > a::after {
  border-color: rgba(254, 254, 254, 0.6) transparent transparent;
}

.multilevel-offcanvas .social-links {
  margin-left: 20px;
}

.multilevel-offcanvas .social-links li {
  margin-right: 5px;
}

.multilevel-offcanvas .social-links a:hover .fa {
  color: #bebebe;
  transition: color .2s ease-in;
}

.multilevel-offcanvas .social-links .fa {
  font-size: 2.2rem;
}

.body-info {
  text-align: center;
  color: #2c3840;
}

.body-info .button {
  margin: 1rem 0;
  padding: 0.85em 2em;
}

.is-open + .off-canvas-content .hamburger .line:nth-child(1) {
  -webkit-transform: translate(0px, 5px) rotate(-45deg);
      -ms-transform: translate(0px, 5px) rotate(-45deg);
          transform: translate(0px, 5px) rotate(-45deg);
}

.is-open + .off-canvas-content .hamburger .line:nth-child(2) {
  -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
          transform: rotate(45deg);
}

.is-open + .off-canvas-content .hamburger .line:nth-child(3) {
  -webkit-transform: translate(-200px);
      -ms-transform: translate(-200px);
          transform: translate(-200px);
}

.hamburger .line {
  width: 21px;
  height: 3px;
  background-color: #ef2673;
  display: block;
  margin: 3px auto;
  transition: all 0.8s ease-in-out;
}

.hamburger .line:last-child {
  margin-bottom: 0;
}

#header-logo {
  padding: 10px;
  max-height: 150px;
}

</style>
