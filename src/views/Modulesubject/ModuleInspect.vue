<template>
  <div>
    <b-container class="pt-2">
      <h6>{{ course_name }}</h6>
      <h6>โมดูล \ ตรวจสอบข้อมูลของนิสิต</h6>
    </b-container>
    <b-dropdown
      id="dropdown-1"
      :text="selectModuleLabel"
      variant="outline-primary"
      class="m-md-2"
    >
      <b-spinner label="Spinning" v-if="loading"></b-spinner>
      <b-dropdown-item
        v-else
        v-for="item in select_module"
        :key="item.value"
        @click="select(item)"
        >{{ item.text }}</b-dropdown-item
      >
    </b-dropdown>
    <b-dropdown
      id="dropdown-1"
      :text="selectSeriesLabel"
      variant="outline-primary"
      class="m-md-2"
      ref="dropdown"
    >
      <b-spinner label="Spinning" v-if="loading"></b-spinner>
      <div style="height: 250px; overflow-y: auto" v-else>
        <b-dropdown-item
          v-for="i in getNumbers(dateYear.min, dateYear.max)"
          :key="i"
          @click="selectYear(i)"
          :class="'year' + i"
          :style="{'background-color': (i === dateYear.select) ? '#e9ecef' : ''}"
          >{{ i }}</b-dropdown-item
        >
      </div>
    </b-dropdown>
    <b-button @click="getModuleReports" variant="primary"
    style="margin-right: 5px"
      ><i class="fa fa-search"></i> ค้นหา</b-button
    >
    <b-button to="/modulesubject" variant="info"
      ><b-icon icon="arrow-left-square"></b-icon> ย้อนกลับ</b-button
    >
    <b-container fluid>
      <b-row>
        <b-col>
          <b-table
            striped
            hover
            :items="submoduleItems"
            :fields="fields"
            class="text-left"
            :current-page="currentPage"
            @filtered="onFiltered"
            :per-page="perPage"
            :filter="filter"
          >
          <template #cell(module_inspect)="{ item }">
              <b-button @click="selectReport(item)" variant="info"
                ><i class="fa fa-search"></i
              ></b-button>
            </template>
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
  components: {},
  data () {
    return {
      course_name: '',
      loading: false,
      fields: [
        { key: 'sub_id', label: 'รหัสวิชา' },
        { key: 'sub_name_thai', label: 'ชื่อวิชา' },
        { key: 'series', label: 'ชั้นปี' },
        { key: 'pass', label: 'จำนวนนิสิตที่ผ่าน' },
        { key: 'fail', label: 'จำนวนนิสิตที่ไม่ผ่าน' },
        { key: 'module_inspect', label: 'ตรวจสอบรายชื่อนิสิตที่ไม่ผ่าน' }
      ],
      filter: null,
      perPage: 5,
      currentPage: 1,
      totalRows: 1,
      submoduleItems: [],
      select_module: [],
      selectedItem: null,
      selectModuleLabel: 'กรุณาเลือกโมดูล',
      selectSeriesLabel: 'กรุณาเลือกชั้นปี',
      selectData: [],
      selectSeries: [],
      dateYear: {
        min: 60,
        max: 80,
        select: 0
      }
    }
  },
  methods: {
    selectReport (item, index, evt) {
      console.log(item.sub_id)
      const mid = this.selectData.value
      const stu = this.selectSeries
      this.$store.commit('setSubId', item.sub_id)
      this.$store.commit('setStuYear', stu)
      this.$store.commit('setModuleId', mid)
      console.log(this.selectSeries)
      console.log(this.selectData.value)
      console.log(this.$store.state)
      this.$router.push({ path: '/module_report' })
    },
    getNumbers (start, stop) {
      return new Array(stop + 1 - start).fill(start).map((n, i) => n + i)
    },
    select (item) {
      this.selectData = item
      this.selectModuleLabel = this.selectData.text
    },
    selectYear (item) {
      this.loading = true
      this.selectSeries = item
      this.selectSeriesLabel = this.selectSeries + ''
      this.dateYear.select = item
      this.scroll(item)
      this.loading = false
    },
    scroll (id) {
      this.$refs.dropdown.$el.querySelector('.year' + id).scrollIntoView()
    },
    async getModuleReports () {
      const cid = this.$store.state.course_id
      const mid = this.selectData.value
      const stu = this.selectSeries
      console.log(mid)
      await axios
        .get('http://localhost:8081/model_subject/inspect/' + cid + '/' + mid + '/' + stu)
        .then((data) => {
          if (data.data.length > 0) {
            console.log(data.data)
            this.submoduleItems = data.data
            this.totalRows = data.data.length
          } else {
            this.$swal({ icon: 'error', title: 'ไม่พบข้อมูล' })
            console.log('error')
          }
        })
    },
    async selectModule () {
      this.loading = true
      const cid = this.$store.state.course_id
      await axios
        .get('http://localhost:8081/model_subject/md/' + cid)
        .then((data) => {
          this.select_module = data.data
          console.log(this.select_module)
          this.loading = false
        })
      this.select_module.unshift({ text: 'เลือกโมดูล', value: null })
    },
    onFiltered (filteredItems) {
      console.log(filteredItems)
      this.totalRows = filteredItems.length
      this.currentPage = 1
    }
  },
  mounted () {
    // this.getModuleReports()
    this.selectModule()
    var date = new Date()
    var year = date.getFullYear() + 543 + ''
    var yearNow = year.slice(2, 4)
    this.dateYear.select = Number(yearNow)
    setTimeout(() => {
      this.scroll(this.dateYear.select)
    }, 1500)
    this.course_name = this.$store.state.course_name
  }
}
</script>
<style lang="scss">
tableModule {
  text-align: center;
  margin-inline-end: 10px;
  background-color: whitesmoke;
  & tr {
    cursor: pointer;
  }
}
</style>
