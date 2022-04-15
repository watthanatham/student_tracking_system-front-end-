<template>
  <div>
    <b-nav class="mt-4">
      <b-nav-item to="/coursestructure">โครงสร้างหลักสูตร</b-nav-item>
      <b-nav-item to="/module_structure">โครงสร้างโมดูล</b-nav-item>
      <b-nav-item to="/subject_type">รายวิชา</b-nav-item>
      <b-nav-item to="/moduleSubject">โมดูล</b-nav-item>
      <b-nav-item to="/subject">วิชา</b-nav-item>
    </b-nav>
 <b-container>
      <b-row>
        <b-col class="text-right">
          <CoursestructureForm
            :course="selectedItem"
            ref="coursestructureForm"
            @save="saveCourseStructure"
          ></CoursestructureForm>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-table striped hover :items="courseItems" :fields="fields" class="tablecourse">
            <template #cell(st_edit)="{ item }">
              <b-button @click="editCourse(item)" variant="warning"><i class="fas fa-edit"></i></b-button>
            </template>
            <template #cell(st_del)="{ item }">
              <b-button @click="deleteCourse(item)" variant="danger"
                ><i class="fas fa-trash-alt"></i></b-button
              >
            </template>
          </b-table>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import axios from 'axios'
import CoursestructureForm from './CoursestructureForm.vue'
export default {
  components: {
    CoursestructureForm
  },
  methods: {
    addSuccess () {
      this.$swal({
        icon: 'success',
        title: 'เพิ่มข้อมูลสำเร็จ'
      })
    },
    editSuccess () {
      this.$swal({
        icon: 'success',
        title: 'แก้ไขข้อมูลสำเร็จ'
      })
    },
    async getCourseStructure () {
      const id = this.$store.state.course_id
      await axios.get('http://localhost:8081/subject_type/' + id).then(data => {
        this.courseItems = data.data
        console.log(data.data)
      })
    },
    async saveCourseStructure (course) {
      if (course.st_id < 0) { // add
        course.st_id = this.courseId
        this.courseItems.push(course)
        this.courseId++
        await axios.post('http://localhost:8081/subject_type/', course)
        this.getCourseStructure()
        this.addSuccess()
      } else { // edit
        const index = this.courseItems.findIndex((item) => {
          return course.st_id === item.st_id
        })
        this.courseItems.splice(index, 1, course)
        await axios.put('http://localhost:8081/subject_type/' + course.st_id, course)
        this.getCourseStructure()
        this.editSuccess()
      }
    },
    async editCourse (item) {
      console.log(item.st_id)
      const temp = await axios.get('http://localhost:8081/subject_type/search_id/' + item.st_id)
      this.selectedItem = { ...temp.data[0] }
      console.log(temp.data[0])
      this.oid = this.selectedItem.st_id
      this.$nextTick(() => {
        this.$refs.coursestructureForm.show()
      })
    }
    // async deleteCourse (subject) {
    //   console.log(subject)
    //   if (confirm(`คุณต้องการจะลบข้อมูลหมวดวิชา ${subject.st_name} หรือไม่`)) {
    //     const index = this.courseItems.findIndex(function (item) {
    //       return subject.st_id === item.st_id
    //     })
    //     this.courseItems.splice(index, 1)
    //     await axios.delete('http://localhost:8081/subject_type/' + subject.st_id)
    //     this.getCourseStructure()
    //   }
    // }
  },
  data () {
    return {
      oid: '',
      fields: [
        { key: 'st_name', label: 'หัวข้อ' },
        { key: 'st_credit', label: 'หน่วยกิต' },
        { key: 'st_edit', label: 'แก้ไข' }
      ],
      courseItems: [
      ],
      selectedItem: null
    }
  },
  mounted () {
    this.getCourseStructure()
  }
}
</script>
<style scoped>
.mt-4 {
  margin-inline-end: 150px;
}
.tablecourse{
  text-align: center;
  margin-block-start: 15px;
  background-color: whitesmoke;
}
</style>
