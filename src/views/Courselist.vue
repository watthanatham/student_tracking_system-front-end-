<template>
  <div>
  <b-nav class="mt-4">
      <h3>หลักสูตร:</h3>
      <b-nav-item to="/formInput2">โครงสร้างหลักสูตร</b-nav-item>
      <b-nav-item to="/formInput3">หมวดวิชา</b-nav-item>
      <b-nav-item to="/formInput4">โมดูลวิชา</b-nav-item>
      <b-nav-item to="/subject">วิชา</b-nav-item>
    </b-nav>
    <div class="col-sm-10">
      <b-button variant="success">Insert course</b-button>
    </div>
    <b-table :items="items" class="mt-2" outlined>
      <template #table-busy>
        <div class="text-center text-danger my-2"></div>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        { No: 1, ชื่อหลักสูตร: 'หลักสูตรใหม่', ปีการศึกษา: '2563', รายละเอียด: 'view detail' },
        { No: 2, ชื่อหลักสูตร: 'หลักสูตรใหม่', ปีการศึกษา: '2564', รายละเอียด: 'view detail' }
      ]
    }
  }
}
</script>

<style>
.col-sm-10{
  left: 970px;
}
</style>
