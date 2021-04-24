<template>
  <view class="category_tab">
    <view class="category_tab_title">
      <view class="title_inner">
        <uni-segmented-control :current="current"
                               :values="itemsTitle"
                               @clickItem="onClickItem"
                               styleType="text"
                               activeColor="#d4237a"></uni-segmented-control>
      </view>
      <view class="iconfont"></view>
    </view>
    <view class="category_tab_content">
      <view v-if="current === 0">
        <view v-if="newList.length===0">
          没有图片
        </view>
        <view class="new_list">
          <view class="new_item"
                v-for="item in newList"
                :key="item.id">
            <image mode="aspectFill"
                   :src="item.img" />
          </view>
        </view>
      </view>
      <view v-if="current === 1">
        <view v-if="hotList.length===0">
          没有图片
        </view>
        <view class="new_list">
          <view class="new_item"
                v-for="item in hotList"
                :key="item.id">
            <image mode="aspectFill"
                   :src="item.img" />
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { uniSegmentedControl } from '@dcloudio/uni-ui'
import api from '@/api'
export default {
  components: {
    uniSegmentedControl,
  },
  data() {
    return {
      items: [
        { title: '最新', value: 'new' },
        { title: '热门', value: 'hot' },
      ],
      current: 0,
      params: {
        limit: 30,
        skip: 0,
        order: 'new',
      },
      newList: [],
      hotList: [],
      id: -1,
    }
  },
  computed: {
    itemsTitle() {
      return this.items.map((v) => v.title)
    },
  },
  onLoad(options) {
    console.log(options)
    this.id = options.id
    this.queryCategoryInfo(options.id)
  },
  onReachBottom() {
    console.log(`11111111111`)
    this.params.skip += this.params.limit
    this.queryCategoryInfo(this.id)
  },
  methods: {
    onClickItem(e) {
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex
        let order = this.items[this.current].value
        this.params.order = order
        this.queryCategoryInfo(this.id)
      }
    },
    async queryCategoryInfo(id) {
      const { limit, skip, order } = this.params
      const resp = await api.home.queryCategoryInfo(id, limit, skip, order)
      if (order === 'new') {
        if (this.newList.length === 0) {
          this.newList = resp.data.res.vertical
          return false
        }
        if (resp.data.res.vertical.length === 0) {
          uni.showToast({
            title: `没有图片了`,
            icon: 'none',
          })
          return false
        }
        this.newList = [...this.newList, ...resp.data.res.vertical]
      }
      if (order === 'hot') {
        if (this.hotList.length === 0) {
          this.hotList = resp.data.res.vertical
          return false
        }
        if (resp.data.res.vertical.length === 0) {
          uni.showToast({
            title: `没有图片了`,
            icon: 'none',
          })
          return false
        }
        this.hotList = [...this.hotList, ...resp.data.res.vertical]
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.category_tab {
  .category_tab_title {
    position: relative;
    .title_inner {
      width: 45%;
      margin: 0 auto;
    }
    .iconfont {
    }
    .iconsearch {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 5%;
    }
  }
  .category_tab_content {
    .new_list {
      display: flex;
      flex-wrap: wrap;
      .new_item {
        width: 33.33%;
        border: 5rpx solid #fff;
        image {
          height: 400rpx;
        }
      }
    }
  }
}
</style>