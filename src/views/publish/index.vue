<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">发布文章</template>
    </bread-crumb>
    <!-- 表单 -->
    <el-form
      ref="publishForm"
      :model="formData"
      :rules="publishRules"
      style="margin-left:50px"
      label-width="100px"
    >
      <el-form-item prop="title" label="标题">
        <el-input v-model="formData.title" style="width:60%"></el-input>
      </el-form-item>
      <el-form-item prop="content" label="内容" >
       <quill-editor  v-model="formData.content" style="height:400px"></quill-editor>
      </el-form-item>
      <el-form-item prop="type" label="封面" style="margin-top:100px">
        <!-- 单选组 -->
        <el-radio-group v-model="formData.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- //放置一个封面图片 -->
      <cover-img :list='formData.cover.images'> </cover-img>

      <el-form-item prop="channel_id" label="频道">
        <el-select v-model="formData.channel_id">
          <!-- //label显示值 -->
          <el-option v-for="item in channels" :key="item.id" :value="item.id" :label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <!-- 因为有默认参数 所有要加（）就是undifiend 就是flase -->
        <el-button @click="publishArtcile()" type="primary">发布</el-button>
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
  // 监视 router 原来的组件会被复用
  // watch 指向对象实例
  watch: {
    $route: function (to, from) {
    // to里又params
      // console.log(to)
      // console.log(from)
      if (Object.keys(to.params).length) {
      // 有参数修改
        this.getArticleByid(to.params.articleId)
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
    },
    'formData.cover.type': function () {
      if (this.formData.cover.type === 0 || this.formData.cover.type === -1) {
        this.formData.cover.images = []
      } else if (this.formData.cover.type === 1) { // 单图
        this.formData.cover.images = ['']
      } else if (this.formData.cover.type === 3) { // 三图
        this.formData.cover.images = ['', '', '']
      }
    }
  },
  methods: {

    // 获取文章详情通过id
    getArticleByid (articleId) {
      this.$axios({
        url: `/articles/${articleId}`
      }).then((res) => {
        this.formData = res.data
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
    // 发布文章
    publishArtcile (draft) {
      this.$refs.publishForm.validate((isOk) => {
        if (isOk) {
          // 发布接口调用
        //   console.log('校验成功')

          // 判断是否存在id
          let { articleId } = this.$route.params

          // 判断是否有articleId
          this.$axios({
            url: articleId ? `/articles/${articleId}` : '/articles',
            method: articleId ? 'put' : 'post',
            params: { draft },
            data: this.formData
          }).then(res => {
            this.$router.push('/home/articles')
          })

        //   if (articleId) {
        //     // 存在id时 就修改数据
        //     this.$axios({
        //       url: `/articles/${articleId}`,
        //       method: 'put',
        //       params: { draft },
        //       data: this.formData
        //     }).then(res => {
        //       this.$router.push('/home/articles')
        //     })
        //   } else {
        //     // 否则 重新发布
        //     this.$axios({
        //       url: '/articles',
        //       method: 'post',
        //       params: { draft }, // query参数
        //       data: this.formData
        //     }).then(() => {
        //     // 新增成功 回到内容列表
        //       this.$router.push('/home/articles')
        //     })
        //   }
        }
      })
    }
  },
  created () {
    // 获取频道数据
    this.getChannels()
    // 获取id 判断有无id 有的话是修改
    let { articleId } = this.$route.params
    // 获取文章数据
    // 逻辑运算符 前面为真后面就为真 如果前面存在id 后面就执行 如果不存在 后面就不执行
    articleId && this.getArticleByid(articleId)
  }
}
</script>

<style scoped>

</style>
