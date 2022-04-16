<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-signin my-5">
          <div class="card-body">
            <b-img
              src="../../assets/user-icon.png"
              width="85px"
              height="80px"
              style="margin-left: 155px"
            ></b-img>
            <!-- <h5 class="card-title text-center"><b>เข้าสู่ระบบ</b></h5> -->
            <form class="form-signin" style="padding-top: 20px">
              <div class="form-label-group">
                <input
                  class="form-control"
                  type="text"
                  placeholder="ชื่อบัญชีผู้ใช้"
                  v-model="form.username"
                  required
                  autofocus
                />
                <p id="demo2" class="active text-danger"></p>
              </div>
              <div class="form-label-group">
                <input
                  type="password"
                  class="form-control"
                  placeholder="รหัสผ่าน"
                  v-model="form.password"
                  required
                />
                <p id="demo3" class="active text-danger"></p>
              </div>
              <div>
                <b-button
                variant="success"
                  class="btn btn-lg btn-block text-uppercase"
                  @click="onSubmit"
                  >เข้าสู่ระบบ</b-button
                >
                <!-- &nbsp; -->
                <!-- <br> -->
                <b-button
                  class="btn btn-lg btn-light btn-block text-uppercase"
                  @click="onReset"
                  >ยกเลิก</b-button
                >
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      show: true
    }
  },
  methods: {
    onSubmit (event) {
      event.preventDefault()
      this.$store.dispatch('auth/login', this.form)
    },
    onReset (event) {
      event.preventDefault()
      this.form.username = ''
      this.form.password = ''
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>
<style scoped>
/* body {
  background: linear-gradient(to right, #8d8a8a, #c0c0c4);
} */
.card-signin {
  border: 1;
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem 0 rgba(105, 105, 104, 0.473);
}
.btn-dark {
  border: 2px;
  background-image: linear-gradient(to left, #2cb34e, #2cb34e);
}
.btn-dark:hover {
  border: 2px;
  background-image: linear-gradient(to right, #269c44, #269c44);
}
.card-signin {
  border: 5;
  border-radius: 1rem;
  box-shadow: 0 1.5rem 1rem 1 rgba(0, 255, 0, 0.1);
}
.card-signin .card-title {
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-weight: 400;
  font-size: 1.5rem;
  color: #0c0b0b;
}
.hd {
  font-size: 180%;
}
</style>
