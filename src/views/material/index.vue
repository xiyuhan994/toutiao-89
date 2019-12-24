<template>
  <el-card v-loading='loading'>
    <bread-crumb slot="header">
      <template slot="title">素材管理</template>
    </bread-crumb>

    <!-- 上传图片 -->
    <el-row type='flex' justify='end'>
      <el-upload :http-request='uploadImg' action='' :show-file-list='false'>
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </el-row>

    <!-- 素材 -->
    <el-tabs v-model="activeName" @tab-click="chageTab">
      <!-- 全部素材 -->
      <el-tab-pane label="全部" name="all">
        <!-- 循环图片 -->
        <div class="imgList">
          <el-card class="card" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />

            <!-- 小图标 -->
            <el-row
              class="row"
              type="flex"
              justify="space-around"
              style="height:50px;background:#f4f4f4"
              align="middle"
            >

            <!-- 根据状态收藏状态 -->
              <i  @click="collectImg(item)" :style="{color:item.is_collected ? 'red':''}" class="el-icon-star-on left" id="star"></i>
            <!-- 删除图片 -->
              <i @click="deleteImg(item.id)" class="el-icon-delete-solid right"></i>
            </el-row>
          </el-card>
        </div>
      </el-tab-pane>

      <!-- 收藏素材 -->
      <el-tab-pane  label="收藏" name="collect">
        <!-- 循环图片 -->
        <div class="imgList">
          <el-card class="card" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
          </el-card>
        </div>
      </el-tab-pane>

      <!-- 分页 -->
      <el-row type="flex" justify="center">
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="changePage"
          :total="page.total"
          :current-page="page.currentPage"
          :page-size="page.pageSize"
        ></el-pagination>
      </el-row>

    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      activeName: 'all',
      list: [],
      page: {
        //   每页显示多少
        pageSize: 10,
        currentPage: 1,
        total: 0
      }
    }
  },
  methods: {

    // 图片删除
    deleteImg (id) {
      this.$confirm('您确定要删除吗').then(() => {
        // 删除图片接口
        this.$axios({
          url: `/user/images/${id}`,
          method: 'delete'
        }).then().catch(() => {
          // 更新
          this.getAllimg()
        })
      })
    },

    // 图片收藏
    collectImg (row) {
      this.$axios({
        url: `/user/images/${row.id}`,
        method: 'put',
        data: {
          // 状态取反 收藏改取消
          collect: !row.is_collected
        }
      }).then(() => {
        // 重新加载数据
        this.getAllimg()
      })
    },

    // 上传图片
    uploadImg (params) {
      this.loading = true
      // alert(1)
      let fd = new FormData()
      fd.append('image', params.file)
      this.$axios({
        url: '/user/images',
        method: 'post',
        data: fd
      }).then(res => {
        // 上传成功
        this.loading = false
        this.getAllimg()
      })
    },

    // 获取分页数据
    changePage (newPage) {
      // 得到最新页面
      this.page.currentPage = newPage
      this.getAllimg()
    },

    // 点击收藏
    chageTab () {
      this.getAllimg()
    },
    // 获取所有素材
    getAllimg () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: this.activeName === 'collect',
          per_page: this.page.pageSize,
          page: this.page.currentPage
        }
      }).then(res => {
        this.list = res.data.results
        this.page.total = res.data.total_count
      })
    }
  },
  created () {
    this.getAllimg()
  }
}
</script>

<style lang='less' scoped>
.imgList {
  display: flex;
  flex-wrap: wrap;
  .card {
    width: 220px;
    height: 265px;
    display: flex;
    flex-wrap: wrap;
    margin: 20px 40px;
    img {
      width: 180px;
      height: 190px;
    }
    .row {
      // height: 40px;
      margin: 0 -20px;
      // left: 0;
      text-align: center;
      i {
        font-size: 20px;
        width: 95px;
        cursor: pointer;
      }
    }
  }
}
</style>
