<template>
  <div>
    <b-nav class="mt-4">
      <h3>หลักสูตร:</h3>
      <b-nav-item to="/formInput2">โครงสร้างหลักสูตร</b-nav-item>
      <b-nav-item to="/formInput3">หมวดวิชา</b-nav-item>
      <b-nav-item to="/formInput4">โมดูลวิชา</b-nav-item>
      <b-nav-item to="/subject">วิชา</b-nav-item>
    </b-nav>
    <b-nav-form class="pt-2">
      <b-form-input
        size="sm"
        class="mr-sm-2"
        placeholder="Search"
      ></b-form-input>
      <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
    </b-nav-form>
    <!-- <b-table class="table" striped hover :items="items"></b-table> -->
     <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      class="pt-3"
      aria-controls="my-table"></b-pagination>
    <p class="mt-3">CurrentPage: {{ currentPage }}</p>
    <b-table
      id="my-table"
      :items="items"
      :per-page="perPage"
      :current-page="currentPage"
      small
    ></b-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      perPage: 1,
      currentPage: 4,
      items: [
        { หมวดวิชา: 'ศึกษาทั่วไป', จำนวนหน่วยกิตทั้งหมดของแต่ละหมวด: 30, หน่วยกิต: 7 },
        { หมวดวิชา: 'แกน', จำนวนหน่วยกิตทั้งหมดของแต่ละหมวด: 18, หน่วยกิต: 8 },
        { หมวดวิชา: 'เอกบังคับ', จำนวนหน่วยกิตทั้งหมดของแต่ละหมวด: 57, หน่วยกิต: 5 },
        { หมวดวิชา: 'เอกเลือก', จำนวนหน่วยกิตทั้งหมดของแต่ละหมวด: 9, หน่วยกิต: 3 }
      ]
    }
  },
  computed: {
    rows () {
      return this.items.length
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
  .nav3{
    padding: 10px;
  }
</style>
