<template>
    <section class="jumbotron">
        <h3 class="jumbotron-heading">搜索GitHub上的用户</h3>
        <div>
            <input type="text" 
            placeholder="请输入需要查询的用户名"
            v-model="username"/>&nbsp;<button @click="searchUser">搜索</button>
        </div>
    </section>
</template>

<script>
import axios from 'axios'
export default {
    name:'search',
    data() {
        return {
            username:""
        }
    },
    computed:{
        searchUrl(){
            return "https://api.github.com/search/users?q="+this.username;
        }
    },
    methods: {
        searchUser(){
            this.$bus.$emit('getData',{isFirst:false,isLodling:true,userList:[],errmsg:''})
            axios.get(this.searchUrl).then(
            res=>{
                //console.log(res.data.items)
                this.$bus.$emit('getData',{isLodling:false,userList:res.data.items,errmsg:''})
            },
            req=>{
                //console.log(req.message)
                this.$bus.$emit('getData',{isLodling:false,userList:[],errmsg:req.message})
            })
        }
    },
}
</script>

<style>

</style>