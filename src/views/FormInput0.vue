<template>
  <div>
    <b-table striped hover :items="items"></b-table>
    <a href="https://www.informatics.buu.ac.th/2020/?page_id=4321" target="_blank" rel="noopener">ดูข้อมูลเพิ่มเติม</a>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        { No: 1, ชื่อหลักสูตร: 'หลักสูตรใหม่', ปีการศึกษา: '2564' },
        { No: 2, ชื่อหลักสูตร: 'หลักสูตรใหม่', ปีการศึกษา: '2565' },
        { No: 3, ชื่อหลักสูตร: 'หลักสูตรใหม่', ปีการศึกษา: '2566' }
      ]
    }
  }
}
</script>
