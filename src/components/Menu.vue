<template>
  <div>
      <b-navbar toggleable="lg" type="success" variant="info">
        <b-navbar-brand >
          <b-img class="navbar-img" src="../assets/AI.png" ></b-img>
        </b-navbar-brand>
        <b-container class="bv-example-row">
            <b-navbar-nav>
            <b-nav-item to="/home"><b-icon icon="house"></b-icon> หน้าแรก</b-nav-item>
            <b-nav-item to="/courselist" v-if="(this.$store.state.auth.userData.staff_username === 'user')"><b-icon icon="collection"></b-icon> หลักสูตร</b-nav-item>
            <b-nav-item to="/student"    v-if="(this.$store.state.auth.userData.staff_username === 'user')"><b-icon icon="people"></b-icon> ข้อมูลนิสิต</b-nav-item>
            <b-nav-item to="/studyResult" v-else-if="(this.$store.state.auth.userData.stu_username.match(/[0-9]{8}$/g))"><b-icon icon="list-check"></b-icon> ตรวจสอบผลการเรียน</b-nav-item>
            <b-nav-item to="/about"      v-if="checkUser ()"><b-icon icon="gear"></b-icon> จัดการผู้ใช้งาน</b-nav-item>
            <b-nav-item to="/" @click="logout ()"><b-icon icon="box-arrow-left"></b-icon> ออกจากระบบ</b-nav-item>
            <!-- <b-nav-item to="/"><b-icon icon="box-arrow-right"></b-icon> เข้าสู่ระบบ</b-nav-item> -->
            </b-navbar-nav>
        </b-container>
      </b-navbar>
</div>
</template>

<script>
export default {
  data () {
    return {
      showMenu: true
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('auth/logout')
    },
    checkMenu () {
      if (this.$store.state.auth.userData.staff_username === 'admin') {
        this.showMenu = true
      } else {
        this.showMenu = false
      }
    },
    checkStudent () {
      if (this.$store.state.auth.userData.stu_username.match(/[0-9]{8}$/g)) {
        this.showMenu = true
      } else {
        this.showMenu = false
      }
    },
    checkUser () {
      if (this.$store.state.auth.userData.staff_username === 'user') {
        this.showMenu = true
      } else {
        this.showMenu = false
      }
    }
  }
}
</script>

<style>
  .nav-link{
    color: rgb(0, 0, 0);
    text-align: left;
  }
  .nav-link:hover{
    color:rgb(0, 0, 0);
    background-color: rgb(201, 202, 207);
  }
  .navbar-img {
    width: 300px;
  }
</style>
