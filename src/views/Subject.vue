<template>
  <div>
  <b-nav class="mt-4">
      <h3>หลักสูตร:</h3>
      <b-nav-item to="/formInput2">โครงสร้างหลักสูตร</b-nav-item>
      <b-nav-item to="/formInput3">หมวดวิชา</b-nav-item>
      <b-nav-item to="/formInput4">โมดูลวิชา</b-nav-item>
      <b-nav-item to="/subject">วิชา</b-nav-item>
    </b-nav>
    <b-nav-form class="nav3">
      <b-form-input
        size="sm"
        class="mr-sm-2"
        placeholder="Search"
      ></b-form-input>
      <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
    </b-nav-form>
    <div class="col-sm-10">
      <b-button variant="success">Insert</b-button>
      <b-button class="ml-2" variant="info">Import</b-button>
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
        { No: 1, รหัสวิชา: '89011164', ชื่อวิชา: 'Programming for Artificial Intelligence', หน่วยกิต: 3, หมวดวิชา: 'วิชาแกน', โมดูล: 'M1', แก้ไขข้อมูล: 'editIcon', ลบข้อมูล: 'delIcon' },
        { No: 2, รหัสวิชา: '89011064', ชื่อวิชา: 'Information Technology for Industry', หน่วยกิต: 2, หมวดวิชา: 'วิชาบังคับ', โมดูล: 'M1', แก้ไขข้อมูล: 'editIcon', ลบข้อมูล: 'delIcon' },
        { No: 3, รหัสวิชา: '89530064', ชื่อวิชา: 'Opportunities and Challenges for Future Careers', หน่วยกิต: 2, หมวดวิชา: 'วิชาทั่วไป', โมดูล: 'M.GE', แก้ไขข้อมูล: 'editIcon', ลบข้อมูล: 'delIcon' },
        { No: 4, รหัสวิชา: '88511359', ชื่อวิชา: 'Mathematics for Computing', หน่วยกิต: 2, หมวดวิชา: 'วิชาแกน', โมดูล: 'M1', แก้ไขข้อมูล: 'editIcon', ลบข้อมูล: 'delIcon' },
        { No: 5, รหัสวิชา: '88511359', ชื่อวิชา: 'Probability and Statistics for Computing', หน่วยกิต: 2, หมวดวิชา: 'วิชาแกน', โมดูล: 'M1', แก้ไขข้อมูล: 'editIcon', ลบข้อมูล: 'delIcon' },
        { No: 6, รหัสวิชา: '88511359', ชื่อวิชา: 'Empirical Learning I', หน่วยกิต: 2, หมวดวิชา: 'บังคับ', โมดูล: 'M6', แก้ไขข้อมูล: 'editIcon', ลบข้อมูล: 'delIcon' }
      ]
    }
  }
}
</script>

<style>
.col-sm-10{
  left: 880px;
  padding: 5px;
}
.margin-left{
    margin-left: 30px !important;
}
</style>
