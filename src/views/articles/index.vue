<template>
  <el-card class="articles">
    <bread-crumb slot="header">
      <template slot="title">文章列表</template>
    </bread-crumb>

    <!-- 文章状态 -->
    <el-row class="searchTTool">
      <el-col :span="2">
        <span>文章状态：</span>
      </el-col>

      <el-col :span="18">
        <!-- {{formData.status}} -->
        <el-radio-group @change="chageCondition" v-model="formData.status">
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>

    <!-- 频道列表 -->
    <el-row class="searchTTool">
      <el-col :span="2">
        <span>频道选择：</span>
      </el-col>

      <el-col :span="18">
        <el-select @change="chageCondition" v-model="formData.channelId" placeholder="请选择">
          <!-- value是存储值 lable是名字 -->
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-col>
    </el-row>

    <!-- 时间选择 -->
    <el-row class="searchTTool">
      <el-col :span="2">
        <span>时间选择：</span>
      </el-col>

      <el-col :span="18">
        <div class="block">
          <el-date-picker
            @change="chageCondition"
            value-format="yyyy-MM-dd"
            v-model="formData.dateRange"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
          <!-- {{value}} -->
        </div>
      </el-col>
    </el-row>
    <!-- {{this.formData.dateRange}} -->

    <!--显示内容-->
    <el-row class="count">
      <span>共找到{{page.total}}条符合条件的内容</span>
    </el-row>

    <el-row
      v-for="item in list"
      :key="item.id.toString()"
      class="content"
      type="flex"
      justify="space-between"
    >
      <!-- 左边部分 -->
      <el-col :span="12">
        <el-row type="flex">
          <img
            class="picture"
            :src="item.cover.images.length ? item.cover.images[0] : defaultImg"
            alt
          />
          <div class="info">
            <span>{{item.title}}</span>
            <!-- 过滤器可以在差值表达式中使用 还有v-bind -->
            <el-tag
              :type="item.status | filterType"
              style="width:60px"
            >{{item.status | filterStatus}}</el-tag>
            <span class="date">{{item.pubdate}}</span>
          </div>
        </el-row>
      </el-col>

      <!-- 右边部分 -->
      <el-col :span="4">
        <el-row type="flex" justify="end">
          <span class="del">
            <i class="el-icon-edit"></i>
            修改
          </span>
          <span @click="delArticle(item.id)" class="del">
            <i class="el-icon-delete"></i>
            删除
          </span>
        </el-row>
      </el-col>
    </el-row>

    <!-- 分页效果 -->
    <el-row class="page" type='flex' justify='center' align='middle'>
        <el-pagination background layout="prev, pager, next"
        @current-change='changePage'
        :total="page.total"
        :current-page="page.currentPage"
        :page-size="page.pageSize"
        ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        // 状态默认选中
        status: 5,
        channelId: null,
        dateRange: []
      },
      // 定义一个空数组
      channels: [],
      list: [],
      defaultImg: require('../../assets/img/header.jpg'),
      // 分页
      page: {
        total: 0,
        // 默认第几页
        currentPage: 1,
        // 一页几条数据
        pageSize: 10
      }
    }
  },

  filters: {
    // 过滤器
    filterStatus (value) {
      // vaule是过滤器前面表达式计算得到的值
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'

        default:
          break
      }
    },
    filterType (value) {
      // vaule是过滤器前面表达式计算得到的值
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return ''
        case 3:
          return 'danger'

        default:
          break
      }
    }
  },

  methods: {

    // 删除评论
    delArticle (id) {
      this.$confirm('您确定要删除吗').then(() => {
        this.$axios({
          url: `/articles/${id.toString()}`,
          method: 'delete'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除文章成功'
          })
          // 重新调用
          this.getConditionArticle()
        })
      })
    },

    // 改变页码事件
    changePage (newPage) {
      // 赋值
      this.page.currentPage = newPage
      this.getConditionArticle()
    },

    // 改变条件
    chageCondition () {
      // 强制将当前的页码回到第一页
      this.page.currentPage = 1

      // 组装条件
      // 最新状态
      // alert(this.formData.status)

      // 更新
      this.getConditionArticle()
    },

    // 获取文章列表
    getArticles (params) {
      this.$axios({
        url: '/articles',
        params // es6写法
      }).then(res => {
        this.list = res.data.results
        // 文章总数
        this.page.total = res.data.total_count
      })
    },

    // 获取频道
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        // console.log(res.data.channels)
        this.channels = res.data.channels
      })
    },

    getConditionArticle () {
      let params = {
        // 切换条件默认回到第一页
        page: this.page.currentPage,
        per_page: this.page.pageSize,
        status: this.formData.status === 5 ? null : this.formData.status,
        channel_id: this.formData.channelId,
        begin_pubdate: this.formData.dateRange.length
          ? this.formData.dateRange[0]
          : null,
        end_pubdate:
          this.formData.dateRange.length > 1 ? this.formData.dateRange[1] : null
      }
      this.getArticles(params)
    }
  },
  created () {
    this.getChannels()
    // 获取文章列表
    this.getArticles()

    this.chageCondition()

    this.changePage()
  }
}
</script>

<style lang='less' scoped>
.articles {
  .searchTTool {
    height: 60px;
    padding-left: 50px;
  }
  .count {
    height: 60px;
    margin: 20px 0;
    border-bottom: 1px dashed #ccc;
  }

  .content {
    margin-bottom: 20px;
    border-bottom: 1px solid #f2f3f5;
    padding: 20px 0;
    .picture {
      height: 100px;
      width: 150px;
    }
    .info {
      margin-left: 20px;
      height: 100px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .date {
        color: #999;
        font-size: 12px;
      }
    }
  }
  .del {
    margin-left: 5px;
    font-size: 13px;
    i {
      margin-left: 30px;
    }
  }

  .page {
    height: 50px
  }
}
</style>
