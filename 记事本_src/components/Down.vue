<template>
      <div class="todo-footer" v-show="allnum">
        <label>
          <input type="checkbox" :checked="isall" @change="isallchange"/>
          <span>
            <span>已完成{{tododonenum}}/全部{{allnum}}</span>
          </span>
        </label>
        <button class="btn btn-danger" @click="deleteall">清除已完成任务</button>
      </div>
</template>

<script>
export default {
    name:"Down",
    props:['todolists'],
    computed:{
      tododonenum(){
        return this.todolists.reduce((pre,cur)=>pre+(cur.done?1:0),0)
      },
      allnum(){
        return this.todolists.length
      },
      isall(){
        return this.tododonenum==this.allnum&&this.allnum>0
      }
    },
    methods: {
      isallchange(e){
        this.$emit('changetodos',e.target.checked)
      },
      deleteall(){
        this.$emit('deletetodos');
      }
    }
}
</script>

<style>
  .todo-footer{
    height: 40px;
    line-height: 40px;
    padding-left: 6px;
    margin-top: 5px;
  }
  .todo-footer label{
    display: inline-block;
    margin-right: 20px;
    cursor: pointer;
  }
  .todo-footer label input{
    position: relative;
    top: -1px;
    vertical-align: middle;
    margin-right: 5px;
  }
  .todo-footer button{
    float: right;
    margin-top: 5px;
  }
</style>