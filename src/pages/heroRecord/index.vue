<template>
  <view class="content" :style="{'min-height': height + 'px'}">
    <view class="heroTitle">英雄池</view>
    <view class="heroPool">
      <view class="empty" v-if="heroList.length == 0">快去添加英雄吧~</view>
      <movable-area v-else style="height: 100%;width:560rpx;">
        <movable-view direction="vertical" style="width: 560rpx;height:auto;">
          <view class="peopleBox">
            <view v-for="(item, index) in heroList" :key="index" class="people">
              <view class="close" @tap="deleteFn(item, index)"><my-svg type="delete" class="close-svg"></my-svg></view>
              <my-svg :type="`people${index+1}`" class="addPeople"></my-svg>
              <text class="name">{{item.name}}</text>
            </view>
          </view>
        </movable-view>
      </movable-area>
    </view>
    <view>
      <!--<my-svg type="addPeople1" class="addPeople"></my-svg>-->
      <view class="operateBox">
        <text class="title" @tap="addFn">添加英雄</text>
      </view>
    </view>
    <uni-popup ref="popupCenter" type="center" :animation="false">
      <view class="confirmBox">
        <input name="input" placeholder="英雄名" focus class="input" v-model="changeValue" />
        <view class="formBtn">
          <button type="default" @tap="resetFn" class="btn">重置</button>
          <button @tap="submitFn" class="btn">提交</button>
        </view>
      </view>
    </uni-popup>
  </view>
</template>
<script>
import mySvg from '@/components/mySvg'
export default {
  components: {
    mySvg
  },
  data() {
    return {
      height: '',
      changeValue: ''
    }
  },
  computed: {
    heroList() {
      return this.$store.state.players.players;
    }
  },
  mounted() {
    console.log(this.$store);
    var _this = this;
    _this.height = getApp().globalData.windowHeight;
    uni.getSystemInfo({
      success: function (res) {
        _this.height = res.windowHeight;
      }
    });
  },
  methods: {
    deleteFn(item, index) {
      this.$store.dispatch('deletePlayer', item);
    },
    resetFn() {
      this.changeValue = '';
    },
    submitFn() {
      //todo
      if (!this.changeValue) {
        return;
      }
      this.$store.dispatch('addPlayer', { name: this.changeValue, hasChecked: false, startRecord: 4000, addRecord: 0, endRecord: 0 });
      this.changeValue = '';
      this.$refs.popupCenter.close();
      console.log(this.$store.state.players.players);
    },
    addFn() {
      this.$refs.popupCenter.open();
    }
  }
}
</script>
<style lang="scss" scoped>
  .confirmBox {
    background: #fff;
    height: 250rpx;
    width: 500rpx;
    color: #000;
    padding: 30rpx 20rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .input {
      border: 1px solid #E3F2FD;
      height: 64rpx;
      padding: 0 5px;
    }
    .formBtn {
      display: flex;
      justify-content: space-between;
      .btn {
        height: 30px;
        font-size: 16px;
        line-height: 30px;
      }
    }
  }
  .content {
    color: #fff;
    background-image: linear-gradient(
180deg
,#315481,#918e82);
    padding-top: 40rpx;
    background-repeat: no-repeat;
    .heroTitle {
      text-align: center;
      display: inline-block;
      width: 100%;
      height: 60rpx;
      line-height: 60rpx;
      margin-bottom: 40rpx;
    }
    .heroPool {
      padding: 30rpx 20rpx;
      margin: 0 auto;
      width: 600rpx;
      height: 940rpx;
      display: flex;
      overflow: hidden;
      border: 1px solid #E3F2FD;
      .empty {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
      }
      .peopleBox {
        display: flex;
        justify-content: space-around;
        width: 100%;
        flex-wrap: wrap;
        align-content:center;
        min-height: 936rpx;
        .people {
          height: 180rpx;
          width: 180rpx;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-around;
          position: relative;
          .close {
            position: absolute;
            width: 32rpx;
            height: 32rpx;
            right: 0;
            top: 0;
            .close-svg {
              width: 32rpx;
              height: 32rpx;
            }
          }
          .name {
            font-size: 14px;
          }
        }
      }
    }
    .operateBox {
      margin-top: 60rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 120rpx;
      .title {
        display: inline-block;
        font-size: 16px;
        height: 60rpx;
        line-height: 60rpx;
        padding: 0 20rpx;
        border: 1px solid #E3F2FD;
        border-radius: 8rpx;
      }
    }
	}
  .addPeople {
    width: 80rpx;
    height: 80rpx;;
  }
  /deep/ uni-movable-view {
    will-change: auto!important;
  }
</style>
