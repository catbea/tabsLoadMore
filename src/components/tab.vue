<template>
<div class="demo">
  <LyTab
    v-model="selectedId"
    :items="items"
    :options="options"
    @change="handleChange">
  </LyTab>
  <!-- <h3>请选择移动端调试模式或者真机调试</h3>

    <h1>滑动模块</h1>     
  <slider :valueFun="valueFun" :min="0" :max="0"></slider> -->
  <div class="container"  ref="container">
    <div class="content">
      <ul>
        <li v-for="(item, index) in list" :key="index">{{item.name}}</li> 
      </ul>
      <div class="loading" v-show="loading">{{loadingTXT}}</div>
    </div>
  </div>
</div>
</template>

<script>
import slider from "./slider";
import BScroll from "better-scroll";

export default {
  name: 'Demo',
  data () {
    return {
      selectedId: 0,
      bottomSelectedId: 0,
      items: [
        {label: '首页'},
        {label: '推荐'},
        {label: 'Android'},
        {label: '前端'},
        {label: '后端'},
        {label: 'iOS'},
        {label: '产品'},
        {label: '人工智能'},
        {label: '设计'}
      ],
      options: {
        activeColor: '#1d98bd'
      },   
      tabItemName:"首页", 
      activeIndex:0, 
      list:[],
      loading:false,
      loadingTXT:"loading....",
      page:0,
    }
  },
  components:{
      slider
  },
  created(){
    this.createEl();
    // this.$refs.container.ontouchmvoe = (e)=>{
    //   console.log(e);

    // };
    this.loadMore();
  },
  methods: {
    handleChange (item, index) {
      console.log(item, index)
      this.tabItemName = item.label;
      this.list = [];
      this.page = 0;
      this.createEl();
    },
    createEl(){
      //异步请求数据代码可以写在此处
      let txt,arr=[];
      for(let i=0;i<26;i++){
        txt = {name:this.tabItemName+"-让我们荡起双江-"+i}
        this.list.push(txt);
      }
    },
    loadMore(){
      this.$nextTick(() => {
        if (!this.scroll) {
          console.log("loading....");
            this.scroll = new BScroll(this.$refs.container, {click:true,probeType:3,useTransition:false,scrollY:true,bindToWrapper:true});
            this.scroll.maxScrollY = -300;
            this.scroll.on('scrollEnd', (pos) => {
              this.loading = true;
              console.log("pos"+JSON.stringify(pos)+this.scroll.y+this.scroll.maxScrollY);
              if(this.page>3){
                this.loadingTXT = "到底了---"
                this.loading = true;
                return ;
              }
              if(this.scroll.y <= (this.scroll.maxScrollY + 50)&&this.loading) {                 
                  console.log("滚动加载数据");
                  this.createEl();     
                  this.loading = false;
                  this.page++;     
              }
            })
          } else {
              this.loading = false;
              this.scroll.refresh()
          }
      }); 

    }
  }
}
</script>

<style lang="less">
.demo{
  width: 100vw;
  height: 100vh;
  padding-top: 40px;
  .container{
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    .content{
      width: 100vw;
      padding-bottom: 40px;
      overflow: hidden;
    }
  }
}

</style>