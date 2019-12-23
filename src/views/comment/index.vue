<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">评论列表</template>
    </bread-crumb>
    <el-table style="width: 100%" :data="list">
      <!-- 格式化内容 -->
      <el-table-column prop="title" label="标题" width="600"></el-table-column>
      <el-table-column :formatter="formatterBool" prop="comment_status" label="评论状态"></el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
      <!-- 文字按钮 -->
      <el-table-column label="操作">
        <template slot-scope="obj">
          <el-button type="text">修改</el-button>
          <el-button
            type="text"
            @click="openOnClose(obj.row)"
          >{{obj.row.comment_status ? '关闭评论':'打开评论'}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页效果 -->
    <el-row type="flex" justify="center" style="height:80px" align="middle">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="page.total"
        :page-size="page.pageSizes"
        :current-page="page.currentPage"
        @current-change='changePage'
      ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      page: {
        // 总页数
        total: 1000,
        // 一页有多少条评论
        pageSizes: 10,
        // 默认在第几页
        currentPage: 1

      }
    }
  },
  methods: {

    // 改变获取每页的内容

    changePage (newPage) {
      // 修改当前页码
      this.page.currentPage = newPage
      // 更新 每页的内容
      this.getComment()
    },

    getComment () {
      this.$axios({
        url: '/articles',
        params: {
          response_type: 'comment',
          page: this.page.currentPage,
          per_page: this.page.pageSizes }
      }).then(res => {
        // 获取评论表给data
        // console.log(res)
        this.list = res.data.results
        this.page.total = res.data.total_count
      })
    },
    // 定义一个布尔值的转化方法
    // 当前行数据 当前列属性 当前单元格值 当前下标
    formatterBool (row, column, cellValue, index) {
      return cellValue ? '打开' : '关闭'
    },

    openOnClose (row) {
      // 获取状态
      console.log(row)
      var mess = row.comment_status ? '关闭' : '打开'
      this.$confirm(`您是否要${mess}评论吗`).then(() => {
        // 调用接口
        // 地址参数
        console.log('aaa')

        this.$axios({
          url: '/comments/status',
          method: 'put',
          params: {
            article_id: row.id.toString()
          },
          data: {
            allow_comment: !row.comment_status
          }
        }).then(result => {
          console.log(result)

          // 打开或者关闭评论成功以后
          this.$message({
            type: 'success',
            message: '操作成功'
          })
          // 重新请求列表
          this.getComment()
        })
        // .catch(() => {
        //   this.$message({
        //     type: 'error',
        //     message: '操作失败'
        //   })
        // })
      })
    }
  },

  created () {
    this.getComment()
  }
}
</script>

<style>
</style>
