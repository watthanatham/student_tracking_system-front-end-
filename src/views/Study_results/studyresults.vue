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
      class="m-md-3">
      <b-spinner label="Spinning" v-if="loading"></b-spinner>
      <b-dropdown-item v-else v-for="item in select_type" :key="item.value" @click="select(item)">{{ item.text }}</b-dropdown-item>
    </b-dropdown>
    <b-button @click="getStudyResult" variant="primary"><i class="fa fa-search"></i> ค้นหา</b-button>
    <b-container class="tablestudy">
      <b-row>
        <b-col>
          <b-table
            :items="subjecttypeItems"
            :fields="fields"
            class="tableStudyresult"
            :current-page="currentPage"
            @filtered="onFiltered"
            :per-page="perPage"
            :filter="filter">
          </b-table>
          <b-col sm="1" md="6" class="my-1">
            <b-pagination
              v-model="currentPage"
              :total-rows="totalRows"
              :per-page="perPage"
              align="fill"
              size="sm"
              class="my-0"
            >
            </b-pagination>
          </b-col>
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
      const stu = this.$store.state.auth.userData.id
      await axios.get('http://localhost:8081/study_results/' + tid + '/' + stu).then(data => {
        this.subjecttypeItems = data.data
        this.totalRows = data.data.length
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
    },
    onFiltered (filteredItems) {
      console.log(filteredItems)
      this.totalRows = filteredItems.length
      this.currentPage = 1
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
      subjecttypeItems: [],
      select_type: [],
      selectLabel: 'กรุณาเลือกหมวดวิชา',
      selectData: [],
      selectedItem: null,
      filter: null,
      perPage: 5,
      currentPage: 1,
      totalRows: 1
    }
  },
  mounted () {
    // this.getStudyResult()
    this.selectType()
  }
}
</script>
<style>
.tableStudyresult {
  text-align: center;
  width: 1200px;
  background-color: whitesmoke;
}
.tablestudy {
  margin-block-end: 50px;
}
</style>
