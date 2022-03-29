<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-signin my-5">
          <div class="card-body">
            <!-- <b-img
              src="https://itdang2009.com/wp-content/uploads/2020/03/%E0%B8%9B%E0%B8%81-7.jpg"
              width="405px"
              height="185%"
              class="pt-0 pd-2"
            ></b-img> -->
            <h5 class="card-title text-center"><b>บุคคลากร</b></h5>
            <form class="form-signin">
              <div class="form-label-group">
                <input
                  class="form-control"
                  type="text"
                  placeholder="Username"
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
                  placeholder="Password"
                  v-model="form.password"
                  required
                />
                <p id="demo3" class="active text-danger"></p>
              </div>
              <div>
                <b-button class="btn btn-lg btn-dark btn-block text-uppercase"
                @click="onSubmit"
                  >เข้าสู่ระบบ</b-button
                >
                <!-- &nbsp; -->
                <!-- <br> -->
                <b-button class="btn btn-lg btn-light btn-block text-uppercase"
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
<style>
/* body {
  background: linear-gradient(to right, #8d8a8a, #c0c0c4);
} */
.card-signin {
  border: 1;
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem 0 rgba(105, 105, 104, 0.473);
}
.btn-dark {
  border: 2;
  background-image: linear-gradient(to left, #353533, #504d4d);
}
.btn-dark:hover {
  border: 2;
  background-image: linear-gradient(to right, #757976, #929190);
}
.card-signin {
  border: 5;
  border-radius: 1rem;
  box-shadow: 0 1.5rem 1rem 1 rgba(241, 245, 241, 0.1);
}
.card-signin .card-title {
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-weight: 400;
  font-size: 1.5rem;
  color: #0c0b0b;
}
</style>
