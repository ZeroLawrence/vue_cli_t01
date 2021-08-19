<template>
    <div class="todo-container">
        <div class="todo-wrap">
            <Top @addtodo="addtodo"/>
            <List :todolists="todolists"/>
            <Down :todolists="todolists" @changetodos="changetodos" @deletetodos="deletetodos"/>
        </div>
    </div>
</template>

<script>
import Top from './components/Top.vue';
import List from './components/List.vue';
import Down from './components/Down.vue';
export default {
    name:'App',
    data() {
        return {
            todolists:JSON.parse(localStorage.getItem('todos'))||[],
            num:0
        }
    },
    components: { 
        Top,
        List,
        Down
    },
    methods: {
        //单条勾选
        changetodo(id){
            this.todolists.forEach(todo => {
                if(todo.id===id){
                    todo.done=!todo.done
                }
            });
        },
        //添加
        addtodo(todoobj){
            this.todolists.unshift(todoobj);
        },
        //逐条删除
        deletetodo(id){
            this.todolists=this.todolists.filter((todo)=>{
                return todo.id!==id
            })
            
        },
        //多条勾选
        changetodos(isall){
            this.todolists.forEach((todo)=>{
                todo.done=isall;
            })
        },
        //多条删除
        deletetodos(){
            this.todolists.forEach(()=>{
                this.todolists=this.todolists.filter((todo)=>{
                    return !todo.done
                })
            })
        },
        changemsg(id,todomsg){
            this.todolists.forEach((todo)=>{
                if(todo.id===id){
                    todo.msg=todomsg
                }
            })
        }
    },
    mounted() {
        this.$bus.$on('changetodo',this.changetodo)
        this.$bus.$on('deletetodo',this.deletetodo)
        this.$bus.$on('changemsg',this.changemsg)
    },
    beforeDestroy() {
        this.$bus.$off('changetodo')
        this.$bus.$off('deletetodo')
        this.$bus.$off('changemsg')
    },
    watch:{
        todolists:{
            deep:true,
            handler(value){
                localStorage.setItem('todos',JSON.stringify(value))
            }
        }
    }
}
</script>

<style>
    body{
        background-color: #fff;
    }

    .btn{
        display: inline-block;
        padding: 4px 12px;
        margin-bottom: 0px;
        font-size: 14px;
        line-height: 20px;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        box-shadow: inset 0px 1px 0px rgba(255, 255, 255, 0.2),0px 1px 2px rgba(0, 0, 0, 0.05) ;
        border-radius: 4px;
    }
    .btn-danger{

        color:#fff;
        background-color: #da4f49;
        border:1px solid #bd362f;
    }
    .btn-edit{

        color:#fff;
        background-color: #18dd18;
        border:1px solid #2bff00;
        margin-right: 5px;
    }
    .btn-danger:hover{
        color: #fff;
        background-color:#bd362f;
    }
    .btn:focus{
        outline: none;
    }
    .todo-container{
        width: 600px;
        margin: 0 auto;
    }
    .todo-container .todo-wrap{
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
    }
</style>