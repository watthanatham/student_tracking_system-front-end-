<template>
  <div>
    <b-container>
      <b-row>
        <b-col class="text-right">
          <StudentResultForm
            :studentResult="selectedItem"
            ref="StudentResultForm"
            @save="saveStudent"
          ></StudentResultForm>
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
import StudentResultForm from './StudentResultForm.vue'
export default {
  components: {
    StudentResultForm
  },
  methods: {
    async getStudentResults () {
      const courseId = this.$store.state.course_id
      const subId = this.$store.state.sub_id
      await axios.get('http://localhost:8081/student_result/' + courseId + '/' + subId).then(data => {
        this.student_resutlItems = data.data
        console.log(this.student_resutlItems)
      })
    },
    async saveStudent (studentresult) {
      if (!studentresult.status) { // add
        studentresult.sr_id = this.student_resultId
        // this.student_resutlItems.push(studentresult)
        this.student_resultId++
        await axios.post('http://localhost:8081/student_result', studentresult)
        this.getStudentResults()
      } else { // edit
        await axios.put('http://localhost:8081/student_result/' + studentresult.sr_id, studentresult)
        this.getStudentResults()
        // const index = this.student_resutlItems.findIndex((item) => {
        //   return studentresult.sr_id === item.sr_id
        // })
        // this.student_resutlItems.splice(index, 1, studentresult)
      }
    },
    async editStudentResult (item) {
      const temp = await axios.get('http://localhost:8081/student_result/result_get/' + item.sr_id)
      this.selectedItem = { ...temp.data[0] }
      console.log(temp)
      this.oid = this.selectedItem.sr_id
      this.selectedItem.status = true
      this.$nextTick(() => {
        this.$refs.StudentResultForm.show()
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
      oid: '',
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
