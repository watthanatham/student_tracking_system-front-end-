<template>
  <div class="app-menu min-vh-100">
    <b-img src="../assets/AI.png" class="pt-2 pd-2 menu-img"></b-img>
      <b-nav vertical>
      <!-- <b-nav-item to="/subjectform">Subject Form</b-nav-item> -->
      <!-- <b-nav-item to="/studentform">Student Form</b-nav-item> -->
        <br>
        <b-nav-item to="/" ><b-icon icon="house"></b-icon> หน้าแรก</b-nav-item>
        <b-nav-item to="/courselist"><b-icon icon="collection"></b-icon> หลักสูตร</b-nav-item>
        <b-nav-item to="/student"><b-icon icon="people"></b-icon> ข้อมูลนิสิต</b-nav-item>
        <b-nav-item to="/studyResult">(นิสิต) Study results</b-nav-item>
        <b-nav-item to="/train_hours">(นิสิต) สหกิจ</b-nav-item>
        <b-nav-item to="/about"><b-icon icon="gear"></b-icon> จัดการผู้ใช้งาน</b-nav-item>
        <b-nav-item to="/loginscreen" @click="logout ()"><b-icon icon="box-arrow-left"></b-icon> ออกจากระบบ</b-nav-item>
        <b-nav-item to="/loginscreen"><b-icon icon="box-arrow-right"></b-icon> เข้าสู่ระบบ</b-nav-item>
    </b-nav>
</div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('auth/logout')
    }
  }
}
</script>

<style>
  .app-menu{
    background-color: whitesmoke;
    font-size: 14pt;
  }
  .sub-menu{
    padding-left: 10pt;
  }
  .nav-link{
    color: black;
    text-align: left;
  }
  .nav-link:hover{
    color:rgb(0, 0, 0);
    background-color: rgb(201, 202, 207);
  }
  .menu-img {
     width: 100%;
  }

</style>
