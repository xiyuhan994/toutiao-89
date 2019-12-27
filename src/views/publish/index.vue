<template>
  <el-card>
      <bread-crumb slot="header">
            <template slot="title">发布文章</template>
      </bread-crumb>
      <!-- 表单 -->
      <el-form ref="publishForm" :model='formData' :rules='publishRules' style="margin-left:50px" label-width='100px'>
          <el-form-item prop='title' label='标题'>
              <el-input v-model="formData.title" style="width:60%"></el-input>
          </el-form-item>
          <el-form-item prop='content' label='内容'>
              <el-input v-model="formData.content" type='textarea' :rows='4'></el-input>
          </el-form-item>
          <el-form-item prop='type' label='封面'>
              <!-- 单选组 -->
              <el-radio-group v-model="formData.cover.type">
                  <el-radio :label="1">单图</el-radio>
                  <el-radio :label="3">三图</el-radio>
                  <el-radio :label="0">无图</el-radio>
                  <el-radio :label="-1">自动</el-radio>
              </el-radio-group>
          </el-form-item>
          <el-form-item prop='channel_id' label='频道'>
              <el-select v-model="formData.channel_id">
                  <!-- //label显示值 -->
                  <el-option v-for="item in channels" :key="item.id" :value="item.id" :label="item.name"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item>
              <!-- 因为有默认参数 所有要加（）就是undifiend 就是flase -->
              <el-button @click="publishArtcile()" type='primary'>发布</el-button>
                <!-- true为草稿模式 -->
              <el-button @click="publishArtcile(true)">进入草稿</el-button>
          </el-form-item>
      </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 定义一个channels接受频道
      channels: [],
      formData: {
        title: '', // 标题
        content: '', // 内容
        cover: {
          images: [], // 存图片
          type: 0
        },
        channel_id: null // 频道id

      },
      publishRules: {
        // 校验规则
        title: [{ required: true, message: '标题内容不能为空' }, {
          // 最小是字符串时长度与最大的值的长度 如果是number内容是数值对于
          min: 5, max: 30, message: '标题长度需要在5-30中间'
        }],
        content: [{ required: true, message: '文章内容不能为空' }],
        channel_id: [{ required: true, message: '频道分类部门不能为空' }]

      }
    }
  },
  // 监视 router
  // watch 指向对象实例
  watch: {
    $route: function (to, from) {
    // to里又params
      console.log(to)
      console.log(from)
      if (Object.keys(to.params).length) {
      // 有参数修改
      } else {
      // 没有参数是原始
        this.formData = this.formData = {
          title: '', // 标题
          content: '', // 内容
          cover: {
            images: [], // 存图片
            type: 0 // 封面类型
          }
        }
      }
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
    },
    // 发布文章
    publishArtcile (draft) {
      this.$refs.publishForm.validate((isOk) => {
        if (isOk) {
          // 发布接口调用
        //   console.log('校验成功')
          this.$axios({
            url: '/articles',
            method: 'post',
            params: { draft }, // query参数
            data: this.formData
          }).then(() => {
            // 新增成功 回到内容列表
            this.$router.push('/home/articles')
          })
        }
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
