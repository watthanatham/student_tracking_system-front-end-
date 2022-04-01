<template>
  <b-container fluid style="padding: 0">
    <b-row class="nav-sticky">
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

<style lang="scss">
  .nav-sticky {
    position: sticky;
    top: 0;
    z-index: 200;
    & > .col {
      padding: 0px;
    }
    & , .row {
      margin-left: 0px;
      margin-right: 0px;
    }
  }
</style>
