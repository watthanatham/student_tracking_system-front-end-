<template>
  <div>
    <b-nav class="mt-4">
      <b-nav-item to="/studyResult">วิชาหน่วยกิตที่ต้องเก็บ</b-nav-item>
      <b-nav-item to="/studymodule">โมดูล</b-nav-item>
    </b-nav>
    <b-dropdown
      id="dropdown-1"
      :text="selectModuleLabel"
      variant="outline-primary"
      class="m-md-2"
    >
      <b-spinner label="Spinning" v-if="loading"></b-spinner>
      <b-dropdown-item v-else v-for="item in select_module" :key="item.value" @click="select(item)">{{ item.text }}</b-dropdown-item>
    </b-dropdown>
    <b-button @click="getModuleOverview" variant="primary"><i class="fa fa-search"></i> ค้นหา</b-button>
    <b-container fluid>
      <b-row>
        <b-col>
          <b-table
            striped
            hover
            :items="submoduleItems"
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
        { key: 'module_name', label: 'โมดูล' },
        { key: 'module_credit', label: 'จำนวนหน่วยกิตรวม' },
        { key: 'student_get', label: 'จำนวนหน่วยกิตที่เรียนผ่านแล้ว' }
      ],
      submoduleItems: [],
      select_module: [],
      selectedItem: null,
      selectModuleLabel: 'เลือกโมดูล',
      selectData: []
    }
  },
  methods: {
    select (item) {
      this.selectData = item
      this.selectModuleLabel = this.selectData.text
    },
    async getModuleOverview () {
      await axios
        .get('http://localhost:8081/study_check_module')
        .then((data) => {
          this.submoduleItems = data.data
        })
    },
    async selectModule () {
      this.loading = true
      // const cid = this.$store.state.course_id
      await axios.get('http://localhost:8081/model_subject/md/1').then(data => {
        this.select_module = data.data
        console.log(this.select_module)
        this.loading = false
      })
      this.select_module.unshift({ text: 'เลือกโมดูล', value: null })
    }
  },
  mounted () {
    this.getModuleOverview()
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
