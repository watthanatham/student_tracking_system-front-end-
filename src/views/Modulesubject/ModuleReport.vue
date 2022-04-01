<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col>
          <b-table
            striped
            hover
            :items="reportItems"
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
        { key: 'stu_id', label: 'รหัสนิสิต' },
        { key: 'stu_firstname', label: 'ชื่อ' },
        { key: 'stu_lastname', label: 'นามสกุล' }
      ],
      reportItems: [],
      selectedItem: null
    }
  },
  methods: {
    async getModuleReports () {
      const cid = this.$store.state.course_id
      const subId = this.$store.state.sub_id
      const year = this.$store.state.stu_year
      const mid = this.$store.state.module_id
      await axios
        .get('http://localhost:8081/model_subject/module_report/' + year + '/' + cid + '/' + mid + '/' + subId)
        .then((data) => {
          console.log(data.data)
          this.reportItems = data.data
        })
    }
  },
  mounted () {
    this.getModuleReports()
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
