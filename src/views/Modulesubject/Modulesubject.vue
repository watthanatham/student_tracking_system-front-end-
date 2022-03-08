<template>
  <div>
    <b-nav class="mt-4">
      <b-nav-item to="/coursestructure">โครงสร้างหลักสูตร</b-nav-item>
      <b-nav-item to="/subjectType">หมวดวิชา</b-nav-item>
      <b-nav-item to="/moduleSubject">โมดูลวิชา</b-nav-item>
      <b-nav-item to="/subject">วิชา</b-nav-item>
    </b-nav>
    <b-nav-form class="nav4">
      <b-form-input
        size="sm"
        class="mr-sm-2"
        placeholder="Search"
      ></b-form-input>
      <b-button size="sm" class="search" type="submit">Search</b-button>
    </b-nav-form>
    <b-table class="table" :items="items"></b-table>
    <b-container fluid>
      <b-row>
        <b-col>
          <b-table :items="subjectItems" :fields="fields" class="tableModule">
          <!-- <b-table striped hover :items="subjectItems" :fields="fields" class="text-left"> -->
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
      await axios.get('http://localhost:8081/model_subject').then(data => {
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
  width: 1331px;
  margin-inline-end: 10px;
  background-color: whitesmoke;
}
</style>
