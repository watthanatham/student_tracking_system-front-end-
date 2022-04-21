<template>
  <div>
    <b-nav class="mt-4">
      <b-button variant="info" to="/studycheckmoduleresult" class="ml-3"
        ><i class="fa fa-list-alt"></i> ตรวจสอบผลการเรียนในแต่ละโมดูล</b-button>
    </b-nav>
    <b-container fluid>
      <b-row style="padding-top: 10px">
        <b-col>
          <h6 class="pt-3">จำนวนหน่วยกิตที่เรียนผ่านในแต่ละโมดูล</h6>
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
  components: {},
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
      selectData: []
    }
  },
  methods: {
    async getModuleOverview () {
      const stu = this.$store.state.auth.userData.id
      console.log(stu)
      await axios
        .get('http://localhost:8081/study_check_module/' + stu)
        .then((data) => {
          this.submoduleItems = data.data
        })
    }
  },
  mounted () {
    this.getModuleOverview()
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
