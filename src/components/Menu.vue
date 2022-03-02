<template>
  <div class="app-menu min-vh-100">
    <b-img src="../assets/infor.png" width="100%" class="pt-2 pd-2" ></b-img>
      <b-nav vertical>
      <b-nav-item to="/" class="">หน้าแรก</b-nav-item>
      </b-nav>
      <b-nav vertical><b-nav-item to="/courselist">หลักสูตร</b-nav-item>
      <b-nav-item to="/student">ข้อมูลนิสิต</b-nav-item>
      <b-nav-item to="/subjectform">Subject Form</b-nav-item>
      <b-nav-item to="/studentform">Student Form</b-nav-item>
      <b-nav-item to="/studentresult">Student Result</b-nav-item>
      <b-nav-item to="/studentresultform">Student Result Form</b-nav-item>
      <b-nav-item to="/studentImport">Student Import</b-nav-item>
      <b-nav-item to="/about">ออกจากระบบ</b-nav-item>
    </b-nav>
</div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style>
  .app-menu{
    background-color: whitesmoke;
    font-size: 10pt;
  }
  .sub-menu{
    padding-left: 10pt;
  }
  .nav-link{
    color: black;
    text-align: left;
  }
  .nav-link:hover{
    color:gold;
    background-color: rgb(65, 66, 69);
  }

</style>
