<template>
  <view @touchstart="handleTouchStart"
        @touchend="handleTouchEnd">
    <slot></slot>
  </view>
</template>

<script>
export default {
  data() {
    return {
      startTime: 0,
      startX: 0,
      startY: 0,
    }
  },
  methods: {
    handleTouchStart(event) {
      this.startTime = Date.now()
      this.startX = event.changedTouches[0].clientX
      this.startY = event.changedTouches[0].clientY
    },
    handleTouchEnd(event) {
      const endTime = Date.now()
      const endX = event.changedTouches[0].clientX
      const endY = event.changedTouches[0].clientY

      if (endTime - this.startTime > 2000) {
        return
      }

      if (
        Math.abs(endX - this.startX) < 10 ||
        Math.abs(endY - this.startY) > 10
      ) {
        return
      }
      let direction = endX - this.startX > 0 ? 'right' : 'left'

      this.$emit('swiperAction', { direction })
    },
  },
}
</script>

<style>
</style>