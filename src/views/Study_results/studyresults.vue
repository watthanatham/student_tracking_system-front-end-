<template>
  <div>
    <b-nav class="mt-4">
      <b-nav-item to="/studyResult">ตรวจสอบหมวดวิชา</b-nav-item>
      <b-nav-item to="/studymodule">ตรวจสอบโมดูล</b-nav-item>
    </b-nav>
    <b-dropdown
      id="dropdown-1"
      :text="selectLabel"
      variant="outline-primary"
      class="m-md-2"
    >
      <b-spinner label="Spinning" v-if="loading"></b-spinner>
      <b-dropdown-item v-else v-for="item in select_type" :key="item.value" @click="select(item)">{{ item.text }}</b-dropdown-item>
    </b-dropdown>
    <b-button @click="getStudyResult" variant="primary"><i class="fa fa-search"></i> ค้นหา</b-button>
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
    async getStudyResult () {
      const tid = this.selectData.value
      const stu = this.$store.state.auth.userData.stu_id
      await axios.get('http://localhost:8081/study_results/' + tid + '/' + stu).then(data => {
        this.subjecttypeItems = data.data
      })
    },
    select (item) {
      this.selectData = item
      this.selectLabel = this.selectData.text
    },
    async selectType () {
      // change fixed course id when dev login system
      const tid = this.$store.state.auth.userData.course_id
      this.loading = true
      await axios.get('http://localhost:8081/subject_type/st/' + tid).then(data => {
        this.select_type = data.data
        console.log(this.select_type)
        this.loading = false
      })
      this.select_type.unshift({ text: 'เลือกหมวดวิชา', value: null })
    }
  },
  data () {
    return {
      loading: false,
      fields: [
        { key: 'sub_id', label: 'รหัสวิชา' },
        { key: 'sub_credit', label: 'หน่วยกิต' },
        { key: 'sr_grade', label: 'เกรด' }
      ],
      subjecttypeItems: [
      ],
      select_type: [],
      selectLabel: 'เลือกหมวดวิชา',
      selectData: [],
      selectedItem: null
    }
  },
  mounted () {
    // this.getStudyResult()
    this.selectType()
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
