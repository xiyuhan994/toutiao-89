<template>
  <el-card>
      <bread-crumb slot="header">
            <template slot="title">发布文章</template>
      </bread-crumb>
      <el-form style="margin-left:50px" label-width='100px'>
          <el-form-item label='标题'>
              <el-input style="width:60%"></el-input>
          </el-form-item>
          <el-form-item label='内容'>
              <el-input type='textarea' :rows='4'></el-input>
          </el-form-item>
          <el-form-item label='封面'>
              <el-radio-group>
                  <el-radio>单图</el-radio>
                  <el-radio>三图</el-radio>
                  <el-radio>无图</el-radio>
                  <el-radio>自动</el-radio>
              </el-radio-group>
          </el-form-item>
          <el-form-item label='频道'>
              <el-select>
                  <!-- //label显示值 -->
                  <el-option v-for="item in channels" :key="item.id" :value="item.id" :label='item.name'></el-option>
              </el-select>
          </el-form-item>
          <el-form-item>
              <el-button type='primary'>发布</el-button>
              <el-button>进入草稿</el-button>
          </el-form-item>
      </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 定义一个channels接受频道
      channels: []
    }
  },
  methods: {
    // 获取频道
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

<style>

</style>
