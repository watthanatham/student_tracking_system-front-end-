<template>
  <div>
    <b-container class="pt-2">
      <p>{{ this.course_name }} \ วิชา \ {{ this.subname }}</p>
    </b-container>
    <b-container>
      <b-row>
        <b-col lg="4" class="my-3">
          <b-form-group>
            <b-input-group size="md">
              <b-form-input
                id="filter-input"
                v-model="filter"
                type="search"
                placeholder=" ค้นหาข้อมูลนิสิต"
              >
              </b-form-input>

              <b-input-group-append>
                <b-button
                  :active="!filter"
                  @click="filter = ''"
                  variant="primary"
                  style="margin-right: 5px"
                  >Clear</b-button
                >
              </b-input-group-append>
              <b-button to="/subject" variant="info"
                ><b-icon icon="arrow-left-square"></b-icon> ย้อนกลับ</b-button
              >
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col class="text-right">
          <StudentResultForm
            :studentResult="selectedItem"
            ref="StudentResultForm"
            @save="saveStudentResult"
            class="mr-10"
          ></StudentResultForm>
          <StudentResultImport
            @save="getStudentResults"
            class="ml-10"
          ></StudentResultImport>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-table
            striped
            hover
            :current-page="currentPage"
            :per-page="perPage"
            @filtered="onFiltered"
            :items="student_resutlItems"
            :filter="filter"
            :fields="fields"
            class="text-left"
          >
            <template #cell(stu_edit)="{ item }">
              <b-button @click="editStudentResult(item)" variant="warning"
                ><i class="fas fa-edit"></i
              ></b-button>
            </template>
            <template #cell(stu_del)="{ item }">
              <b-button @click="deleteStudentResult(item)" variant="danger"
                ><i class="fas fa-trash-alt"></i
              ></b-button>
            </template>
          </b-table>
          <b-col sm="1" md="6" class="my-1">
            <b-pagination
              v-model="currentPage"
              :total-rows="totalRows"
              :per-page="perPage"
              align="fill"
              size="sm"
              class="my-0"
            >
            </b-pagination>
          </b-col>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import axios from 'axios'
import StudentResultForm from './StudentResultForm.vue'
import StudentResultImport from './StudentResultImport.vue'
export default {
  components: {
    StudentResultForm,
    StudentResultImport
  },
  methods: {
    addSuccess () {
      this.$swal({
        icon: 'success',
        title: 'เพิ่มข้อมูลผลการเรียนสำเร็จ'
      })
    },
    addFailed () {
      this.$swal({
        icon: 'error',
        title: 'เพิ่มข้อมูลไม่สำเร็จ',
        text: 'เนื่องจากมีข้อมูลอยู่แล้วหรือข้อมูลไม่ถูกต้อง'
      })
    },
    editSuccess () {
      this.$swal({
        icon: 'success',
        title: 'แก้ไขข้อมูลสำเร็จ'
      })
    },
    delSuccess () {
      this.$swal({
        icon: 'success',
        title: 'ลบข้อมูลสำเร็จ'
      })
    },
    delError () {
      this.$swal({
        icon: 'error',
        title: 'ลบข้อมูลไม่สำเร็จ'
      })
    },
    async getStudentResults () {
      const courseId = this.$store.state.course_id
      const subId = this.$store.state.sub_id
      await axios
        .get('http://localhost:8081/student_result/' + courseId + '/' + subId)
        .then((data) => {
          this.student_resutlItems = data.data
          this.totalRows = data.data.length
        })
    },
    async saveStudentResult (studentresult) {
      if (!studentresult.status) {
        // add
        studentresult.sr_id = this.student_resultId
        // this.student_resutlItems.push(studentresult)
        this.student_resultId++
        const response = await axios.post('http://localhost:8081/student_result', studentresult)
        if (!response.data.status) {
          this.addFailed()
        } else {
          this.getStudentResults()
          this.addSuccess()
        }
      } else {
        // edit
        await axios.put(
          'http://localhost:8081/student_result/' + studentresult.sr_id,
          studentresult
        )
        this.getStudentResults()
        this.editSuccess()
        // const index = this.student_resutlItems.findIndex((item) => {
        //   return studentresult.sr_id === item.sr_id
        // })
        // this.student_resutlItems.splice(index, 1, studentresult)
      }
    },
    async editStudentResult (item) {
      const temp = await axios.get(
        'http://localhost:8081/student_result/result_get/' + item.sr_id
      )
      this.selectedItem = { ...temp.data[0] }
      this.oid = this.selectedItem.sr_id
      this.selectedItem.status = true
      this.$nextTick(() => {
        this.$refs.StudentResultForm.show()
      })
    },
    async deleteStudentResult (studentresult) {
      console.log(studentresult)
      if (
        confirm(
          `คุณต้องการจะลบข้อมูลนิสิต ${studentresult.stu_firstname} หรือไม่`
        )
      ) {
        const index = this.student_resutlItems.findIndex(function (item) {
          return studentresult.sr_id === item.sr_id
        })
        this.student_resutlItems.splice(index, 1)
        await axios.delete(
          'http://localhost:8081/student_result/' + studentresult.sr_id
        )
        this.getStudentResults()
        this.delSuccess()
      } else {
        this.delError()
      }
    },
    onFiltered (filteredItems) {
      console.log(filteredItems)
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
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
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      student_resutlItems: [],
      selectedItem: null,
      filter: null
    }
  },
  mounted () {
    this.getStudentResults()
    this.course_name = this.$store.state.course_name
    this.subname = this.$store.state.sub_name
  }
}
</script>
