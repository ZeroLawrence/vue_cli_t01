<template>
    <div class="row">
        <div class="card" 
        v-for="user in info.userList" 
        :key="user.login"
        v-show="info.userList.length">
            <a :href="user.html_url" target="_blank">
            <img :src="user.avatar_url" style='width: 100px'/>
            </a>
            <p class="card-text">{{user.login}}</p>
        </div>
        <h1 v-show="info.isFirst">欢迎使用！</h1>
        <h1 v-show="info.isLodling">正在加载.......</h1>
        <h1 v-show="info.errmsg">{{info.errmsg}}</h1>
    </div>
</template>

<script>
export default {
    name:'list',
    data() {
        return {
            info:{
                isFirst:true,
                isLodling:false,
                userList:[],
                errmsg:''
            }
        }
    },
    mounted() {
        this.$bus.$on('getData',(users)=>{
            this.info={...this.info,...users}
            //console.log("我是list我收到了数据"+users)
        })
    },
    
}
</script>

<style scoped>
    .album {
    min-height: 50rem; /* Can be removed; just added for demo purposes */
    padding-top: 3rem;
    padding-bottom: 3rem;
    background-color: #f7f7f7;
    }

    .card {
    float: left;
    width: 33.333%;
    padding: .75rem;
    margin-bottom: 2rem;
    border: 1px solid #efefef;
    text-align: center;
    }

    .card > img {
    margin-bottom: .75rem;
    border-radius: 100px;
    }

    .card-text {
    font-size: 85%;
    }
</style>