<template>
    <div class="app-container">
        <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/goods' }">商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>上传商品</el-breadcrumb-item>
        </el-breadcrumb> -->
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item>
                <el-col>
                    商品类型：
                    <el-radio v-model="radio" label="1">网络课程</el-radio>
                    <el-radio v-model="radio" label="2">教辅资料</el-radio>
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-col>
                    商品名称：
                    <el-input type="text" class="el-input-name"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="">
                <el-col :span="12">
                    商品金额：
                    <el-input type="text" class="el-input-name"></el-input>
                </el-col>
                <el-col :span="12">
                    邮费：
                    <el-input type="text" class="el-input-name"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-col :offset="3">
                    <el-radio v-model="radio" label="3">是否支持护盾</el-radio>
                    <el-input-number v-model="num1" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
                </el-col>
                <el-col :offset="3">
                    <el-radio v-model="radio" label="4">是否支持护士帽</el-radio>
                    <el-input-number v-model="num1" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-col>
                    分期设置：
                    <el-radio v-model="radio" label="5">否</el-radio>
                </el-col>
                <el-col :span="2" style="margin-left: 75px">
                    <el-radio v-model="radio" label="6">是</el-radio>
                </el-col>
                <el-col :span="19">
                    <el-radio v-model="radio" label="6-1" class="el-radio-pay">六期：</el-radio>
                    首付：<el-input type="text" class="el-input-pay"></el-input> 元
                    每期：<el-input type="text" class="el-input-pay"></el-input> 元
                </el-col>
                <el-col :span="19" style="margin-left: 130px">
                    <el-radio v-model="radio" label="6-2" class="el-radio-pay">十二期：</el-radio>
                    首付：<el-input type="text" class="el-input-pay"></el-input> 元
                    每期：<el-input type="text" class="el-input-pay"></el-input> 元
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-col>
                    商品权限：
                    <el-tag
                        v-for="tag in tags"
                        :key="tag.name"
                        closable
                        :type="tag.type">
                        {{tag.name}}
                    </el-tag>
                    <span @click="showTransfer" style="color:blue;cursor:pointer">点击继续添加</span>
                </el-col>
            </el-form-item>
            <el-form-item>
                <!-- 商品轮播图最多五张 -->
                <el-col style="float:left">商品轮播图：</el-col>
                <div style="margin-left:80px;width:100%">
                    <el-col :span="10" v-for="i in 3" :key="i">
                    <el-card class="el-card-list" :body-style="{ height:'calc(100% - 40px)' }">
                        <span class="close">&times;</span>
                        <img src='../../assets/logo/logo_index.png' alt="">
                    </el-card>
                </el-col>
                </div>
                <el-col :span="10">
                    <el-card class="el-card-add">
                        点击添加
                    </el-card>
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-col style="float:left">商品详情图：</el-col>
                <el-col :span="11" :offset="3">
                    <el-card class="el-card-add">
                        点击添加
                    </el-card>
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-col>
                    商品描述：
                    <el-input type="textarea" v-model="form.address"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-col>
                    上线时间： 
                    <el-radio v-model="radio" label="7">立即上线</el-radio>
                    <el-radio v-model="radio" label="8">预约上线</el-radio>
                </el-col>
            </el-form-item>
            <el-form-item class="el-button-edit">
                <el-button type="danger">取消</el-button>
                <el-button type="success">确定修改</el-button>
            </el-form-item>
        </el-form>
        <el-row v-if="show" class="edit-transfer" ref="transfer">
            <div class="transfer-body">
                <div style="background:#fff;padding:10px;width:80%;margin-left:10%">
                    <div class="transfer-title">商品权限选择</div>
                <el-transfer 
                    v-model="value1" 
                    :data="data"
                    :titles="['选择权限', '已选择权限']"
                    @change="change">
                </el-transfer>
                <div class="transfer-bottom">
                    <el-button type="danger" @click="showTransfer">取消</el-button>
                    <el-button type="primary">确定</el-button>
                </div>
                </div>
            </div>
        </el-row>
    </div>
</template>

<script>
export default {
  data() {
    /* eslint-disable */
    // 穿梭框
    const generateData = _ => {
      const data = []
      const dataList = ['精讲视频','串讲视频','试题串讲','模拟考试','大统考','金券','押题考试','掌上宝']
      for (let i  = 0; i < dataList.length; i++) {
        data.push({
          key: i,
          label: dataList[i]
        })
      }
      return data
    }
    return {
      form: {
        name: '',
        tel: '',
        num: '',
        address: '',
        msg: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      // 权限标签
      tags: [
        { name: '标签一', type: '' },
        { name: '标签二', type: 'success' }
      ],
      radio: '',
      num1: '',
      // 穿梭框
      data: generateData(),
      value1: [],
      // 穿梭框显示
      show: 0,
      // 监听屏幕高度
      fullHeight: document.documentElement.clientHeight,
      //轮播图
      cardList:['../../assets/logo/logo_index.png','../../assets/logo/logo_index.png','../../assets/logo/logo_index.png']
    }
  },
  mounted() {
      const that = this
      that.$nextTick(function () {
        let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
      })
  },
  methods: {
    // 申请退款
    toRefunds() {
      this.$router.push({ path: '/orders/refunds' })
    },

    // 计数器
    handleChange(value) {
    //   console.log(value)
    },

    // 穿梭框
    showTransfer() {
      this.show = !this.show;
    },

    // 获取穿梭框发生变化时的值
    change(value, direction, movedKeys) {
    //    console.log(value, direction, movedKeys);
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
		margin: 20px auto;
		max-width: 70%;
		padding: 40px;
		border: 1px solid #eee;
		-moz-box-shadow: 2px 2px 5px #ccc;
		-webkit-box-shadow: 2px 2px 5px #ccc;
		box-shadow: 2px 2px 5px #ccc;
		.el-form-item{
			margin-bottom: 0;
			.el-form-item__content{
				line-height: 30px;
				.el-col{
					margin-bottom: 10px;
					.el-radio{
						width: 150px;
					}
					.el-radio-pay{
						width: 80px;
					}
					.el-input-number{
						width: 120px;
					}
					.el-input-pay{
						width: 20%;
					}
					.el-input-name{
						width: calc(100% - 80px);
					}
					.el-tag{
						margin-right: 10px;
					}
					.el-textarea{
						width: 85%;
					}
					.el-card{
						height: 300px;
					}
					.el-card-add{
						text-align: center;
						font-size: 24px;
						line-height: 300px;
						margin-left: 5px;
					}
					.el-card-list{
						margin-right: 5px;
						.el-card__body{
							.close{
								font-size: 24px;
								float: right;
								border: 1px solid #eee;
								border-radius: 50%;
								width: 30px;
								height: 30px;
								line-height: 25px;
								text-align: center;
								color: #666;
							}
							img{
								height: 100%;
								width: 100%;
							}
						}
					}
				}
			}
		}
		.el-button-edit{
			text-align: center;
		}
  }
	.edit-transfer{
		position: absolute;
		z-index: 2222;
		top: 0;
		left: 0;
		width: 100%;
		min-height: 100%;
		overflow: hidden;
		.transfer-body{
			border-radius: 5px;
			width: 70%;
			height: auto;
			padding: 40px 0;
			background: rgba(0,0,0,.5);
			margin-left: 20%;
			margin-top: 200px;
			.transfer-title{
				line-height: 40px;
				height: 60px;
				font-size: 18px;
				text-align: center;
			}
			.el-transfer{
				width: 60%;
				margin-left: 20%;
			}
			.transfer-bottom{
				height: 80px;
				line-height: 100px;
				text-align: center;
			}
		}
	}
}
.hide{
  display: none;
}
</style>

