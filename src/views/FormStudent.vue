<template>
  <div>
    <b-nav-form>
    <h3 class=mt-4>นิสิต:
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
        { รหัสนิสิต: 61160028, ชื่อ: 'ณัฐวุฒิ', นามสกุล: 'นวลสง่า', จำนวนครั้งที่สอบ: 2, ชั่วโมงสหกิจ: 20 },
        { รหัสนิสิต: 61160029, ชื่อ: 'ศิริยากร', นามสกุล: 'มากแก้ว', จำนวนครั้งที่สอบ: 2, ชั่วโมงสหกิจ: 40 }
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
</style>
