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
        <el-radio-group v-model="formData.status">
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
        <el-select v-model="formData.channelId" placeholder="请选择">
            <!-- value是存储值 lable是名字 -->
          <el-option v-for="item in channels" :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
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

    <!--显示内容-->
    <el-row class="count" >
      <span>共找到1000条符合条件的内容</span>
    </el-row>

    <el-row v-for="item in 100" :key='item.id' class="content" type='flex' justify='space-between'>

      <!-- 左边部分 -->
      <el-col  :span='12'>
        <el-row type='flex'>
          <img class="picture" src="../../assets/img/header.jpg" alt="">
          <div class="info">
              <span>我是黑马</span>
              <el-tag style="width:60px">已发表</el-tag>
              <span class="date">2019-12-24 22.26.59</span>
          </div>
        </el-row>
      </el-col>

      <!-- 右边部分 -->
      <el-col :span='4'>
        <el-row type='flex' justify='end'>
            <span class="del">
            <i class="el-icon-edit"></i>
            修改</span>
            <span class="del">
              <i class="el-icon-delete"></i>
              删除</span>
        </el-row>
      </el-col>
    </el-row>

  </el-card>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        status: 5,
        channelId: null,
        dateRange: []
      },
      // 定义一个空数组
      channels: []
    }
  },
  methods: {
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        // console.log(res.data.channels)
        this.channels = res.data.channels
      })
    }
  },
  created () {
    this.getChannels()
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
      flex-direction:column;
      justify-content: space-between;

      .date {
        color: #999;
        font-size: 12px
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

}
</style>
