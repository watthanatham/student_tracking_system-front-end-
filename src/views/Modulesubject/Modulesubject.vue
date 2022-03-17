<template>
  <div>
    <b-nav class="mt-4">
      <b-nav-item to="/coursestructure">โครงสร้างหลักสูตร</b-nav-item>
      <b-nav-item to="/subject_type">หมวดวิชา</b-nav-item>
      <b-nav-item to="/modulesubject">โมดูลวิชา</b-nav-item>
      <b-nav-item to="/subject">วิชา</b-nav-item>
    </b-nav>
    <b-dropdown id="dropdown-1" text="เลือกโมดูล" variant="outline-primary" class="m-md-2">
      <b-dropdown-item href="#">โมดูล 1</b-dropdown-item>
      <b-dropdown-item href="#">โมดูล 2</b-dropdown-item>
      <b-dropdown-item href="#">โมดูล 3</b-dropdown-item>
      <b-dropdown-item href="#">โมดูล 4</b-dropdown-item>
      <b-dropdown-item href="#">โมดูล 5</b-dropdown-item>
      <b-dropdown-item href="#">โมดูล 6</b-dropdown-item>
      <b-dropdown-item href="#">โมดูล 7</b-dropdown-item>
    </b-dropdown>
    <b-button pill variant="outline-secondary">search</b-button>
    <b-container fluid>
      <b-row>
        <b-col>
          <b-table striped hover :items="subjectItems" :fields="fields" class="text-left">
          </b-table>
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
      const id = this.$store.state.course_id
      await axios.get('http://localhost:8081/model_subject/' + id).then(data => {
        this.subjectItems = data.data
      })
    }
  },
  data () {
    return {
      fields: [
        { key: 'sub_id', label: 'รหัสวิชา' },
        { key: 'sub_name_thai', label: 'ชื่อวิชา' },
        { key: 'module_name', label: 'โมดูล' }
      ],
      subjectItems: [
      ],
      selectedItem: null
    }
  },
  mounted () {
    this.getSubjects()
  }
}
</script>
<style>
.tableModule{
  text-align: center;
  margin-inline-end: 10px;
  background-color: whitesmoke;
}
</style>
