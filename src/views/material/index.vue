<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">素材管理</template>
    </bread-crumb>

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
              <i class="el-icon-star-on left" id="star"></i>
              <i class="el-icon-delete-solid right"></i>
            </el-row>
          </el-card>
        </div>
      </el-tab-pane>
      <!-- 分页 -->
      <el-row type='flex' justify='center' >
            <el-pagination background layout="prev, pager, next" @current-change='changePage' :total="page.total" :current-page='page.currentPage' :page-size='page.pageSize'></el-pagination>
      </el-row>
      <!-- 收藏素材 -->
      <el-tab-pane label="收藏" name="collect">
        <!-- 循环图片 -->
        <div class="imgList">
          <el-card class="card" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
          </el-card>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
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
        params: { collect: this.activeName === 'collect', per_page: this.page.pageSize, page: this.page.currentPage }
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
      }
    }
  }
}
</style>
