<template>
  <div>
    <b-nav class="mt-4">
      <b-nav-item to="/subjectstudyResult">วิชาหน่วยกิตที่ต้องเก็บ</b-nav-item>
    </b-nav>
    <b-table class="table" striped hover :items="items"></b-table>
    <b-container fluid>
      <b-row>
        <b-col>
          <b-table :items="subjecttypeItems" :fields="fields" class="tableStudyresult">
          </b-table>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  methods: {
    async getSubjects () {
      await axios.get('http://localhost:8081/study_results').then(data => {
        this.subjecttypeItems = data.data
      })
    }
  },
  data () {
    return {
      fields: [
        { key: 'sub_code', label: 'รหัสวิชา' },
        { key: 'sub_credit', label: 'หน่วยกิต' },
        { key: 'sr_grade', label: 'เกรด' }
      ],
      subjecttypeItems: [
      ],
      selectedItem: null
    }
  },
  mounted () {
    this.getSubjects()
  }
}
</script>
<style>
/* .tableStudyresult{
  text-align: center;
  width: 1331px;
  margin-inline-end: 300px;
  background-color: whitesmoke;
} */
</style>
