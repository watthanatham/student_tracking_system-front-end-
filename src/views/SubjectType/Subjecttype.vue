<template>
  <div>
    <b-nav class="mt-4">
      <b-nav-item to="/coursestructure">โครงสร้างหลักสูตร</b-nav-item>
      <b-nav-item to="/subjectType">หมวดวิชา</b-nav-item>
      <b-nav-item to="/moduleSubject">โมดูลวิชา</b-nav-item>
      <b-nav-item to="/subject">วิชา</b-nav-item>
    </b-nav>
    <b-table class="table" :items="items"></b-table>
    <b-container fluid>
      <b-row>
        <b-col>
          <b-table striped hover :items="subjecttypeItems" :fields="fields" class="text-left">
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
      await axios.get('http://localhost:8081/type_subject').then(data => {
        this.subjecttypeItems = data.data
      })
    }
  },
  data () {
    return {
      fields: [
        { key: 'sub_id', label: 'รหัสวิชา' },
        { key: 'sub_name_thai', label: 'ชื่อวิชา' },
        { key: 'sub_credit', label: 'หน่วยกิต' },
        { key: 'st_name', label: 'หมวดวิชา' }
      ],
      subjecttypeItems: [
      ],
      selectedItem: null
    }
  },
  mounted () {
    this.getSubjects()
  }
}
</script>
<style></style>
