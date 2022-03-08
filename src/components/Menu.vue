<template>
  <div class="app-menu min-vh-100">
    <b-img src="../assets/AI.png" width="260%" class="pt-2 pd-2" ></b-img>
      <b-nav vertical>
      <b-nav-item to="/" class="">หน้าแรก</b-nav-item>
      </b-nav>
      <b-nav vertical><b-nav-item to="/courselist">หลักสูตร</b-nav-item>
      <b-nav-item to="/student">ข้อมูลนิสิต</b-nav-item>
      <!-- <b-nav-item to="/subjectform">Subject Form</b-nav-item> -->
      <!-- <b-nav-item to="/studentform">Student Form</b-nav-item> -->

        <br>
      <b-nav-item to="/" ><b-icon icon="house"></b-icon> หน้าแรก</b-nav-item>
      <b-nav-item to="/courselist"><b-icon icon="collection"></b-icon> หลักสูตร</b-nav-item>
      <b-nav vertical>
      <b-nav-item to="/student"><b-icon icon="people"></b-icon> ข้อมูลนิสิต</b-nav-item>
      <!-- <b-nav-item to="/subjectform">Subject Form</b-nav-item>
      <b-nav-item to="/studentform">Student Form</b-nav-item>
      <b-nav-item to="/studentresult">Student Result</b-nav-item>
      <b-nav-item to="/studentresultform">Student Result Form</b-nav-item>
      <! <b-nav-item to="/studentImport">Student Import</b-nav-item> -->
      <b-nav-item to="/studyResult">Study results</b-nav-item>
      <b-nav-item to="/train_hours">สหกิจ</b-nav-item>
      <!-- <b-nav-item to="/subject_import">Subject Import</b-nav-item> -->
      <b-nav-item to="/about">ออกจากระบบ</b-nav-item>
      <b-nav-item to="/subject_import">Subject Import</b-nav-item> -->
      <b-nav-item to="/about"><b-icon icon="gear"></b-icon> จัดการผู้ใช้งาน</b-nav-item>
      <b-nav-item to="/about"><b-icon icon="box-arrow-left"></b-icon> ออกจากระบบ</b-nav-item>
      </b-nav>
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

</style>
