<template>
  <view class="content">
    <view class="resultTitle">
      结算清单
    </view>
    <view style="margin-top: 20px;font-size: 14px;">
      <view v-if="infoList.length" class="listTitle">
        <text class="title first">英雄名</text>
        <text class="title">累计</text>
        <text class="title">剩余</text>
        <text class="title">结算</text>
      </view>
      <view v-for="(info, index) in infoList" :key="index" class="infoList">
        <view class="item-left">
          <my-svg :type="'people'+(index+1)" class="player"></my-svg>
          <text class="player-name">{{ info.name }}</text>
        </view>
        <text class="item-percent record">{{ info.startRecord + info.addRecord }}</text>
        <text class="item-percent record">{{ info.endRecord }}</text>
        <text class="item-value record">{{ info.endRecord - (info.startRecord + info.addRecord) }}</text>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  name: 'Result',
  data() {
    return {
      infoList: []
    }
  },
  onLoad(data) {
    this.infoList = JSON.parse(data.list).data.sort((x, y) => {
      var temp1 = x.endRecord - (x.startRecord + x.addRecord);
      var temp2 = y.endRecord - (y.startRecord + y.addRecord);
      return temp2 - temp1;
    });
  },
  methods: {
  }
};
</script>
<style lang="scss" scoped>
  .content {
    background-image: linear-gradient(180deg,#315481,#918e82);
    background-repeat: no-repeat;
    min-height: 100%;
    padding-bottom: 40rpx;
    .resultTitle {
      line-height: 50rpx;
      text-align: center;
      color: rgb(255, 208, 0);
      padding-top: 30rpx;
    }
    .listTitle {
      height: 80rpx;
      display: flex;
      align-items: center;
      padding: 0 50rpx;
      font-size: 16px;
      margin: 20rpx 30rpx 20rpx;
      color: rgb(255, 208, 0);
      .title {
        text-align: center;
        width: 80rpx;
        flex: 1;
        display: inline-block;
      }
      .first {
        flex: 2;
        width: 160rpx;
      }
    }
    .infoList {
      line-height: 48rpx;
      margin: 20rpx 30rpx 20rpx;
      height: 104rpx;
      display: flex;
      align-items: center;
      box-shadow: 0 4px 8px 0 rgba(10,22,71,0.12);
      border-radius: 4rpx;
      padding: 0 50rpx;
      background: #918e82;
      .item-left {
        flex: 2;
        width: 160rpx;
        display: flex;
        align-items: center;
        .player {
          height: 48rpx;
          width: 48rpx;
          margin-right: 20rpx;
        }
      }
      .record {
        text-align: center;
        width: 80rpx;
        flex: 1;
        display: inline-block;
      }
      .didian {
        height: 50rpx;
        width: 38rpx;
        margin: 0 32rpx;
      }
      .item-percent {
        color: rgba(13, 14, 16, 100);
        opacity: 0.3;
      }
      .item-value {
        display: inline-block;
        text-align: center;
      }
    }
  }
</style>

