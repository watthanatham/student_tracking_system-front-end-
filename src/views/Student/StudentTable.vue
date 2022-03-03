<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col class="text-right">
          <StudentForm
            :student="selectedItem"
            ref="StudentForm"
            @save="saveStudent"
          ></StudentForm>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-table striped hover :items="studentItems" :fields="fields" class="text-left">
            <template #cell(stu_edit)="{ item }">
              <b-button @click="editStudent(item)" variant="warning"><i class="fas fa-edit"></i></b-button>
            </template>
            <template #cell(stu_del)="{ item }">
              <b-button @click="deleteStudent(item)" variant="danger"
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
import StudentForm from './StudentForm.vue'
export default {
  components: {
    StudentForm
  },
  methods: {
    async getStudents () {
      await axios.get('http://localhost:8081/student').then(data => {
        this.studentItems = data.data
      })
    },
    async saveStudent (student) {
      console.log(student)
      if (!student.status) { // add
        // student.stu_id = this.studentId
        this.studentItems.push(student)
        // this.studentId++
        await axios.post('http://localhost:8081/student', student)
        this.getStudents()
      } else { // save
        console.log(student)
        await axios.put('http://localhost:8081/student/' + student.stu_id, student)
        this.getStudents()
      }
    },
    async editStudent (item) {
      const temp = await axios.get('http://localhost:8081/student/' + item.stu_id)
      // console.log(temp.data[0])
      this.selectedItem = { ...temp.data[0] }
      this.oid = this.selectedItem.stu_id
      this.selectedItem.status = true
      this.$nextTick(() => {
        this.$refs.StudentForm.show()
      })
    },
    async deleteStudent (student) {
      console.log(student)
      if (confirm(`คุณต้องการจะลบข้อมูลนิสิต ${student.stu_firstname} หรือไม่`)) {
        const index = this.studentItems.findIndex(function (item) {
          return student.stu_id === item.stu_id
        })
        this.studentItems.splice(index, 1)
        await axios.delete('http://localhost:8081/student/' + student.stu_id)
        this.getStudents()
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
        { key: 'stu_edit', label: 'แก้ไข' },
        { key: 'stu_del', label: 'ลบข้อมูล' }
      ],
      studentItems: [
      ],
      selectedItem: null
    }
  },
  mounted () {
    this.getStudents()
  }
}
</script>
<style></style>
