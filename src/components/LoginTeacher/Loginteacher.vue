<template>
    <div class="vue-tempalte">
        <ul class="nav navbar-nav flex-row float-right">
            <li class="nav-item">
                <router-link class="btn btn-outline-primary" to="/loginteacher">นิสิต</router-link>
            </li>
            <li class="nav-item">
                <router-link class="btn btn-outline-primary" to="/loginstudent">บุคคลากร</router-link>
            </li>
        </ul>
        <form>
            <h3 class="text-left">บุคคลากร</h3>
            <div class="form-group">
                <label>Email address</label>
                <input type="email" class="form-control form-control-lg" />
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control form-control-lg" />
            </div>
            <button type="submit" class="btn btn-dark btn-lg">เข้าสู่ระบบ</button>
        </form>
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
</style>
