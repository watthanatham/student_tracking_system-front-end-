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
            <h3 class="text-block">นิสิต</h3>
            <div class="form-group">
                <label>รหัสนิสิต</label>
                <input type="text" class="form-control form-control-lg"/>
            </div>
            <div class="form-group">
                <label>รหัสผ่าน</label>
                <input type="email" class="form-control form-control-lg" />
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
