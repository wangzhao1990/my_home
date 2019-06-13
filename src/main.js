// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import Test from "./components/Test";
import router from "./router"
import store from "./store"
import {AlertPlugin, ToastPlugin, WechatPlugin} from 'vux'
import axios from "./axios";
Vue.use(AlertPlugin);
Vue.use(ToastPlugin);
Vue.use(WechatPlugin);

FastClick.attach(document.body);
// 阻止启动生产提示
Vue.config.productionTip = false;
Vue.prototype.baseUrl = process.env.API_ROOT;
Vue.prototype.$axios=axios;

/* 对接微信 */
// console.log(Vue.wechat);
// Axios.get( process.env.API_ROOT + 'v1/wx/config' + '?signUrl=http%3a%2f%2flocalhost%3a8083%2f'  ).then(data => {
//   console.log(data);
//   let config = {debug:true,appId: data.data.appid,timestamp: data.data.timestamp,nonceStr: data.data.nonceStr,signature: data.data.signature,jsApiList: ["onMenuShareTimeline","updateAppMessageShareData"]};
//   Vue.wechat.config(config);
//   Vue.wechat.ready(() => {
//     console.log("ready");
//   });
//   Vue.wechat.error(() => {
//     console.log("error")
//   });
// });



router.beforeEach(function (to, from, next) {
  store.commit('updateLoadingStatus', {isLoading: true});
  next()
});

// 添加谷歌统计，main.js 里，如果你使用了 vue-router
router.afterEach(function (to) {
  store.commit('updateLoadingStatus', {isLoading: false});
  if (window.ga) {
    window.ga('set', 'page', to.fullPath); // 你可能想根据请求参数添加其他参数，可以修改这里的 to.fullPath
    window.ga('send', 'pageview')
  }
});


/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(Test)
}).$mount('#app-box');
