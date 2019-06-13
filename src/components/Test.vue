<template>
  <div id="test">
    <h1>Hello App!</h1>
    <p>
      <!-- 使用 router-link 组件来导航. -->
      <!-- 通过传入 `to` 属性指定链接. -->
      <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
      <router-link to="/foo">Go to Foo</router-link>
      <router-link to="/bar">Go to Bar</router-link>
      <router-link to="/user/123">Go to User</router-link>
    </p>
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
    <group>
      <cell title="title" value="value"></cell>
    </group>
    <loading v-model="isLoading"></loading>
  </div>
</template>

<script>
  import {Group, Cell} from 'vux'
  import {Loading} from 'vux'
  import {mapState} from 'vuex'

  export default {
    name: "Test",
    components: {
      Group,
      Cell,
      Loading
    },
    mounted() {
      console.log(this.$wechat)
    },
    created() {
      let wx = this.$wechat;

      this.$axios.get(this.baseUrl + 'v1/wx/config' + '?signUrl=' + window.location.href).then(data => {
        console.log(data);
        let config = {
          debug: true,
          appId: data.data.appid,
          timestamp: data.data.timestamp,
          nonceStr: data.data.nonceStr,
          signature: data.data.signature,
          jsApiList: ["onMenuShareTimeline", "updateAppMessageShareData"]
        };

        wx.config(config);
        wx.ready(() => {
          wx.onMenuShareAppMessage({
            title: 'Hello , my friend', // 分享标题
            desc: '', // 分享描述
            link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: '', // 分享图标
            success: function () {
              // 设置成功
            }
          });
        });
        this.$wechat.error(() => {
          console.log("error")
        });
      });

    },
    computed: {
      ...mapState({
        isLoading: state => state.vux.isLoading
      })
    }

  }
</script>

<style scoped>

</style>
