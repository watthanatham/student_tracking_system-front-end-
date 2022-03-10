<template>
  <div>
    <!-- <b-nav class="mt-4">
      <b-nav-item to="/coursestructure">โครงสร้างหลักสูตร</b-nav-item>
      <b-nav-item to="/subject_type">หมวดวิชา</b-nav-item>
      <b-nav-item to="/modulesubject">โมดูลวิชา</b-nav-item>
      <b-nav-item to="/subject">วิชา</b-nav-item>
    </b-nav> -->
    <b-container fluid>
      <b-row>
        <!-- <b-col class="text-right">
          <SubjectForm
            :subject="selectedItem"
            ref="subjectForm"
            @save="saveSubject"
          ></SubjectForm>
        </b-col> -->
      </b-row>
      <b-row>
        <b-col>
          <b-table striped hover :items="courseItems" :fields="fields" class="tablecoursecourse" @row-clicked="selectedCourse">
          </b-table>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import axios from 'axios'
// import SubjectForm from './SubjectForm.vue'
export default {
  components: {
    // SubjectForm
  },
  methods: {
    selectedCourse (item, index, evt) {
      this.$store.dispatch('setCourse', item.course_id)
      this.$router.push({ path: '/coursestructure' })
    },
    async getCourses () {
      await axios.get('http://localhost:8081/course').then(data => {
        this.courseItems = data.data
      })
    },
    async saveSubject (subject) {
      // add
      subject.sub_id = this.subjectId
      this.courseItems.push(subject)
      this.subjectId++
      await axios.post('http://localhost:8081/subject', subject)
      this.getCourses()
    }
  },
  data () {
    return {
      fields: [
        { key: 'course_id', label: 'ลำดับ' },
        { key: 'course_name', label: 'ชื่อหลักสูตร' }
      ],
      courseItems: [
      ],
      selectedItem: null
    }
  },
  mounted () {
    this.getCourses()
  }
}
</script>
<style lang="scss">
.tablecoursecourse{
  text-align: center;
  margin-inline-end: 300px;
  margin-block-start: 40px;
  background-color: whitesmoke;
  & tr {
    cursor: pointer;
  }
}
</style>
