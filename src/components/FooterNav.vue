<template>
  <footer class="page-footer">
    <a href="#" class="social-icon-button twitter"><i class="fa fa-twitter" aria-hidden="true"></i><span></span></a>
    <a href="#" class="social-icon-button facebook"><i class="fa fa-facebook" aria-hidden="true"></i><span></span></a>
    <a href="#" class="social-icon-button gplus"><i class="fa fa-google-plus" aria-hidden="true"></i></i><span></span></a>
  </footer>
</template>

<script>
export default {
  name: 'footerNav',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
footer{
    background: rgb(36,70,85);
    background: rgba(36,70,85);
    text-align: center;
}


.social-icon-button {
  border-radius: 3.6rem;
  width: 3.6rem;
  height: 3.6rem;
  position: relative;
  display: inline-block;
  text-align: center;
  font-size: 2rem;
  background: none;
}

.social-icon-button + .social-icon-button {
  margin-left: 0.25rem;
}

.social-icon-button .fa {
  background: none;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
  z-index: 1;
  line-height: 3.6rem;
  transition: all 0.3s ease-in-out;
}

.social-icon-button span {
  display: block;
  border-radius: 0;
  width: 0;
  height: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
  transition: all 0.3s ease-in-out;
}

.social-icon-button:hover .fa {
  color: #fefefe;
}

.social-icon-button:hover span {
  display: block;
  border-radius: 3.6rem;
  width: 3.6rem;
  height: 3.6rem;
}

.social-icon-button.gplus {
  color: #dd4b39;
}

.social-icon-button.gplus span {
  background-color: #dd4b39;
}

.social-icon-button.twitter {
  color: #55acee;
}

.social-icon-button.twitter span {
  background-color: #55acee;
}

.social-icon-button.facebook {
  color: #3b5998;
}

.social-icon-button.facebook span {
  background-color: #3b5998;
}

</style>
