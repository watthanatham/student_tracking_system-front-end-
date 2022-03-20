<template>
  <div>
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
    <b-container fluid>
      <b-row>
        <b-col>
          <b-table
            striped
            hover
            :items="moduleItems"
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
        { key: 'sub_name_thai', label: 'ชื่อวิชา' },
        { key: 'a', label: 'จำนวนนิสิตที่ผ่านแล้ว' },
        { key: 'b', label: 'จำนวนนิสิตที่ไม่ผ่าน' }
      ],
      moduleItems: [],
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
    // async getModules () {
    //   const cid = this.$store.state.course_id
    //   const mid = this.selectData.value
    //   await axios
    //     .get('http://localhost:8081/model_subject/' + cid + '/' + mid)
    //     .then((data) => {
    //       this.moduleItems = data.data
    //     })
    // },
    async selectModule () {
      this.loading = true
      const cid = this.$store.state.course_id
      await axios.get('http://localhost:8081/model_subject/md/' + cid).then(data => {
        this.select_module = data.data
        console.log(this.select_module)
        this.loading = false
      })
      this.select_module.unshift({ text: 'เลือกโมดูล', value: null })
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
