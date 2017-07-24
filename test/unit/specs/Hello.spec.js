import Vue from 'vue'
import TopNav from 'src/components/TopNav'

describe('TopNav.vue', () => {
  it('should render correct contents', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(TopNav)
    })
    expect(vm.$el.querySelector('.nav-wrapper').textContent)
      .to.equal('Welcome to Your Vue.js App')
  })
})
