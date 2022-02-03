<template>
  <div class="app-menu min-vh-100">
    <b-img src="../assets/infor.png" width="100%" class="pt-2 pd-2" ></b-img>
      <b-nav vertical>
      <b-nav-item to="/">Home</b-nav-item>
      </b-nav>
      <b-nav vertical><b-nav-item to="/courselist" @click="showFormInput=!showFormInput">Course
      </b-nav-item>
      <b-nav-item to="/formStudent">Student</b-nav-item>
      <b-nav-item to="/subjectform">SubjectForm</b-nav-item>
      <b-nav-item to="/about">Logout</b-nav-item>
    </b-nav>
</div>
</template>

<script>
export default {
  data () {
    return {
      showFormInput: false,
      showForm: false
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
