<template>
  <view class="video_tab">
    <view class="video_tab_title">
      <view class="title_inner">
        <uni-segmented-control :current="current"
                               :values="itemsTitle"
                               @clickItem="onClickItem"
                               styleType="text"
                               activeColor="#d4237a"></uni-segmented-control>
      </view>
      <view class="iconfont"></view>
    </view>
    <view class="video_tab_content">
      <view v-if="current === 0">
        <video-recommend></video-recommend>
      </view>
      <view v-if="current === 1">
        <video-recreation></video-recreation>
      </view>
      <view v-if="current === 2">
        <video-new></video-new>
      </view>
      <view v-if="current === 3">
        <video-hot></video-hot>
      </view>
      <view v-if="current === 4">
        <video-category></video-category>
      </view>
    </view>
  </view>
</template>

<script>
import videoHot from './video-hot/index.vue'
import videoNew from './video-new/index.vue'
import videoRecommend from './video-recommend/index.vue'
import videoCategory from './video-category/index.vue'
import videoRecreation from './video-recreation/index.vue'
import { uniSegmentedControl } from '@dcloudio/uni-ui'
export default {
  components: {
    videoHot,
    videoNew,
    videoRecommend,
    videoCategory,
    uniSegmentedControl,
    videoRecreation,
  },
  data() {
    return {
      items: [
        { title: '推荐' },
        { title: '娱乐' },
        { title: '最新' },
        { title: '热门' },
        { title: '分类' },
      ],
      current: 0,
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

<style lang="scss" scoped>
.video_tab {
  .video_tab_title {
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