<template>
  <div>
    <b-navbar toggleable="lg" type="warning " class="navbarhead">
        <!-- Right aligned nav items -->
        <b-navbar-brand href="/home" >
        <b-img class="navbar-img" src="../assets/AI-v2.png" ></b-img>
      </b-navbar-brand>
       <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-navbar-nav class="ml-auto">
          <!-- <b-list-group-item class="p"> -->
            <span class="pr-5 txt"> {{ user.firstname }}  {{ user.lastname }} </span>
          <!-- </b-list-group-item> -->
        </b-navbar-nav>
    </b-navbar>
      <b-navbar toggleable="lg" type="primary " class="navbarmenu">
        <b-container class="bv-example-row">
          <b-row align-h="center">
            <b-navbar-nav class="ml-center">
            <b-nav-item to="/home"><b-icon icon="house"></b-icon> หน้าแรก |</b-nav-item>
            <b-nav-item to="/courselist" v-if="(this.$store.state.auth.userData.username === 'admin')"><b-icon icon="collection"></b-icon> หลักสูตร |</b-nav-item>
            <b-nav-item to="/student"    v-if="(this.$store.state.auth.userData.username === 'admin')"><b-icon icon="people"></b-icon> ข้อมูลนิสิต |</b-nav-item>
            <b-nav-item to="/studyResult" v-else-if="(this.$store.state.auth.userData.username.match(/[0-9]{8}$/g))"><b-icon icon="list-check"></b-icon> ตรวจสอบผลการเรียน |</b-nav-item>
            <b-nav-item to="/about"      v-if="checkUser ()"><b-icon icon="gear"></b-icon> จัดการผู้ใช้งาน</b-nav-item>
            <b-nav-item to="/" @click="logout ()"><b-icon icon="box-arrow-left"></b-icon> ออกจากระบบ</b-nav-item>
            <!-- <b-nav-item to="/"><b-icon icon="box-arrow-right"></b-icon> เข้าสู่ระบบ</b-nav-item> -->
            </b-navbar-nav>
          </b-row>
        </b-container>
      </b-navbar>
</div>
</template>

<script>

export default {
  data () {
    return {
      showMenu: true,
      user: []
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('auth/logout')
    },
    checkMenu () {
      if (this.$store.state.auth.userData.username === 'admin') {
        this.showMenu = true
      } else {
        this.showMenu = false
      }
    },
    checkStudent () {
      if (this.$store.state.auth.userData.username.match(/[0-9]{8}$/g)) {
        this.showMenu = true
      } else {
        this.showMenu = false
      }
    },
    checkUser () {
      if (this.$store.state.auth.userData.username === 'user') {
        this.showMenu = true
      } else {
        this.showMenu = false
      }
    }
  },
  mounted () {
    this.user = this.$store.state.auth.userData || []
  }
}
</script>

<style scoped>
  .txt {
    color: white;
  }
  .nav-link{
    color: rgb(255, 255, 255);
    text-align: right;
  }
  .nav-link:hover{
    color:rgb(255, 255, 255);
    background-color: rgb(134, 134, 134);
  }
  .navbar-img {
    width: 300px;
  }
  .navbarhead {
    background-color: #00396b;
  }
  .navbarmenu {
    background-color: #1b2432;
  }
  .wrapper {
    position: sticky;
    top: 0;
  }
</style>
