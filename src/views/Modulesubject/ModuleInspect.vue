<template>
  <div>
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
      ><i class="fa fa-search"></i> ค้นหา</b-button
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
            @row-clicked="selectReport"
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
        { key: 'sub_id', label: 'รหัสวิชา' },
        { key: 'sub_name_thai', label: 'ชื่อวิชา' },
        { key: 'series', label: 'ชั้นปี' },
        { key: 'pass', label: 'จำนวนนิสิตที่ผ่าน' },
        { key: 'fail', label: 'จำนวนนิสิตที่ไม่ผ่าน' }
      ],
      submoduleItems: [],
      select_module: [],
      selectedItem: null,
      selectModuleLabel: 'เลือกโมดูล',
      selectSeriesLabel: 'เลือกชั้นปี',
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
          console.log(data.data)
          this.submoduleItems = data.data
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
