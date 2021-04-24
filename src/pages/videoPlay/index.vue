<template>
  <view class="video_play">
    <image :src="videoInfo.img"></image>
    <view class="video_icon">
      <view @click="toggleMuted">声音</view>
      <view class="video_share_btn">分享<button open-type="share"></button></view>
    </view>
    <view class="video_wrap">
      <video :src="videoInfo.video"
             :muted="muted"></video>
    </view>
    <view class="download">
      <view class="download_btn"
            @click="downloadVideo">下载高清</view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      videoInfo: {},
      muted: false,
    }
  },
  onLoad() {
    this.videoInfo = getApp().globalData.video
    console.log(getApp().globalData.video)
  },
  methods: {
    toggleMuted() {
      this.muted = !this.muted
    },
    async downloadVideo() {
      await uni.showToast({
        title: `下载中`,
        icon: 'none',
      })
      const { tempFilePath } = (
        await uni.downloadFile({
          url: this.videoInfo.video,
        })
      )[1]
      const resp = await uni.saveVideoToPhotosAlbum({
        filePath: tempFilePath,
      })
      uni.hideLoading()
      console.log(resp)
      await uni.showToast({
        title: `下载成功`,
        icon: 'none',
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.video_play {
  position: relative;
  image {
    height: 100vh;
    wight: 100vw;
    z-index: -1;
    position: absolute;
    filter: blur(20px);
  }
  .video_icon {
    height: 80rpx;
    display: flex;
    padding: 20rpx;
    justify-content: flex-end;
    view {
      color: black;
      padding: 0 10rpx;
      font-size: 35rpx;
      font-weight: 600;
    }
    .video_share_btn {
      position: relative;
      button {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
      }
    }
  }
  .video_wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    video {
      width: 350rpx;
      height: 600rpx;
    }
  }
  .download {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30rpx;
    .download_btn {
      height: 80rpx;
      width: 370rpx;
      border-radius: 40rpx;
      border: 3rpx solid #fff;
      display: flex;
      color: #fff;
      justify-content: center;
      align-items: center;
      font-size: 40rpx;
      background-color: rgba(0, 0, 0, 0.6);
    }
  }
}
</style>