<template>
  <view class="mime_page">
    <view class="mine_info">
      <view class="mime_img">
        <image mode="widthFix"
               :src="userInfo.avatar"></image>
      </view>
      <view class="name_desc">
        <view class="mine_name">{{userInfo.name}}</view>
        <view class="mine_desc">{{userInfo.desc}}</view>
      </view>
    </view>
    <view class="mime_common_function">
      <view class="function_title">常用功能</view>
      <view class="function_wrap">
        <view class="mine_like">点赞</view>
        <view class="mime_collect">收藏</view>
        <view class="mime_download">下载</view>
        <view class="mime_upload">上传</view>
      </view>
    </view>
    <view class="mime_img">
      <view class="mime_img_title">我的浏览记录</view>
      <view class="mine_img_list">
        <view class="mine_img_item"
              v-for="item in userInfo.imgList"
              :key="item.id">
          <image mode="widthFix"
                 :src="item.url"></image>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        name: 'saku_meng',
        sex: 1,
        id: 123456,
        desc: 'monent，flex布局，sass，视频播放，视频下载等等功能',
        avatar: `https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcdn.duitang.com%2Fuploads%2Fitem%2F201408%2F24%2F20140824154253_45Hay.png&refer=http%3A%2F%2Fcdn.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621845477&t=3b926bde79e62377cde3296ab7c266af`,
        imgList: [
          {
            id: 1,
            url: `https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.zhimg.com%2F50%2Fv2-e73ebe5fb7fbae39d69ed94dcc82f145_hd.jpg&refer=http%3A%2F%2Fpic1.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621845477&t=a1898027a590dd849c6bc547fa2c408d`,
          },
          {
            id: 2,
            url: `https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.zhimg.com%2F50%2Fv2-e73ebe5fb7fbae39d69ed94dcc82f145_hd.jpg&refer=http%3A%2F%2Fpic1.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621845477&t=a1898027a590dd849c6bc547fa2c408d`,
          },
          {
            id: 3,
            url: `https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.zhimg.com%2F50%2Fv2-e73ebe5fb7fbae39d69ed94dcc82f145_hd.jpg&refer=http%3A%2F%2Fpic1.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621845477&t=a1898027a590dd849c6bc547fa2c408d`,
          },
        ],
      },
    }
  },
}
</script>

<style lang="scss" scoped>
.mime_page {
  padding: 10rpx;
  background: linear-gradient(#145, #ccc);
  height: 100vh;
  .mine_info {
    .mime_img {
    }
    .name_desc {
      .mine_name {
      }
      .mine_desc {
      }
    }
  }
  .mime_common_function {
    .function_title {
    }
    .function_wrap {
      .mine_like {
      }
      .mime_collect {
      }
      .mime_download {
      }
      .mime_upload {
      }
    }
  }
  .mime_img {
    // border: 1rpx solid #ddd;
    padding: 0 10rpx;
  }
  .mime_img_title {
    font-size: 35rpx;
    font-weight: 600;
  }
  .mine_img_list {
    display: flex;
    flex-wrap: wrap;
    .mine_img_item {
      border: 5px solid #fff;
      width: 33.33%;
    }
  }
}
.mine_info {
  border: 1px solid #ddd;
  height: 150rpx;
  display: flex;
  justify-content: space-around;
  padding: 0 10rpx;
  padding: 20rpx 0;
  .name_desc {
    flex: 4;
    margin-left: 30rpx;
    .mine_name {
      font-weight: 600;
      margin-bottom: 10rpx;
    }
    .mine_desc {
    }
  }
  .mime_img {
    flex: 1;
    image {
      border-radius: 50%;
      width: 100rpx;
    }
  }
}
.mime_common_function {
  border: 1px solid #ddd;
  padding: 40rpx 0;
  .function_title {
    font-size: 35rpx;
    font-weight: 600;
  }
  .function_wrap {
    margin: 10rpx 0;
    display: flex;
    view {
      flex: 1;
      padding: 10rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: $color;
      margin: 0 20rpx;
      color: black;
    }
    .mine_like {
    }
    .mime_collect {
    }
    .mime_download {
    }
    .mime_upload {
    }
  }
}
</style>