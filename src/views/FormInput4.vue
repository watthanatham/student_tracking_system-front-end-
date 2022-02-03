<template>
  <div>
    <b-nav class="mt-4">
      <h3>หลักสูตร:</h3>
      <b-nav-item to="/formInput2">โครงสร้างหลักสูตร</b-nav-item>
      <b-nav-item to="/formInput3">หมวดวิชา</b-nav-item>
      <b-nav-item to="/formInput4">โมดูลวิชา</b-nav-item>
      <b-nav-item to="/subject">วิชา</b-nav-item>
    </b-nav>
    <b-nav-form class="nav4">
    <h3 class="head">ชื่อหลักสูตร:
      <b-form-input
        size="sm"
        class="mr-sm-2"
        placeholder="Search"
      ></b-form-input>
      <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
    </h3></b-nav-form>
    <b-table class="table" striped hover :items="items"></b-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        { รหัสวิชา: '88511359', ชื่อวิชา: 'Mathematics for Computing', โมดูล: 'M1' },
        { รหัสวิชา: '88521159', ชื่อวิชา: 'Probability and Statistics for Computing', โมดูล: 'M1' },
        { รหัสวิชา: '89530064', ชื่อวิชา: 'Opportunities and Challenges for FutureCareers', โมดูล: 'M1' }
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
  .navnavnav{
    background-color: whitesmoke;
  }
  .nav4{
    padding: 10px;
  }
</style>
