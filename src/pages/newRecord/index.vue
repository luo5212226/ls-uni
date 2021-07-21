<template>
  <view class="content" :style="pageHeight">
    <view class="newTitle">
      <text class="title">
        当前人数: {{ playerList.length }}
      </text>
      <view class="btnBox">
        <view class="title title-right" @tap="addPeopleFn">
          添加
          <my-svg type="addPeople" class="addPeople"></my-svg>
        </view>
        <view class="title title-right" @tap="endFn">结算<my-svg type="close" class="addPeople"></my-svg></view>
      </view>
    </view>
    <view class="recordBox">
      <view class="recordInfo" v-for="(item, index) in playerList" :key="index">
        <my-svg :type="`people${index+1}`" class="player"></my-svg>
        <view class="playerInfo">
          <view class="info">名字：<text>{{ item.name }}</text></view>
          <view class="info">初始积分：<view @tap="subFn('start', item)" style="display: inline-block;"><my-svg type="cut" style="font-size: 16px;"></my-svg></view><input type="number" :value="item.startRecord" class="setRecord" @input="inputFn('start', item, $event)" /><view @tap="addFn('start', item)" style="display: inline-block;"><my-svg type="add" style="font-size: 16px;"></my-svg></view></view>
          <view class="info">累加积分：<view @tap="subFn('add', item)" style="display: inline-block;"><my-svg type="cut" style="font-size: 16px;"></my-svg></view><input type="number" :value="item.addRecord" class="setRecord" @input="inputFn('add', item, $event)" /><view @tap="addFn('add', item)" style="display: inline-block;"><my-svg type="add" style="font-size: 16px;"></my-svg></view></view>
          <view class="info">剩余积分：<view @tap="subFn('end', item)" style="display: inline-block;"><my-svg type="cut" class="btn" style="font-size: 16px;"></my-svg></view><input type="number" :value="item.endRecord" class="setRecord" @input="inputFn('end', item, $event)" /><view @tap="addFn('end', item)" style="display: inline-block;"><my-svg type="add" style="font-size: 16px;"></my-svg></view></view>
          <view class="info">结算积分：<text class="record">{{ item.endRecord - (item.startRecord + item.addRecord) }}</text></view>
        </view>
      </view>
    </view>
    <uni-popup ref="popup" type="bottom" @change="popChange">
      <view class="newAddpeople">
          <view class="newAddBtn">
            <text @tap="popCancle">取消</text>
            <text @tap="popSure">确定</text>
          </view>
          <view class="newAddpeopleBox">
            <scroll-view :scroll-top="0" :scroll-y="true" :style="popHeight">
              <view class="scroll-view-item peopleView" @tap="hasCheckedType(item,index)" v-for="(item, index) in peopleList" :key="index">
                <my-svg type="danxuan" class="danxuan" v-if="item.hasChecked === false"></my-svg>
                <my-svg type="xuanzhong" class="xuanzhong" v-else></my-svg>
                <text :class="item.hasChecked ? 'changeColor' : ''">{{ item.name }}</text>
              </view>
            </scroll-view>
          </view>
      </view>
    </uni-popup>
  </view>
</template>
<script>
export default {
  data() {
    return {
      height: '',
      checkId: [],
      peopleList: [],
      startRecord: 4000
    }
  },
  computed: {
    playersList() {
      return this.$store.state.players.players;
    },
    playerList() {
      return this.peopleList.filter((item) => {
        return item.hasChecked;
      });
    },
    pageHeight() {
      return {
        'min-height': this.height + 'px'
      }
    },
    popHeight() {
      return {
        height: this.height/2 + 'px'
      }
    }
  },
  watch: {
    playersList: {
      immediate: true,
      handler(arr) {
        this.peopleList = arr.map(item => {
          return {
            name: item.name,
            hasChecked: false,
            startRecord: 4000,
            addRecord: 0,
            endRecord: 0
          }
        });
      }
    },
    playerList: {
      handler(arr) {
        this.$store.dispatch('modifyRecord', [...arr]);
      }
    }
  },
  mounted() {
    var _this = this;
    var record = this.$store.state.players.record;
    record.forEach(item => {
      var index = _this.peopleList.findIndex((player) => player.name === item.name);
      if (index > -1) {
        _this.peopleList.splice(index, 1, item);
      }
    });
    // _this.height = getApp().globalData.windowHeight;
    uni.getSystemInfo({
      success: function (res) {
        _this.height = res.windowHeight;
      }
    });
    this.getChecked();
  },
  methods: {
    inputFn(type, item, e) {
      var value = 0;
      var index = this.peopleList.findIndex(people => people.name === item.name);
      if (/^[1-9]\d*$/.test(e.target.value)) {
        value = +e.target.value;
      }
      if (type === 'start') {
        this.$set(this.peopleList[index], 'startRecord', value);
      } else if (type === 'add') {
        this.$set(this.peopleList[index], 'addRecord', value);
      } else {
        this.$set(this.peopleList[index], 'endRecord', value);
      }
    },
    endFn() {
      if (!this.playerList.length) {
        return;
      }
      uni.navigateTo({
        url: '/pages/newRecord/result?list=' + JSON.stringify({ data: this.playerList })
      })
    },
    addFn(type, item) {
      var index = this.peopleList.findIndex(people => people.name === item.name);
      if (type === 'start') {
        this.$set(this.peopleList[index], 'startRecord', this.peopleList[index].startRecord + 1000);
      } else if (type === 'add') {
        this.$set(this.peopleList[index], 'addRecord', this.peopleList[index].addRecord + 1000);
      } else {
        this.$set(this.peopleList[index], 'endRecord', this.peopleList[index].endRecord + 1000);
      }
    },
    subFn(type, item) {
      var index = this.peopleList.findIndex(people => people.name === item.name);
      if (type === 'start') {
        this.$set(this.peopleList[index], 'startRecord', this.peopleList[index].startRecord ? this.peopleList[index].startRecord - 1000 : 0);
      } else if (type === 'add') {
        this.$set(this.peopleList[index], 'addRecord', this.peopleList[index].addRecord ? this.peopleList[index].addRecord - 1000 : 0);
      } else {
        this.$set(this.peopleList[index], 'endRecord', this.peopleList[index].endRecord ? this.peopleList[index].endRecord - 1000 : 0);
      }
    },
    getChecked() {
      var _this = this;
      _this.checkId = [];
      _this.peopleList.forEach((item,index) => {
        if (item.hasChecked) {
          _this.checkId.push(index);
        }
      })
    },
    addPeopleFn() {
      this.$refs.popup.open();
    },
    hasCheckedType(item, index) {
      this.$set(this.peopleList[index], 'hasChecked', !item.hasChecked)
    },
    popSure() {
      var _this = this;
      // this.playerList = this.peopleList.filter((item, index) => {
      //   return item.hasChecked;
      // }).map((item) => {
      //   return {
      //     ...item,
      //     startRecord: 4000,
      //     addRecord: 0,
      //     endRecord: 0
      //   }
      // });
      this.getChecked();
      this.$refs.popup.close();
    },
    popChange(e) {
      var _this = this;
      if (e.show == false) {
        _this.peopleList.forEach((item, index) => {
          if (_this.checkId.indexOf(index) === -1) {
            _this.$set(_this.peopleList[index], 'hasChecked', false)
          } else {
            _this.$set(_this.peopleList[index], 'hasChecked', true)
          }
        })
      }
    },
    popCancle() {
      var _this = this;
      _this.peopleList.forEach((item,index) => {
        if (_this.checkId.indexOf(index) === -1) {
          _this.$set(_this.peopleList[index], 'hasChecked', false)
        } else {
          _this.$set(_this.peopleList[index], 'hasChecked', true)
        }
      })
      _this.$refs.popup.close();
    }
  }
  
}
</script>
<style lang="scss" scoped>
  .confirmBox {
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24rpx;
    .confirmBtn {
      margin-top: 60rpx;
      font-size: 16px;
      height: 80rpx;
      line-height: 80rpx;
      display: flex;
      justify-content: space-between; 
      width: 100%;
    }
  }
  .content {
    background-image: linear-gradient(
180deg
,#315481,#918e82);
    background-repeat: no-repeat;
    .newTitle {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title {
        font-size: 18px;
        display: inline-block;
        margin: 30rpx 30rpx;
        color: #fff;
        .addPeople {
          margin-left: 10rpx;
        }
      }
      .title-right {
        border: 1px solid #E3F2FD;
        padding: 8rpx 10rpx;
        border-radius: 4rpx;
        color: #FB8D12;
        font-size: 16px;
        margin: 30rpx 10rpx;
      }
    }
    .peoplePick {
      background: #fff;
      .pickTitle {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #E3F2FD;
        .title {
          font-size: 16px;
          display: inline-block;
          margin: 20rpx 20rpx;
          .addPeople {
            margin-left: 10rpx;
          }
        }
        .title-right {
          color: rgba(65,103,255,1)
        }
      }
    }
    .newAddpeople{
      background: #fff;
      overflow: scroll;
      .newAddBtn{
        padding: 0 52rpx;
        height: 40px;
        position: relative;
        text-align: center;
        font-size: 16px;
        display: flex;
        justify-content: space-between;
        align-items:center;
        border-bottom: solid 1px #eee;
      }
      text{
        font-size: 28rpx;
        line-height: 28rpx;
      }
      .newAddBtn text:first-child{
          color:#333;
        }
      .newAddBtn text:last-child{
          color:rgba(65,103,255,1)
      }
    }
    .newAddpeopleBox{
      .danxuan,.xuanzhong{
        margin-right: 20rpx;
      }
      .peopleView:nth-child(1), .peopleView:nth-child(2){
        margin-top: 52rpx;
      }
      .peopleView{
        width: 50%;
        text-align:center;
        padding:26rpx 0;
        float: left;
        font-size: 28rpx;
        line-height: 14px;
      }
      text{
          color: #333;
          opacity: 0.6;
        }
      .changeColor{
        color:rgba(65,103,255,1);
        opacity: 1;
      }
    }
    .recordBox {
      color: #fff;
      padding: 32rpx;
      display: flex;
      flex-wrap: wrap;
      align-content: center;
      justify-content: space-between;
      .recordInfo {
        width: 320rpx;
        height: 460rpx;
        border: 1px solid #eee;
        margin: 20rpx 0rpx 20rpx 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        padding: 20rpx 10rpx;
        .player {
          width: 140rpx;
          height: 140rpx;
        }
        .playerInfo {
          font-size: 28rpx;
          .info {
            &:first-of-type {
              margin-top: 20rpx;
            }
            display: flex;
            align-items: center;
            height: 60rpx;
            line-height: 60rpx;
            .setRecord {
              display: inline-block;
              text-align: center;
              width: 90rpx;
              font-size: 12px;
            }
            .record {
              padding: 0 6rpx;
              font-size: 12px;
              margin: 0 4rpx;
              display: inline-block;
              min-width: 90rpx;
              line-height: 36rpx;
              height: 36rpx;
              text-align: center;
            }
          }
        }
      }
    }
    .btnBox {
      display: flex;
      align-items: center;
      padding-right: 30rpx; 
    }
	}
</style>
