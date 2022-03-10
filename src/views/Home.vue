<template>
  <div class="home">
    <HelloWorld msg="ข่าวสารทางสาขา"/>
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
</style>
