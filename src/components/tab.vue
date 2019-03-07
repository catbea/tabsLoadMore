<template>
<div class="demo">
  <LyTab
    v-model="selectedId"
    :items="items"
    :options="options"
    @change="handleChange">
  </LyTab>
  <div class="container"  ref="container">
    <div class="content">
      <ul>
        <li v-for="(item, index) in list" :key="index" v-html="item.name"></li> 
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
      isClickTab:false,
    }
  },
  components:{
      slider
  },
  created(){
    this.createEl();
  },
  mounted(){
    this.loadMore();    
  },
  methods: {
    async handleChange (item, index) {
      this.isClickTab = true;
      this.scroll.refresh();
      this.scroll.maxScrollY = -300;
      this.loadingTXT = "loading....";
      this.tabItemName = item.label;
      this.list = [];
      this.page = 0;
      await this.createEl();
      this.loadMore();
    },
    createEl(){
      //异步请求数据代码可以写在此处
      let txt,arr=[];
      for(let i=0;i<10;i++){
        txt = {name:"<p>"+this.tabItemName+"一起开心撸代码</p><p>——页数："+this.page+"</p>"}
        arr.push(txt)
      }
      Array.prototype.push.apply(this.list,arr);
    },
    loadMore(){
      this.$nextTick(() => {
        if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.container, {click:true,probeType:3,useTransition:false,scrollY:true,bindToWrapper:true,HWCompositing: true});
            this.scroll.maxScrollY = -300;
            this.scroll.on('scrollEnd', (pos) => {
              this.loading = true;
              if(this.isClickTab){
                this.scroll.maxScrollY = -300;
              }
              this.isClickTab = false;
              if(this.page>5){
                this.loadingTXT = "到底了---"
                this.loading = true;
                return ;
              }
              if(this.scroll.y <= (this.scroll.maxScrollY + 50)&&this.loading) {                 
                  console.log("滚动加载数据");
                  this.page++;    
                  this.createEl();     
                  this.loading = false;
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
  .container{
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    .content{
      width: 100vw;
      padding-bottom: 50px;
      overflow: hidden;
      ul{
        li{
          font-size: 30px;
        }
      }
    }
  }
}

</style>