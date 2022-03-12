<template>
    <div class="container">
    <div class="row body-screen">
      <div class="col-sm-5 col-md-5 col-lg-8 mx-auto">
        <div class="card card-screenlogin my-5">
          <div class="card-body">
            <b-img src="assets/infor.png" width="665px" height="185%" class="pt-0 pd-2" ></b-img>
            <h5 class="card-title text-center"><b>Welcome to the Ai branch system <br> เข้าสู่ระบบ</b></h5>
              <div>
                <ul class="nav navbar-nav flex-row float-left">
                  <li class="nav-item">
                    <router-link  class="btn btn-lg btn-primary btn-block text-uppercase" to="/loginteacher">บุคคลากร</router-link>
                  </li>
                </ul>
              </div>
              <div>
                 <ul class="nav navbar-nav flex-row float-right">
                    <li class="nav-item">
                      <router-link class="btn btn-lg btn-success btn-block text-uppercase" to="/loginstudent">นิสิต</router-link>
                    </li>
                 </ul>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  }
}
</script>
<style>
/* body {
  background: linear-gradient(to right, #e6e7e2, #faffcd);
} */
/* .card-signin {
  border: 1;
  border-radius: 3rem;
  box-shadow: 0 0.5rem 1rem 0 rgba(105, 105, 104, 0.473);
}
.btn-dark{
  border: 2;
  background-image: linear-gradient(to left, #353533,#504d4d);
}
.btn-dark:hover{
  border: 2;
  background-image: linear-gradient(to right, #757976,#929190);
}
.card-signin {
  border: 1;
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem 0 rgba(114, 114, 114, 0.993);
}
.card-signin .card-title {
  margin-top: 10rem;
  margin-bottom: 10rem;
  font-weight: 400;
  font-size: 2.5rem;
  color: #0c0b0b;
} */
.card-screenlogin {
  border: 0;
  border-radius: 0rem;
  box-shadow: 0 0.5rem 1rem 0 rgba(199, 195, 195, 0.993);
}
</style>
