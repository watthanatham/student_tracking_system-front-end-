<template>
  <div>
    <b-nav class="mt-4">
      <b-nav-item to="/formInput2">โครงสร้างหลักสูตร</b-nav-item>
      <b-nav-item to="/formInput3">หมวดวิชา</b-nav-item>
      <b-nav-item to="/formInput4">โมดูลวิชา</b-nav-item>
      <b-nav-item to="/subject">วิชา</b-nav-item>
    </b-nav>
    <b-nav-form class="nav2">
    <h3 class="head">ชื่อหลักสูตร:
      <b-form-input
        size="sm"
        class="mr-sm-2"
        placeholder="Search"
      ></b-form-input>
      <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
    </h3></b-nav-form>
    <!-- <b-table class="table" striped hover :items="items"></b-table> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        { หมวดวิชา: 'ศึกษาทั่วไป', จำนวนหน่วยกิตทั้งหมดของแต่ละหมวด: 30, last_name: 'Macdonald' },
        { หมวดวิชา: 'แกน', จำนวนหน่วยกิตทั้งหมดของแต่ละหมวด: 18, last_name: 'Shaw' },
        { หมวดวิชา: 'เอกบังคับ', จำนวนหน่วยกิตทั้งหมดของแต่ละหมวด: 57, last_name: 'Wilson' },
        { หมวดวิชา: 'เอกเลือก', จำนวนหน่วยกิตทั้งหมดของแต่ละหมวด: 9, last_name: 'Carney' }
      ]
    }
  }
}
</script>

<style>
  .table{
    background-color: white;
    text-align: center;
  }
  .head{
    background-color: white;
    font-size: 15pt;
  }
  .navnav{
    background-color: whitesmoke;
  }
  .nav2{
    padding: 10px;
  }
</style>
