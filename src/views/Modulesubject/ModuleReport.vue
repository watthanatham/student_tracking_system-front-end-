<template>
  <div class="mt-2">
    <b-container class="pt-2">
      <p>{{ this.course_name }} \ โมดูล \ ตรวจสอบข้อมูลของนิสิต \ ตรวจสอบรายชื่อนิสิตที่ไม่ผ่าน</p>
    </b-container>
    <div>
      <b-button to="/moduleinspect" variant="info" class="ml-3"
        ><b-icon icon="arrow-left-square"></b-icon> ย้อนกลับ</b-button>
    </div>
    <b-container fluid>
      <b-row>
        <b-col>
          <b-table
            striped
            hover
            :items="reportItems"
            :fields="fields"
            class="text-left"
            style="margin-top: 10px"
          >
          </b-table>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  components: {},
  data () {
    return {
      loading: false,
      fields: [
        { key: 'stu_id', label: 'รหัสนิสิต' },
        { key: 'stu_firstname', label: 'ชื่อ' },
        { key: 'stu_lastname', label: 'นามสกุล' }
      ],
      reportItems: [],
      selectedItem: null
    }
  },
  methods: {
    async getModuleReports () {
      const cid = this.$store.state.course_id
      const subId = this.$store.state.sub_id
      const year = this.$store.state.stu_year
      const mid = this.$store.state.module_id
      await axios
        .get(
          'http://localhost:8081/model_subject/module_report/' +
            year +
            '/' +
            cid +
            '/' +
            mid +
            '/' +
            subId
        )
        .then((data) => {
          console.log(data.data)
          this.reportItems = data.data
        })
    }
  },
  mounted () {
    this.getModuleReports()
    this.course_name = this.$store.state.course_name
  }
}
</script>
<style>
.tableModule {
  text-align: center;
  margin-inline-end: 10px;
  background-color: whitesmoke;
}
</style>
