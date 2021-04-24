<template>
  <view v-if="wallpaperList.length!==0">
    <view class="album_bg">
      <image mode="widthFix"
             :src="albumInfo.cover"></image>
      <view class="album_info">
        <view class="album_name">{{albumInfo.name}}</view>
        <view class="album_btn">关注专辑</view>
      </view>
    </view>
    <view class="album_author">
      <view class="album_author_info">
        <image mode="widthFix"
               :src="albumInfo.user.avatar"></image>
        <view class="author_name">{{albumInfo.user.name}}</view>
      </view>
      <view class="album_author_desc">
        <text>{{albumInfo.desc}}</text>
      </view>
    </view>
    <view class="album_list">
      <view class="album_item"
            v-for="(item,index) in wallpaperList"
            :key="item.id">
        <go-detail :list="wallpaperList"
                   :index="index">
          <image mode="aspectFill"
                 :src="item.thumb+item.rule.replace('$<Height>',360)"></image>
        </go-detail>
      </view>
    </view>
  </view>
</template>

<script>
import api from '@/api'
import goDetail from '@/components/goDetail.vue'
export default {
  components: {
    goDetail,
  },
  data() {
    return {
      id: 0,
      albumInfo: {},
      wallpaperList: [],
      params: {
        limit: 30,
        order: 'new',
        skip: 0,
        first: 1,
      },
      hasMore: true,
    }
  },
  mounted() {},
  onLoad(options) {
    let { id } = options
    this.id = id
    this.queryAlbumInfo(id)
  },
  onReachBottom() {
    if (this.hasMore) {
      this.params.skip += this.params.limit
      this.queryAlbumInfo(this.id)
    }
  },
  methods: {
    async queryAlbumInfo(id) {
      let { limit, order, skip, first } = this.params
      const resp = await api.home.queryAlbumInfo(id, limit, order, skip, first)
      // const resp = await api.home.queryImgInfo(id)
      console.log(resp.data.res)
      if (this.wallpaperList.length === 0) {
        this.albumInfo = resp.data.res.album
        this.wallpaperList = resp.data.res.wallpaper
      }
      if (resp.data.res.wallpaper.length === 0) {
        this.hasMore = false
        uni.showToast({
          title: `没有剩余数据`,
          type: 'warning',
          icon: 'none',
        })
        return false
      }
      this.wallpaperList = [...this.wallpaperList, ...resp.data.res.wallpaper]
    },
  },
}
</script>

<style lang="scss" scoped>
.album_bg {
  position: relative;
  image {
  }
  .album_info {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    height: 80rpx;
    align-items: center;
    color: #fff;
    padding: 0 15rpx;
    .album_name {
      font-size: 40rpx;
    }
    .album_btn {
      background-color: $color;
      width: 152rpx;
      height: 60rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10rpx;
    }
  }
}
.album_author {
  padding: 10rpx;
  .album_author_info {
    display: flex;
    padding: 10rpx 0;
    align-items: center;
    image {
      width: 50rpx;
    }
    .author_name {
      margin-left: 15rpx;
      color: #000;
    }
  }
  .album_author_desc {
  }
}
.album_list {
  display: flex;
  flex-wrap: wrap;
  .album_item {
    width: 33.33%;
    border: 3rpx solid #fff;
    image {
      height: 160rpx;
    }
  }
}
</style>