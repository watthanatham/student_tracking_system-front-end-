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
      <b-dropdown-item v-else v-for="item in select_module" :key="item.value" @click="select(item)">{{ item.text }}</b-dropdown-item>
    </b-dropdown>
    <b-button @click="getSubjectbyModule" variant="primary"><i class="fa fa-search"></i> ค้นหา</b-button>
    <b-container fluid>
      <b-row>
        <b-col>
          <b-table
            striped
            hover
            :items="resultItems"
            :fields="fields"
            class="text-left"
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
  components: {
  },
  data () {
    return {
      loading: false,
      fields: [
        { key: 'sub_id', label: 'รหัสวิชา' },
        { key: 'sub_credit', label: 'หน่วยกิต' },
        { key: 'sr_grade', label: 'ผลการศึกษา' }
      ],
      resultItems: [],
      select_module: [],
      selectedItem: null,
      selectLabel: 'เลือกโมดูล',
      selectData: []
    }
  },
  methods: {
    select (item) {
      this.selectData = item
      this.selectLabel = this.selectData.text
    },
    async getSubjectbyModule () {
      // const cid = this.$store.state.course_id
      const mid = this.selectData.value
      const stu = this.$store.state.auth.userData.stu_id
      await axios
        .get('http://localhost:8081/study_check_module/check_result/' + mid + '/' + stu)
        .then((data) => {
          this.resultItems = data.data
        })
    },
    async selectModule () {
      this.loading = true
      // const cid = this.$store.state.course_id
      const mid = this.$store.state.auth.userData.course_id
      await axios.get('http://localhost:8081/model_subject/md/' + mid).then(data => {
        this.select_module = data.data
        console.log(this.select_module)
        this.loading = false
      })
      this.select_module.unshift({ text: 'เลือกโมดูล', value: null })
    }
  },
  mounted () {
    // this.getSubjectbyModule()
    this.selectModule()
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
