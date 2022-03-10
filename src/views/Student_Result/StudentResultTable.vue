<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col class="text-right">
          <!-- <StudentResultForm
            :student="selectedItem"
            ref="StudentResultForm"
            @save="saveStudent"
          ></StudentResultForm> -->
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-table striped hover :items="student_resutlItems" :fields="fields" class="text-left">
            <template #cell(stu_edit)="{ item }">
              <b-button @click="editStudentResult(item)" variant="warning"><i class="fas fa-edit"></i></b-button>
            </template>
            <template #cell(stu_del)="{ item }">
              <b-button @click="deleteStudentResult(item)" variant="danger"
                ><i class="fas fa-trash-alt"></i></b-button>
            </template>
          </b-table>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import axios from 'axios'
// import StudentForm from './StudentResultForm.vue'
export default {
  components: {
    // StudentResultForm
  },
  methods: {
    async getStudentResults () {
      await axios.get('http://localhost:8081/student_result').then(data => {
        this.student_resutlItems = data.data
      })
    },
    async saveStudent (studentresult) {
      if (studentresult.sr_id < 0) { // add
        studentresult.sr_id = this.student_resultId
        this.student_resutlItems.push(studentresult)
        this.student_resultId++
        await axios.post('http://localhost:8081/student_result', studentresult)
        this.getStudentResults()
      } else { // save
        const index = this.student_resutlItems.findIndex((item) => {
          return studentresult.sr_id === item.sr_id
        })
        this.student_resutlItems.splice(index, 1, studentresult)
        await axios.put('http://localhost:8081/student_result/' + studentresult.sr_id, studentresult)
        this.getStudentResults()
      }
    },
    editStudentResult (item) {
      this.selectedItem = JSON.parse(JSON.stringify(item))
      this.selectedItem = { ...item }
      this.$nextTick(() => {
        this.$refs.StudentForm.show()
      })
    },
    async deleteStudentResult (studentresult) {
      console.log(studentresult)
      if (confirm(`คุณต้องการจะลบข้อมูลนิสิต ${studentresult.stu_firstname} หรือไม่`)) {
        const index = this.student_resutlItems.findIndex(function (item) {
          return studentresult.sr_id === item.sr_id
        })
        this.student_resutlItems.splice(index, 1)
        await axios.delete('http://localhost:8081/student_result/' + studentresult.sr_id)
        this.getStudentResults()
      }
    }
  },
  data () {
    return {
      fields: [
        { key: 'stu_id', label: 'รหัสนิสิต' },
        { key: 'stu_firstname', label: 'ชื่อ' },
        { key: 'stu_lastname', label: 'นามสกุล' },
        { key: 'sr_year', label: 'ปีการศึกษา' },
        { key: 'sr_term', label: 'เทอม' },
        { key: 'sr_grade', label: 'ผลการศึกษา' },
        { key: 'stu_edit', label: 'แก้ไข' },
        { key: 'stu_del', label: 'ลบข้อมูล' }
      ],
      student_resutlItems: [
      ],
      selectedItem: null
    }
  },
  mounted () {
    this.getStudentResults()
  }
}
</script>
<style></style>
