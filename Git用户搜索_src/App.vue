<template>
    <div class="container">
        <search/>
        <list/>
    </div>
</template>

<script>
import search from './components/Search.vue'
import list from './components/List.vue'
export default {
    name:'App',
    components:{
            search,
            list
    }
   
}
</script>