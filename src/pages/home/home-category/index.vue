<template>
  <scroll-view scroll-y="true"
               class="category_page">
    <view class="category_list">
      <navigator class="category_item"
                 v-for="item in categoryList"
                 :key="item.id"
                 :url="`/pages/imgCategory/index?id=${item.id}`">
        <image :src="item.cover"
               mode="aspectFill" />
        <view class="category_item_name">{{item.name}}</view>
      </navigator>
    </view>
  </scroll-view>
</template>

<script>
import api from '@/api'
export default {
  data() {
    return {
      categoryList: [],
    }
  },
  mounted() {
    uni.setNavigationBarTitle({
      title: `分类`,
    }),
      this.queryCategoryData()
  },
  methods: {
    async queryCategoryData() {
      const resp = await api.home.queryCategoryData()
      this.categoryList = resp.data.res.category
      console.log(this.categoryList)
    },
  },
}
</script>

<style lang="scss" scoped>
.category_page {
  height: calc(100vh - 36px);
}
.category_list {
  display: flex;
  flex-wrap: wrap;
  .category_item {
    width: 33.33%;
    position: relative;
    border: 5rpx solid #fff;
    image {
      height: 240rpx;
    }
    .category_item_name {
      position: absolute;
      bottom: 0;
      left: 0;
      color: #fff;
      font-size: 30rpx;
    }
  }
}
</style>