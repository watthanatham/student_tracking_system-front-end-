<template>
  <div>
    <b-container class="pt-2">
      <h6>{{ course_name }}</h6>
    </b-container>
    <b-nav class="mt-4">
      <b-nav-item to="/coursestructure">โครงสร้างหลักสูตร</b-nav-item>
      <b-nav-item to="/module_structure">โมดูล</b-nav-item>
      <b-nav-item to="/subject_type">รายวิชาแต่ละหมวดวิชา</b-nav-item>
      <b-nav-item to="/moduleSubject">รายวิชาแต่ละโมดูล</b-nav-item>
      <b-nav-item to="/subject">วิชาในหลักสูตร</b-nav-item>
    </b-nav>
    <b-dropdown
      id="dropdown-1"
      :text="selectLabel"
      variant="outline-primary"
      class="m-md-2"
    >
      <b-spinner label="Spinning" v-if="loading"></b-spinner>
      <b-dropdown-item
        v-else
        v-for="item in select_type"
        :key="item.value"
        @click="select(item)"
        >{{ item.text }}</b-dropdown-item
      >
    </b-dropdown>
    <b-button @click="getSubjects" variant="primary"
      ><i class="fa fa-search"></i> ค้นหา</b-button
    >
    <b-container fluid>
      <b-row>
        <b-col>
          <h6>ตารางรายวิชาในหมวด{{ this.selectLabel }}</h6>
          <b-table
            striped
            hover
            :items="subjecttypeItems"
            :fields="fields"
            :current-page="currentPage"
            :per-page="perPage"
            @filtered="onFiltered"
            :filter="filter"
            class="tabletypesubject"
          >
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
    async getSubjects () {
      const cid = this.$store.state.course_id
      const tid = this.selectData.value
      await axios
        .get('http://localhost:8081/type_subject/' + cid + '/' + tid)
        .then((data) => {
          if (data.data.length > 0) {
            this.subjecttypeItems = data.data
            this.totalRows = data.data.length
          } else {
            this.$swal({ icon: 'error', title: 'ไม่พบข้อมูล' })
            console.log('error')
          }
        })
    },
    select (item) {
      this.selectData = item
      this.selectLabel = this.selectData.text
    },
    async selectType () {
      // change fixed course id when dev login system
      const id = this.$store.state.course_id
      this.loading = true
      await axios
        .get('http://localhost:8081/subject_type/st/' + id)
        .then((data) => {
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
      course_name: '',
      loading: false,
      fields: [
        { key: 'sub_id', label: 'รหัสวิชา' },
        { key: 'sub_name_thai', label: 'ชื่อวิชา' },
        { key: 'sub_credit', label: 'หน่วยกิต' }
      ],
      subjecttypeItems: [],
      select_type: [],
      selectLabel: 'กรุณาเลือกหมวดวิชา',
      selectData: [],
      selectedItem: null,
      perPage: 5,
      totalRows: 1,
      currentPage: 1,
      filter: null
    }
  },
  mounted () {
    // this.getSubjects()
    this.selectType()
    this.course_name = this.$store.state.course_name
  }
}
</script>
<style>
.tablesubjecttype {
  text-align: center;
  margin-inline-end: 300px;
  margin-block-start: 15px;
  background-color: whitesmoke;
}
</style>
