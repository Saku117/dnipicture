<template>
  <scroll-view scroll-y="true"
               @scrolltolower="handleToLower"
               class="video_recommend">
    <view class="video_list">
      <view class="video_item"
            v-for="item in videoList"
            :key="item.id"
            @click="handleGoVideo(item)">
        <image mode="aspectFill"
               :src="item.img"></image>
      </view>
    </view>
  </scroll-view>
</template>

<script>
import api from '@/api'
export default {
  data() {
    return {
      params: {
        limit: 30,
        skin: 0,
        order: 'hot',
      },
      videoList: [],
      hasMore: true,
    }
  },
  mounted() {
    this.queryFeaturedData()
  },
  methods: {
    async queryFeaturedData() {
      const { limit, skin, order } = this.params
      const resp = await api.video.queryFeaturedData(limit, skin, order)
      if (this.videoList.length === 0) {
        this.videoList = resp.data.res.videowp
        return
      }
      this.videoList = [...this.videoList, ...resp.data.res.videowp]
    },
    handleGoVideo() {
      getApp().globalData.video = item
      uni.navigateTo({
        url: '/pages/videoPlay/index',
      })
    },
    handleToLower() {
      if (!this.hasMore) {
        uni.showToast({
          title: `没有数据了`,
          icon: 'none',
        })
        return
      }
      this.params.skip += this.params.limit
      this.queryFeaturedData()
      console.log(`111111`)
    },
  },
}
</script>
<style lang="scss" scoped>
.video_recommend {
  height: calc(100vh - 36px);
}
.video_list {
  display: flex;
  flex-wrap: wrap;
  .video_item {
    width: 33.33%;
    border: 5rpx solid #fff;
    image {
      height: 360rpx;
    }
  }
}
</style>