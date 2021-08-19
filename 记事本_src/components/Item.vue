<template>
          <li>
              <label>
                  <input type="checkbox" :checked="todo.done" @change="handlechecked(todo.id)"/>
                  <span v-show="!todo.isedit">{{todo.msg}}</span>
                  <input v-show="todo.isedit" type="text" :value="todo.msg" @blur="chagems(todo,$event)" ref="inputtitel">
              </label>
              <button class="btn btn-danger" @click="handledelete(todo.id)">删除</button>
              <button class="btn btn-edit" @click="handleedit(todo)">编辑</button>
          </li>
</template>

<script>
export default {
    name:"Item",
    methods: {
        handlechecked(id){
            this.$bus.$emit('changetodo',id)
        },
        handledelete(id){
            if(confirm("确定删除吗？")){
                this.$bus.$emit('deletetodo',id)
            }
        },
        handleedit(todo){
            if(!todo.isedit){
                todo.isedit=!todo.isedit
                this.$nextTick(function(){
                    this.$refs.inputtitel.focus() 
                })
            }
        },
        chagems(todo,e){
            if(todo.isedit){
                if(e.target.value==""){
                    alert("内容不为空")
                }
                else{
                    todo.isedit=!todo.isedit
                    this.$bus.$emit('changemsg',todo.id,e.target.value)
                }
            }
        }
    },
    props:['todo'],
}
</script>

<style scoped>
    li{
        list-style: none;
        height: 36px;
        line-height: 36px;
        padding: 0 5px;
        border-bottom: 1px solid #ddd;
    }
    li label{
        float: left;
        cursor: pointer;
    }
    li label li input{
        vertical-align: middle;
        margin-right: 6px;
        position: relative;
        top: -1px;
    }
    li button{
        float: right;
        display: none;
        margin-top: 3px;
    }
    li:before{
        content: initial;
    }
    li:last-child{
        border-bottom: none;
    }
    li:hover{
        background-color: khaki;
    }
    li:hover button{
        display: block;
    }
</style>