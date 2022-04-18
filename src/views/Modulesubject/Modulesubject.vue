<template>
  <div fluid style="padding: 0px">
    <b-nav class="mt-4">
      <b-nav-item to="/coursestructure">โครงสร้างหลักสูตร</b-nav-item>
      <b-nav-item to="/module_structure">โครงสร้างโมดูล</b-nav-item>
      <b-nav-item to="/subject_type">รายวิชา</b-nav-item>
      <b-nav-item to="/moduleSubject">โมดูล</b-nav-item>
      <b-nav-item to="/subject">วิชา</b-nav-item>
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
    <b-button @click="getModules" variant="primary"><i class="fa fa-search"></i> ค้นหา</b-button>
    <b-button variant="info" class="ml-2" to="/moduleinspect"><i class="fa fa-list-alt"></i> ตรวจสอบข้อมูลของนิสิต</b-button>
    <b-container fluid>
      <b-row>
        <b-col class="text-right">
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-table
            striped
            hover
            :items="moduleItems"
            :fields="fields"
            class="text-left"
            :current-page="currentPage"
            @filtered="onFiltered"
            :per-page="perPage"
            :filter="filter"
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
  components: {
  },
  data () {
    return {
      loading: false,
      fields: [
        { key: 'sub_id', label: 'รหัสวิชา' },
        { key: 'sub_name_thai', label: 'ชื่อวิชา' }
      ],
      moduleItems: [],
      select_module: [],
      selectedItem: null,
      selectLabel: 'กรุณาเลือกเลือกโมดูล',
      selectData: [],
      filter: null,
      perPage: 5,
      currentPage: 1,
      totalRows: 1
    }
  },
  methods: {
    select (item) {
      this.selectData = item
      this.selectLabel = this.selectData.text
    },
    async getModules () {
      const cid = this.$store.state.course_id
      const mid = this.selectData.value
      await axios
        .get('http://localhost:8081/model_subject/' + cid + '/' + mid)
        .then((data) => {
          this.moduleItems = data.data
          this.totalRows = data.data.length
        })
    },
    async selectModule () {
      this.loading = true
      const cid = this.$store.state.course_id
      await axios.get('http://localhost:8081/model_subject/md/' + cid).then(data => {
        this.select_module = data.data
        console.log(this.select_module)
        this.loading = false
      })
      this.select_module.unshift({ text: 'เลือกโมดูล', value: null })
    },
    async saveModule (module) {
      if (module.module_id < 0) {
        module.course_id = this.$store.state.course_id
        this.moduleItems.push(module)
        this.moduleId++
        console.log(module)
        await axios.post('http://localhost:8081/model_subject/', module)
        this.getModules()
      }
    },
    onFiltered (filteredItems) {
      console.log(filteredItems)
      this.totalRows = filteredItems.length
      this.currentPage = 1
    }
  },
  mounted () {
    // this.getModules()
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
