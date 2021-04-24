<template>
  <view class="home_tab">
    <view class="home_tab_title">
      <view class="title_inner">
        <uni-segmented-control :current="current"
                               :values="itemsTitle"
                               @clickItem="onClickItem"
                               styleType="text"
                               activeColor="#d4237a"></uni-segmented-control>
      </view>
      <view class="iconfont"></view>
    </view>
    <view class="home_tab_content">
      <view v-if="current === 0">
        <home-recommend></home-recommend>
      </view>
      <view v-if="current === 1">
        <home-category></home-category>
      </view>
      <view v-if="current === 2">
        <home-new></home-new>
      </view>
      <view v-if="current === 3">
        <home-album></home-album>
      </view>
    </view>
  </view>
</template>

<script>
import homeAlbum from './home-album/index.vue'
import homeNew from './home-new/index.vue'
import homeRecommend from './home-recommend/index.vue'
import homeCategory from './home-category/index.vue'
import { uniSegmentedControl } from '@dcloudio/uni-ui'
export default {
  components: {
    homeAlbum,
    homeNew,
    homeRecommend,
    homeCategory,
    uniSegmentedControl,
  },
  data() {
    return {
      items: [
        { title: '推荐' },
        { title: '分类' },
        { title: '最新' },
        { title: '专辑' },
      ],
      current: 1,
    }
  },
  computed: {
    itemsTitle() {
      return this.items.map((v) => v.title)
    },
  },
  onLoad() {
    // this.queryNewsAn()
    // this.queryNews()
  },
  methods: {
    onClickItem(e) {
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex
      }
    },
    // async queryNewsAn() {
    //   const resq = await http(`/news/announcement`, {
    //     method: 'GET',
    //   })
    //   console.log(resq)
    //   this.announcements = resq.data.data
    // },
    // async queryNews() {
    //   const resq = await uni.request({
    //     url: `http://localhost:3000/news/announcement`,
    //     method: 'GET',
    //   })
    //   console.log(resq[1].data.data);
    //   this.announcements=resq[1].data.data
    // },
  },
}
</script>

<style lang="scss">
.home_tab {
  .home_tab_title {
    position: relative;
    .title_inner {
      width: 60%;
      margin: 0 auto;
    }
    .iconsearch {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 5%;
    }
  }
}
</style>