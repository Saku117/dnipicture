<template>
  <view>
    <view class="user_info">
      <view class="user_icon">
        <image :src="imgDetail.user.avatar"
               mode="widthFix"></image>
      </view>
      <view class="user_desc">
        <view class="user_name">{{imgDetail.user.name}}</view>
        <view class="user_time">{{imgDetail.cnTime}}</view>
      </view>
    </view>
    <view class="high_img">
      <swiper-action @swiperAction="handleSwiperAction">
        <image mode="widthFix"
               :src="imgDetail.newThumb"></image>
      </swiper-action>
    </view>
    <view class="user_rank">
      <view class="rank"><text>点赞{{imgDetail.favs}}</text></view>
      <view class="user_collect">收藏</view>
    </view>
    <view class="album_wrap"
          v-if="albumList.length!==0">
      <view class="album_title">相关</view>
      <view class="album_list">
        <view class="album_item"
              v-for="item in albumList"
              :key="item.id">
          <view class="album_img">
            <image :src="item.cover"
                   mode="widthFix"></image>
          </view>
          <view class="album_info">
            <view class="album_info_text">专辑</view>
            <view class="album_name">{{item.name}}</view>
          </view>
        </view>
      </view>
    </view>
    <view class="comment hot"
          v-if="commentList.length!==0">
      <view>
        <text>最新评论</text>
      </view>
      <view class="comment_list hot_list">
        <view class="comment_item hot_list"
              v-for="item in commentList"
              :key="item.id">
          <view class="comment_user_info hot_user_info">
            <view class="user_img">
              <image mode="widthFix"
                     :src="item.user.avatar"></image>
            </view>
            <view class="user_info">
              <view class="user_name">{{item.user.name}}</view>
              <view class="time">{{cnTime(item.atime)}}</view>
            </view>
          </view>
          <view class="comment_content">
            <view class="content">{{item.content}}</view>
            <view class="button">点赞</view>
          </view>
        </view>
      </view>
    </view>
    <view class="comment hot"
          v-if="hotList.length!==0">
      <view>
        <text>最热评论</text>
      </view>
      <view class="comment_list hot_list">
        <view class="comment_item hot_list"
              v-for="item in hotList"
              :key="item.id">
          <view class="comment_user_info hot_user_info">
            <view class="user_img">
              <image mode="widthFix"
                     :src="item.user.avatar"></image>
            </view>
            <view class="user_info">
              <view class="user_name">{{item.user.name}}</view>
              <view class="time">{{cnTime(item.atime)}}</view>
            </view>
          </view>
          <view class="comment_content">
            <view class="content">{{item.content}}</view>
            <view class="button">点赞</view>
          </view>
        </view>
      </view>
    </view>
    <view class="download">
      <view class="download_btn"
            @click="handleDownload">
        下载图片
      </view>
    </view>
  </view>
</template>

<script>
import swiperAction from '@/components/swiperAction.vue'
import moment from 'moment'
import api from '@/api'
moment.locale('zh-cn')
export default {
  components: {
    swiperAction,
  },
  data() {
    return {
      imgDetail: {},
      commentList: [],
      albumList: [],
      hotList: [],
      imgIndex: 0,
    }
  },
  computed: {
    cnTime() {
      return (atime) => {
        return moment(atime * 1000).fromNow()
      }
    },
  },
  onLoad() {
    const { imgList, imgIndex } = getApp().globalData
    this.imgIndex = imgIndex
    this.imgDetail = imgList[imgIndex]
    this.imgDetail.newThumb =
      this.imgDetail.thumb + this.imgDetail.rule.replace('$<Height>', 360)
    this.imgDetail.cnTime = moment(this.imgDetail.atime * 1000).fromNow()
    this.queryImgInfo(this.imgDetail.id)
  },
  methods: {
    async handleDownload() {
      await uni.showToast({
        title: `下载中`,
      })
      const resp = await uni.downloadFile({
        url: this.imgDetail.img,
      })
      const { tempFilePath } = resp[1]
      const resp2 = await uni.saveImageToPhotosAlbum({
        filePath: tempFilePath,
      })
      uni.hideLoading()
      console.log(resp2)
      if (resp2.length === 1) {
        await uni.showToast({
          title: '下载失败',
        })
        return false
      }
      await uni.showToast({
        title: '下载成功',
      })
    },
    handleSwiperAction(e) {
      const { imgList } = getApp().globalData
      if (e.direction === 'right') {
        if (this.imgIndex === 0) {
          uni.showToast({
            title: '该页为第一组数据,前方已经没有数据',
            icon: 'none',
          })
          return false
        }
        this.imgIndex -= 1
      } else {
        if (imgList.length === this.imgIndex + 1) {
          uni.showToast({
            title: '该页为最后一组数据,已经没有数据',
            icon: 'none',
          })
          return false
        }
        this.imgIndex += 1
      }
      this.imgDetail = imgList[this.imgIndex]
      this.imgDetail.newThumb =
        this.imgDetail.thumb + this.imgDetail.rule.replace('$<Height>', 360)
      this.imgDetail.cnTime = moment(this.imgDetail.atime * 1000).fromNow()
      console.log(this.imgDetail)
      this.queryImgInfo(this.imgDetail.id)
    },
    async queryImgInfo(id) {
      const resp = await api.home.queryImgInfo(id)
      this.commentList = resp.data.res.comment || []
      this.hotList = resp.data.res.hot || []
      this.albumList = resp.data.res.album || []
    },
  },
}
</script>

<style lang="scss" scoped>
.user_info {
  display: flex;
  padding: 20rpx;
  align-items: center;
  .user_icon {
    padding: 0 20rpx;
    image {
      width: 88rpx;
      border-radius: 50%;
    }
  }
  .user_desc {
    .user_name {
      color: #000;
      font-weight: 600;
    }
    .user_time {
      color: #ccc;
      font-size: 24rpx;
      padding: 10rpx 0;
    }
  }
}
.high_img {
}
.user_rank {
  display: flex;
  padding: 20rpx;
  border-bottom: 1rpx solid #ccc;
  .rank {
    flex: 1;
    text-align: center;
  }
  .user_collect {
    flex: 1;
    text-align: center;
  }
}
.album_wrap {
  padding: 20rpx;
  .album_title {
    padding: 10rpx 0;
  }
  .album_list {
    .album_item {
      display: flex;
      padding: 10rpx 0;
      .album_img {
        flex: 1;
        image {
        }
      }
      .album_info {
        flex: 3;
        padding-left: 20rpx;
        .album_info_text {
          width: 100rpx;
          height: 50rpx;
          background-color: $color;
          color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .album_name {
          padding: 10rpx 0;
          color: #888;
        }
      }
    }
  }
}
.comment {
  .comment_list {
    .comment_item {
      border-bottom: 5px solid #ccc;
      .comment_user_info {
        display: flex;
        align-items: center;
        .user_img {
          padding: 0 10rpx;
          image {
            width: 66rpx;
            // border-radius: 50%;
          }
        }
        .user_info {
          display: block;
          .user_name {
          }
          .time {
          }
        }
      }
      .hot_user_info {
      }
      .comment_content {
        padding: 20rpx 0;
        position: relative;
        .content {
          margin-left: 105rpx;
          font-size: 25rpx;
          font-weight: 600;
        }
        .button {
          position: absolute;
          right: 10rpx;
          top: 10rpx;
          padding: 10rpx 20rpx;
          background-color: $color;
          color: #000;
        }
      }
    }
    .hot_list {
    }
  }
  .hot_list {
  }
}
.hot {
}
.download {
  height: 120rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  .download_btn {
    width: 80%;
    height: 80%;
    background-color: $color;
    color: #fff;
    font-size: 40rpx;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>