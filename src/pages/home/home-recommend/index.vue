<template>
  <scroll-view scroll-y="true"
               :scroll-top="scrollTop"
               class="recommend_view"
               v-if="recommendList.length>0"
               @scrolltolower="handleToLower()"
               @scrolltoupper="handleToUpper()">
    <view class="recommend_wrap">
      <navigator class="recommend_item"
                 v-for="item in recommendList"
                 :key="item.id"
                 :url="`/pages/album/index?id=${item.target}`">
        <image mode="widthFix"
               :src="item.thumb" />
      </navigator>
    </view>
    <view class="months_wrap">
      <view class="months_title">
        <view class="months_title_info">
          <view class="months_info">
            <text>{{monthForm.DD}}</text>
            /{{monthForm.MM}}月
          </view>
          <view class="months_text">{{monthForm.title}}</view>
        </view>
        <view class="months_title_more">
          更多 >
        </view>
      </view>
      <view class="months_content">
        <view class="months_item"
              v-for="(item,index) in monthForm.items"
              :key="item.id">
          <go-detail :list="monthForm.items"
                     :index="index">
            <image mode="aspectFill"
                   :src="item.thumb+item.rule.replace('$<Height>',360)"></image>
          </go-detail>
        </view>
      </view>
    </view>
    <view class="hot_wrap">
      <view class="hot_tilte"><text>热门</text></view>
      <view class="hot_content">
        <view v-for="(item,index) in hotList"
              :key="item.id"
              class="hot_item">
          <go-detail :list="hotList"
                     :index="index">
            <image :src="item.thumb"
                   mode="widthFix"></image>
          </go-detail>
        </view>
      </view>
    </view>
  </scroll-view>
</template>

<script>
import api from '@/api'
import moment from 'moment'
import goDetail from '@/components/goDetail.vue'
export default {
  components: {
    goDetail
  },
  data() {
    return {
      //推荐列表
      recommendList: [],
      monthForm: {},
      hotList: [],
      scrollTop: 0,
      params: {
        limit: 30,
        skip: 0,
        order: 'hot',
      },
    }
  },
  methods: {
    async queryRecommendData() {
      let { limit, skip, order } = this.params
      const resp = await api.home.queryRecommendData(limit, skip, order)
      console.log(resp.data.res.vertical)
      if (this.recommendList.length === 0) {
        this.recommendList = resp.data.res.homepage[1].items
        this.monthForm = resp.data.res.homepage[2]
        this.monthForm.MM = moment(this.monthForm.stime).format('MM')
        this.monthForm.DD = moment(this.monthForm.stime).format('DD')
        this.hotList = resp.data.res.vertical
        return false
      }
      if (resp.data.res.vertical.length === 0) {
        uni.showToast({
          title: `没有剩余数据`,
          type: 'warning',
          icon: 'none',
        })
        return false
      }
      this.hotList = [...this.hotList, ...resp.data.res.vertical]
    },
    // 滚动条触底事件
    handleToLower() {
      this.params.skip += this.params.limit
      this.queryRecommendData()
      //   console.log(`ddddddddddddd`)
    },
    handleToUpper() {
      this.queryRecommendData()
    },
  },
  mounted() {
    this.queryRecommendData()
  },
}
</script>

<style lang="scss" scoped>
.recommend_view {
  height: calc(100vh - 36px);
}
.recommend_wrap {
  display: flex;
  flex-wrap: wrap;
  .recommend_item {
    width: 50%;
    border: 5rpx solid #fff;
  }
}
.months_wrap {
  .months_title {
    display: flex;
    justify-content: space-between;
    padding: 20rpx;
    align-items: center;
    .months_title_info {
      color: $color;
      font-size: 30rpx;
      font-weight: 600;
      display: flex;
      .months_info {
        text {
          font-size: 36rpx;
        }
      }
      .months_text {
        font-size: 34rpx;
        color: black;
        padding-left: 20rpx;
      }
    }
    .months_title_more {
      font-size: 24rpx;
      color: $color;
    }
  }
  .months_content {
    display: flex;
    flex-wrap: wrap;
    .months_item {
      width: 33.33%;
      border: 5rpx solid #fff;
    }
  }
}
.hot_wrap {
  .hot_tilte {
    padding: 20rpx;
    text {
      border-left: 5rpx solid $color;
      padding-left: 10rpx;
      font-size: 30rpx;
      font-weight: 600;
    }
  }
  .hot_content {
    display: flex;
    flex-wrap: wrap;
    .hot_item {
      width: 33.33%;
      border: 5rpx solid #fff;
    }
  }
}
</style>