<template>
  <view class="content" :style="{'min-height': height + 'px'}">
    <view>战力排名</view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      height: ''
    }
  },
  mounted() {
    var _this = this;
    // _this.height = getApp().globalData.windowHeight;
    uni.getSystemInfo({
      success: function (res) {
        _this.height = res.windowHeight;
      }
    });
  },
  methods: {

  }
  
}
</script>
<style lang="scss" scoped>
  .content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
    background-image: linear-gradient(
180deg
,#315481,#918e82);
    background-repeat: no-repeat;
	}
</style>
