<template>
  <div>
    <b-nav class="mt-4">
      <b-nav-item to="/coursestructure">โครงสร้างหลักสูตร</b-nav-item>
      <b-nav-item to="/subject_type">หมวดวิชา</b-nav-item>
      <b-nav-item to="/moduleSubject">โมดูลวิชา</b-nav-item>
      <b-nav-item to="/subject">วิชา</b-nav-item>
    </b-nav>
 <b-container>
      <b-row>
        <b-col class="text-right">
          <CoursestructureForm
            :subject="selectedItem"
            ref="coursestructureForm"
            @save="saveSubject"
          ></CoursestructureForm>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-table :items="subjectItems" :fields="fields" class="tablecourse">
            <template #cell(st_edit)="{ item }">
              <b-button @click="editSubject(item)" variant="warning"><i class="fas fa-edit"></i></b-button>
            </template>
            <template #cell(st_del)="{ item }">
              <b-button @click="deleteSubject(item)" variant="danger"
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
    async getSubjects () {
      const id = this.$store.state.course_id
      await axios.get('http://localhost:8081/subject_type/' + id).then(data => {
        this.subjectItems = data.data
      })
    },
    async saveSubject (subject) {
      if (subject.st_id < 0) { // add
        subject.st_id = this.subjectId
        this.subjectItems.push(subject)
        this.subjectId++
        await axios.post('http://localhost:8081/subject_type', subject)
        this.getSubjects()
      } else { // save
        const index = this.subjectItems.findIndex((item) => {
          return subject.st_id === item.st_id
        })
        this.subjectItems.splice(index, 1, subject)
        await axios.put('http://localhost:8081/subject_type/' + subject.st_id, subject)
        this.getSubjects()
      }
    },
    editSubject (item) {
      this.selectedItem = JSON.parse(JSON.stringify(item))
      this.selectedItem = { ...item }
      this.$nextTick(() => {
        this.$refs.coursestructureForm.show()
      })
    },
    async deleteSubject (subject) {
      console.log(subject)
      if (confirm(`คุณต้องการจะลบข้อมูลหมวดวิชา ${subject.st_name} หรือไม่`)) {
        const index = this.subjectItems.findIndex(function (item) {
          return subject.st_id === item.st_id
        })
        this.subjectItems.splice(index, 1)
        await axios.delete('http://localhost:8081/subject_type/' + subject.st_id)
        this.getSubjects()
      }
    }
  },
  data () {
    return {
      fields: [
        { key: 'st_name', label: 'หัวข้อ' },
        { key: 'st_credit', label: 'หน่วยกิต' },
        { key: 'st_edit', label: 'แก้ไข' }
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
.mt-4 {
  margin-inline-end: 150px;
}
.tablecourse{
  text-align: center;
  margin-block-start: 15px;
  background-color: whitesmoke;
}
</style>
