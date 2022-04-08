<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col class="text-right">
          <CourseForm
            :course="selectedItem"
            ref="courseForm"
            @save="saveForm"
          ></CourseForm>
        </b-col>
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
import CourseForm from './CourseForm.vue'
export default {
  components: {
    CourseForm
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
    async saveForm (course) {
      // add
      await axios.post('http://localhost:8081/course', course)
      this.getCourses()
    }
  },
  data () {
    return {
      fields: [
        { key: 'course_id', label: 'รหัสหลักสูตร' },
        { key: 'course_name', label: 'ชื่อหลักสูตร' },
        { key: 'course_totalcredit', label: 'หน่วยกิตรวม' }
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
