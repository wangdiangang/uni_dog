<template>
  <div>
    <span class="span"> * 仅供娱乐使用</span>
    <h3>申论生成器</h3>
    <div class="header">
      <div class="header_input">
        <span>主题:</span>
        <input type="text" v-model.trim="value" :placeholder="placeholder" />
      </div>
      <div class="create_num">
        <span>字数:</span>
        <uni-number-box
          class="num_box"
          :value="essayNum"
		  @change="changeNum"
          :step="100"
          max="3000"
          background="rgb(64, 192, 87)"
          color="#fff"
        />
      </div>
    </div>
    <button @click="create" class="btn">生成</button>
    <div class="line"></div>
	<span style="font-size: 20rpx;color: red;">* 偶尔有时候不能用，不知道为啥，也不想解决了。。。</span>
    <div class="content">
      <h1 class="title">{{ bodyContent.title }}</h1>
      <p class="begin">{{ bodyContent.begin }}</p>
      <p class="body">{{ bodyContent.body }}</p>
      <p class="end">{{ bodyContent.end }}</p>
    </div>
    <button @click="fuzhi" id="fuzhi" v-show="bodyContent.body">
      复制内容
    </button>
	<view>
			<!-- 提示信息弹窗 -->
			<uni-popup ref="message" type="message">
				<uni-popup-message type="error" :message="errorMsg" :duration="2000"></uni-popup-message>
			</uni-popup>
		</view>
    <!-- <rich-text :nodes="content" class="content"></rich-text> -->
  </div>
</template>
<script>
import data from "./data.json";
const get_random_num = (total) => Math.floor(Math.random() * total);
const get_random = (arr) => arr[get_random_num(arr.length)];
const get_title = (_) => get_random(data["title"]);
const get_noun = (_) => get_random(data["noun"]);
const get_verb = (_) => get_random(data["verb"]);
const get_adverb = (type) => get_random(data["adverb_" + type]);
const get_phrase = (_) => get_random(data["phrase"]);
const get_sentence = (_) => get_random(data["sentence"]);
const get_parallel_sentence = (_) => get_random(data["parallel_sentence"]);
const get_beginning = (_) => get_random(data["beginning"]);
const get_body = (_) => get_random(data["body"]);
const get_ending = (_) => get_random(data["ending"]);
const replace_key = (str, key, theme) =>
  str.replace(new RegExp(key, "g"), theme);
const replace_xx = (str, theme) => replace_key(str, "xx", theme);
const replace_vn = (str) =>
  replace_key(str, /vn/g, (_) => {
    const vns = new Array(get_random_num(4) + 1);
    return vns
      .fill(0)
      .map((_) => get_verb() + get_noun())
      .join("，");
  });
const replace_v = (str) => replace_key(str, "v", get_verb);
const replace_n = (str) => replace_key(str, "n", get_noun);
const replace_ss = (str) => replace_key(str, "ss", get_sentence);
const replace_sp = (str) => replace_key(str, "sp", get_parallel_sentence);
const replace_p = (str) => replace_key(str, "p", get_phrase);

const replace_all = (str, theme) => {
  str = replace_vn(str);
  str = replace_v(str);
  str = replace_n(str);
  str = replace_ss(str);
  str = replace_sp(str);
  str = replace_p(str);
  str = replace_xx(str, theme);
  return str;
};

const slscq = (theme, essay_num) => {
    console.log('essay_num',essay_num)
  const begin_num = essay_num * 0.15; //开头字数
  const body_num = essay_num * 0.7; // 主题
  const end_num = begin_num; //结尾字数相同

  let title = replace_all(get_title(), theme);
  let begin = ""; // "&nbsp;&nbsp;&nbsp;&nbsp;";
  let body = ""; //&nbsp;&nbsp;&nbsp;&nbsp;";
  let end = ""; //&nbsp;&nbsp;&nbsp;&nbsp;";

  while (begin.length < begin_num) {
    begin += replace_all(get_beginning(), theme);
  }

  while (body.length < body_num) {
    body += replace_all(get_body(), theme);
  }

  while (end.length < end_num) {
    end += replace_all(get_ending(), theme);
  }

  // if(!CNZ[theme+essay_num]){
  //     CNZ[theme+essay_num] = 1;
  //     !window._czc||_czc.push(["_trackEvent", "申论","生成",theme,essay_num,"生成"]);
  // }
  return {
    title,
    begin,
    body,
    end,
  };
  return `<h1>${title}</h1>\n<p>${begin}</p>\n<p>${body}</p>\n<p>${end}</p>`;
};

const CNZ = {};
export default {
  data() {
    return {
      value: "",
      placeholder: "年轻人买什么房",
      essayNum: 500,
		errorMsg:'',
      bodyContent: {
        title: "",
        begin: "",
        body: "",
        end: "",
		loading:false
      },
    };
  },
  onLoad() {
	  uni.showShareMenu({
	    menus: ["shareAppMessage", "shareTimeline"],
	  }); //可分享
    this.create(this.value || this.placeholder, this.essayNum);
  },
  methods: {
	  changeNum(val){
		  this.essayNum=val
	  },
    create() {
		if(!this.loading){
			uni.showLoading({
			   title: '文本生成中...'
			 });
			 this.loading=true	
			}
		
			uni.getStorage({
				key:'openid',
				success:res=>{
					console.log('storage',res);
					let openid=res.data.openid
					uni.getStorage({
						key:"token",
						success:res=>{
							let token=res.data.token
							uniCloud.callFunction({
							    name: 'msgSecCheck_2',
							    data: {
									content:this.value.slice(0,50)||this.placeholder,
									openid,
									access_token:token
								}
							  }).then(res=>{
								  console.log('res咋样了',res);
								  if(res.result.data.result.label==100){
									 this.bodyContent = slscq(this.value || this.placeholder, this.essayNum);
								  }else{
									 this.errorMsg=`${this.value}涉及到敏感词汇`
									 this.$refs.message.open() 
								  }
								  if(this.loading){
									  this.loading=false
									  uni.hideLoading();
								  }
								  
							  }).catch(err=>{
								  if(this.loading){
								  	this.loading=false
								  	uni.hideLoading();
								  }
							  })
						}
					})
				
				  }})
    },
    fuzhi() {
      let { title, begin, body, end } = this.bodyContent;

      uni.setClipboardData({
        data: title + "," + begin + "," + body + "," + end,
        success: function () {
          console.log("success");
        },
      });
    },
  },
};
</script>
<style scoped>
h3{
    text-align: center;
    font-size: 80rpx;
    margin-top: 10rpx;
    color: #00ff2d;
}
.span{
    color: rgb(243, 25, 25);
    font-size: 20rpx;
}
.num_box {
  font-size: 100rpx;
}
/deep/.uni-numbox .uni-numbox-btns,
/deep/.uni-numbox .uni-numbox__value {
  width: 80rpx;
  height: 80rpx;
  padding: 0;
}
/deep/.uni-numbox .uni-numbox__value {
  width: 100rpx;
}
.header {
  margin: 40rpx 0 0 20rpx;
}
.header .header_input,
.header .create_num {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 50rpx;
}
.header .header_input input {
  width: 500rpx;
  height: 100rpx;
  border: 1rpx solid #ccc;
  border-radius: 20rpx;
  font-size: 46rpx;
  padding: 0 20rpx;
  margin: 0 20rpx;
}
.create_num {
  margin-top: 40rpx;
  margin-bottom: 40rpx;
}
.create_num .num_box {
  margin-left: 20rpx;
}


.line {
  width: 96%;
  border: 0.5rpx solid #f9f3f3;
  margin: 40rpx 2% 40rpx 2%;
}
.content {
  padding: 20rpx;
  margin: 20rpx;
}
.content h1 {
  font-size: 40rpx;
  line-height: 60rpx;
  text-align: center;
}
.content p {
  text-indent: 2em;
  font-size: 34rpx;
  line-height: 56rpx;
}
#fuzhi {
  --width: 300rpx;
  --timing: 2s;
  border: 0;
  width: var(--width);
  color: #fff;
  font-weight: bold;
  font-size: 1em;
  background: rgb(64, 192, 87);
  transition: all 4s;
  border-radius: 30rpx;
  margin-right: 54rpx;
  margin-bottom: 60rpx;
}
</style>