<template>
    <div class="app-container">
        <el-form ref="form" label-width="180px">
            <el-form-item label="销售昵称：">
                <el-col>{{form.nick}}</el-col>
            </el-form-item>
            <el-form-item label="销售ID：">
                <el-col>{{form.id}}</el-col>
            </el-form-item>
            <el-form-item label="专属链接：">
                <el-col>{{form.link}}</el-col>
            </el-form-item>
            <el-form-item label="专属二维码：">
                <el-card :body-style="{ padding: '0px' }"> 
                    <!-- <img src="../../assets/code.png" class="image" alt=""> -->
                    <qrcode-vue :value="value" :size="size" level="H"></qrcode-vue>
                    <!-- 用于生成二维码容器 -->
                </el-card>
            </el-form-item>
            <el-form-item class="el-button-edit">
                <el-button type="success" @click="toCancel">完成</el-button>
                <el-button
                  type="primary"
                  v-clipboard:copy="message"
                  v-clipboard:success="onCopy"
                  v-clipboard:error="onError">复制信息</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
// 二维码插件
import QrcodeVue from 'qrcode.vue'

export default {
  data() {
    return {
      form: {
        nick: '',
        id: '',
        link: 'http://cloud.hujia168.com/#/invitationNotInput?serviceCode=' + this.$route.query.serviceCode
      },
      // 二维码属性设置
      value: 'http://cloud.hujia168.com/#/invitationNotInput?serviceCode=' + this.$route.query.serviceCode,
      size: 150,
      // 复制内容
      message: ''
    }
  },
  components: {
    QrcodeVue
  },
  created() {
    this.$nextTick(function() {
      this.init()
    })
  },
  methods: {
    // 数据初始化
    init() {
      this.form.nick = this.$route.query.realName
      this.form.id = this.$route.query.serviceCode
      this.message = '销售昵称：' + this.form.nick + '\n销售ID：' + this.form.id + '\n专属链接：' + this.form.link
      // this.qrcode()
    },
    // 取消按钮
    toCancel() {
      this.$router.push({ path: '/sales/seller' })
    },
    // 复制信息到粘贴板
    onCopy: function(e) {
      // console.log(e.text)
    },
    onError: function(e) {
      // alert('failed')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-container{
	padding: 20px;
	.el-breadcrumb{
		padding: 10px;
		margin-bottom: 20px;
	}
	.el-form{
		margin: 20px 25%;
		padding: 40px;
		border: 1px solid #eee;
		-moz-box-shadow: 2px 2px 5px #ccc;
		-webkit-box-shadow: 2px 2px 5px #ccc;
		box-shadow: 2px 2px 5px #ccc;
		.el-form-item{
			margin-bottom: 10px;
			.el-form-item__content{
				line-height: 30px;
				.el-card{
					width: 155px;
					height: 155px;
					.el-card__body{
						display: flex;
						display: -webkit-flex;
						align-items: center;
						justify-content: center;
					}
				}
			}
		}
		.el-button-edit{
			text-align: center;
		}
	}
}
</style>

