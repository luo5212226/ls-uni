<template>
	<view class="content" :style="{'min-height': height + 'px'}">
		<image class="logo" src="/static/images/record.png"></image>
		<view class="chunk" :style="{background: getImage('bg1'), 'background-size': '100% 100%'}" @tap="newRecord">
			<text class="title">新对局</text>
		</view>
    <view class="chunk"  :style="{background: getImage('bg3'), 'background-size': '100% 100%'}" @tap="heroRecord">
			<text class="title">英雄池</text>
		</view>
    <view class="chunk"  :style="{background: getImage('bg2'), 'background-size': '100% 100%'}" @tap="review">
			<text class="title">战力榜</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '',
        height: ''
			}
		},
    computed: {
    },
		onLoad() {

		},
    mounted() {
      var _this = this;
      console.log(getApp())
      // _this.height = getApp().globalData.windowHeight;
      uni.getSystemInfo({
        success: function (res) {
          _this.height = res.windowHeight;
        }
      });
    },
		methods: {
      getImage(url) {
        return 'url(' + require(`@/static/images/${url}.png`) + ')'
      },
      newRecord() {
        uni.navigateTo({url: '/pages/newRecord/index',fail:(e) => {console.log(e)}})
      },
      review() {
        uni.navigateTo({url: '/pages/powerList/index',fail:(e) => {console.log(e)}})
      },
      heroRecord() {
        uni.navigateTo({url: '/pages/heroRecord/index',fail:(e) => {console.log(e)}})
      }
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

	.logo {
		height: 200rpx;
		width: 200rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}
  .chunk {
    &:first-of-type {
      margin-top: 100rpx;
    }
    margin-top: 40rpx;
    border-radius: 10rpx;
    width: 600rpx;
    height: 140rpx;
    display: flex;
    justify-content: center;
    align-items: center;
  }

	.title {
		font-size: 36rpx;
		color: #333;
    font-weight: 600;
	}
</style>
