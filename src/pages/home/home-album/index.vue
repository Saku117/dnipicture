<template>
  <scroll-view class="album_scroll_view"
               scroll-y="true"
               @scrolltolower="handleToLower">
    <view class="album_swiper">
      <swiper autoplay="true"
              :current="currentIndex"
              indicator-dots="true"
              circular="true">
        <swiper-item v-for="item in bannerList"
                     :key="item.id">
          <image :src="item.thumb"></image>
        </swiper-item>
      </swiper>
    </view>
    <view class="album_list">
      <navigator class="album_item"
                  v-for="item in albumList"
                  :key="item.id"
                  :url="'/pages/album/index?id='+item.id">
        <view class="album_img">
          <image :src="item.lcover" mode="aspectFill"></image>
        </view>
        <view class="album_content">
          <view class="album_title">{{item.name}}</view>
          <view class="album_text">{{item.desc}}</view>
          <view class="album_button">
            <view>关注</view>
          </view>
        </view>
      </navigator>
    </view>
  </scroll-view>
</template>

<script>
import api from '@/api'
export default {
  data() {
    return {
      bannerList: [],
      albumList: [],
      currentIndex: 0,
      params: {
        limit: 30,
        skip: 0,
        order: 'new',
      },
    }
  },
  mounted() {
    uni.setNavigationBarTitle({
      title: `专辑`,
    })
    this.queryAlbumData()
  },
  methods: {
    async queryAlbumData() {
      let { limit, skip, order } = this.params
      const resp = await api.home.queryAlbumData(limit, skip, order)
      console.log(resp.data.res.album)
      if (this.bannerList.length === 0) {
        this.bannerList = resp.data.res.banner
        this.albumList = resp.data.res.album
        return false
      }
      if (resp.data.res.album.length === 0) {
        uni.showToast({
          title: `没有剩余数据`,
          type: 'warning',
          icon: 'none',
        })
        return false
      }
      this.albumList = [...this.albumList, ...resp.data.res.album]
    },
    handleToLower() {
      this.params.skip += this.params.limit
      this.queryAlbumData()
      console.log(`sssss`)
    },
  },
}
</script>

<style lang="scss" scoped>
.album_scroll_view {
  height: calc(100vh - 36px);
}
.album_swiper {
  swiper {
    height: calc(750rpx / 2.3);
    image {
      height: 100%;
    }
  }
}
.album_list {
  padding: 10rpx;
  .album_item {
    display: flex;
    padding: 10rpx 0;
    border-bottom: 1rpx solid #ccc;
    .album_img {
      flex: 1;
      image {
        width: 200rpx;
        height: 200rpx;
      }
    }
    .album_content {
      flex: 2;
      padding: 0 10rpx;
      overflow: hidden;
      .album_title {
        font-weight: 600;
        font-size: 30rpx;
        padding: 20rpx;
        color: black;
      }
      .album_text {
        font-size: 24rpx;
        padding: 10rpx 0;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .album_button {
        padding: 10px;
        display: flex;
        justify-content: flex-end;
        view {
          color: $color;
          border: 1rpx solid $color;
          padding: 10rpx;
        }
      }
    }
  }
}
</style>