<template>
  <div class="cover-image">
    <div @click="openDialog(index)" class="cover-item" v-for="(item,index) in list" :key="index">
      <img :src="item ? item :defaultImg" alt />
    </div>

    <!-- 显示对话框 -->
    <el-dialog :visible.sync="dialogVisible" @close="closeDialog">
        <!-- 素材组件 监听谁的事件就在谁的标签上写 -->
        <select-img @selectOneimg='receiveImg'></select-img>
    </el-dialog>
  </div>
</template>

<script>
export default {
  // 接受属性
  props: ['list'],

  data () {
    return {
      // 定义默认下标
      selectIndex: -1,
      // 控制弹层打开关闭的变量
      dialogVisible: false,
      defaultImg: require('../../assets/img/pic_bg.png')
    }
  },
  methods: {

    // 接受方法
    receiveImg (img) {
    //   alert('接收到' + img)
    // 接收数据后 list为props数据 要修改 要再次传递用子传父
      this.$emit('selectOneImg', img, this.selectIndex)
      // 关闭

      this.closeDialog()
    },

    // 打开
    openDialog (index) {
      // 记住点击的下标
      this.selectIndex = index
      // 打开弹层
      this.dialogVisible = true
    },
    // 关闭
    closeDialog () {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang='less' scoped>
.cover-image {
  display: flex;
  margin: 20px 0;
  margin-left: 100px;
  .cover-item {
    border: 1px solid #ccc;
    width: 250px;
    height: 250px;
    padding: 10px;
    img {
      height: 100%;
      width: 100%;
    }
  }
}
</style>
