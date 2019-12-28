<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <!-- 全部素材 -->
    <el-tab-pane label="素材库" name="material">
      <div class="select-img-list">
        <el-card class="img-card" v-for="item in list" :key="item.id">
          <!-- 点击图片时调用方法 把图片放上去 -->
          <img @click="clickImg(item.url)" :src="item.url" alt />
        </el-card>
      </div>
      <!-- 分页 -->
      <el-row type="flex" justify="center">
        <el-pagination
          @current-change="changePage"
          background
          layout="prev, pager, next"
          :page-size="page.pageSize"
          :total="page.total"
          :current-page="page.currentPage"
        ></el-pagination>
      </el-row>
    </el-tab-pane>

    <!-- 上传图片 -->
    <el-tab-pane label="上传图片" name="upload">
      <el-upload class="uploadimg" :http-request="uploadImg" action='' :show-file-list="false">
        <i class="el-icon-plus small"></i>
      </el-upload>
    </el-tab-pane>
    <!-- 分页效果 -->
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      // 默认选择
      activeName: 'material',
      list: [],
      // 分页
      page: {
        total: 0,
        pageSize: 8,
        currentPage: 1
      }
    }
  },
  methods: {
    // 上传图片
    uploadImg (params) {
      // 实例对象
      let data = new FormData()
      // 添加文件参数
      data.append('image', params.file)
      this.$axios({
        url: '/user/images',
        method: 'post',
        data
      }).then(res => {
        // 自定义事件 把传过来的回传过去

        this.$emit('selectOneimg', res.data.url)
      })
    },

    // 点击图片触发
    clickImg (url) {
      //   alert(url)
      // 将url地址传出去 自定义事件 子传父 时间名不用小写
      this.$emit('selectOneimg', url)
    },

    // 获取新页面数据
    changePage (newpage) {
      this.page.currentPage = newpage
      this.getAllImg()
    },

    // 获取所有图片数据
    getAllImg () {
      this.$axios({
        url: '/user/images',
        params: {
          // 全部数据
          collect: false,
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then(res => {
        this.list = res.data.results
        // 赋值总数
        this.page.total = res.data.total_count
      })
    },
    handleClick () {}
  },
  created () {
    this.getAllImg()
  }
}
</script>

<style lang='less' scoped>
.select-img-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .img-card {
    margin: 20px;
    width: 120px;
    height: 120px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}

.uploadimg {
  display: flex;
  justify-content: center;
  .small {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border: 1px solid #cccccc;
  }
}
</style>
