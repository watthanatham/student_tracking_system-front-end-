<template>
  <div class="home">
    <HelloWorld msg="ข่าวสารทางสาขา"/>
    <img class="image" alt="Vue logo" src="../assets/1.jpg">
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>

<style>
  .image{
    margin: 80px;
  }
</style>
