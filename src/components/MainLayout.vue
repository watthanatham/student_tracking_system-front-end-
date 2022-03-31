<template>
  <b-container fluid>
    <b-row>
        <b-col v-if='this.$route.path !== "/" && this.$route.path !== "/loginteacher" && this.$route.path !== "/loginstudent"'><Menu /></b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-container class="bv-example-row">
            <router-view></router-view>
        </b-container>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import Menu from './Menu.vue'
export default {
  components: {
    Menu
  }
}
</script>
