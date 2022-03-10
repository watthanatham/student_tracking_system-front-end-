<template>
  <div>
    <b-nav class="mt-4">
      <b-nav-item to="/coursestructure">โครงสร้างหลักสูตร</b-nav-item>
      <b-nav-item to="/subject_type">หมวดวิชา</b-nav-item>
      <b-nav-item to="/modulesubject">โมดูลวิชา</b-nav-item>
      <b-nav-item to="/subject">วิชา</b-nav-item>
    </b-nav>
    <b-table class="tablesubjecttype" :items="items"></b-table>
    <b-container fluid>
      <b-row>
        <b-col>
          <b-table striped hover :items="subjecttypeItems" :fields="fields" class="tabletypesubject">
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
      await axios.get('http://localhost:8081/type_subject/' + id).then(data => {
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
        {
          sub_id: 1,
          sub_name_thai: 'ม็อก',
          sub_credit: 2,
          st_name: 'ศึกษาทั่วไป'
        }
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
.tablesubjecttype{
  text-align: center;
  margin-inline-end: 300px;
  margin-block-start: 15px;
  background-color: whitesmoke;
}</style>
