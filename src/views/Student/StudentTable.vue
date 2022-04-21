<template>
  <div>
    <b-container>
      <br>
      <h6>ข้อมูลนิสิต</h6>
    </b-container>
    <b-container fluid>
      <b-row>
         <b-col lg="3" class="textsearch" >
          <b-form-group>
          <b-input-group size="md">
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder=" ค้นหาข้อมูลนิสิต">
            </b-form-input>

            <b-input-group-append>
              <b-button :active="!filter" @click="filter = ''" variant="primary">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
          </b-form-group>
        </b-col>
        <b-col class="text-right">
          <StudentForm
            :student="selectedItem"
            ref="StudentForm"
            @save="saveStudent"
            class="mr-10"
          ></StudentForm>
          <StudentImport @save="getStudents" class="ml-10"> </StudentImport>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <h6>ข้อมูลนิสิต</h6>
          <b-table
            :current-page="currentPage"
            :per-page="perPage"
            :filter="filter"
            @filtered="onFiltered"
            striped
            hover
            :items="studentItems"
            :fields="fields"
            class="tableStudent"
          >
            <template #cell(stu_edit)="{ item }">
              <b-button @click="editStudent(item)" variant="warning"
                ><i class="fas fa-edit"></i
              ></b-button>
            </template>
            <template #cell(stu_del)="{ item }">
              <b-button @click="deleteStudent(item)" variant="danger"
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
                class="my-0">
              </b-pagination>
          </b-col>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import axios from 'axios'
import StudentForm from './StudentForm.vue'
import StudentImport from './StudentImport.vue'
export default {
  components: {
    StudentForm,
    StudentImport
  },
  methods: {
    addSuccess () {
      this.$swal({
        icon: 'success',
        title: 'เพิ่มข้อมูลนิสิตสำเร็จ'
      })
    },
    editSuccess () {
      this.$swal({
        icon: 'success',
        title: 'แก้ไขข้อมูลนิสิตสำเร็จ'
      })
    },
    delSuccess () {
      this.$swal({
        icon: 'success',
        title: 'ลบข้อมูลนิสิตสำเร็จ'
      })
    },
    delError () {
      this.$swal({
        icon: 'error',
        title: 'ลบข้อมูลไม่สำเร็จ'
      })
    },
    addFailed () {
      this.$swal({
        icon: 'error',
        title: 'เพิ่มข้อมูลไม่สำเร็จ',
        text: 'เนื่องจากมีข้อมูลอยู่แล้วหรือข้อมูลไม่ถูกต้อง'
      })
    },
    async getStudents () {
      await axios.get('http://localhost:8081/student').then((data) => {
        this.studentItems = data.data
        this.totalRows = data.data.length
      })
    },
    save (status) {
      console.log('ok: ', status)
      this.getStudents()
    },
    async saveStudent (student) {
      if (!student.status) {
        // add
        const response = await axios.post('http://localhost:8081/student', student)
        if (!response.data.status) {
          this.addFailed()
        } else {
          this.getStudents()
          this.addSuccess()
        }
      } else {
        // save
        await axios.put(
          'http://localhost:8081/student/' + student.stu_id,
          student
        )
        this.getStudents()
        this.editSuccess()
      }
    },
    async editStudent (item) {
      const temp = await axios.get(
        'http://localhost:8081/student/' + item.stu_id
      )
      this.selectedItem = { ...temp.data[0] }
      this.oid = this.selectedItem.stu_id
      this.selectedItem.status = true
      this.$nextTick(() => {
        this.$refs.StudentForm.show()
      })
    },
    async deleteStudent (student) {
      console.log(student)
      if (
        confirm(`คุณต้องการจะลบข้อมูลนิสิต ${student.stu_firstname} หรือไม่`)
      ) {
        const index = this.studentItems.findIndex(function (item) {
          return student.stu_id === item.stu_id
        })
        this.studentItems.splice(index, 1)
        await axios.delete('http://localhost:8081/student/' + student.stu_id)
        this.getStudents()
        this.delSuccess()
      } else {
        this.delError()
      }
    },
    onFiltered (filteredItems) {
      console.log(filteredItems)
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
        { key: 'stu_edit', label: 'แก้ไข' },
        { key: 'stu_del', label: 'ลบข้อมูล' }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 8,
      filter: null,
      studentItems: [],
      selectedItem: null
    }
  },
  mounted () {
    this.getStudents()
  }
}
</script>
<style scoped lang="scss">
.tableStudent {
  text-align: center;
  margin-inline-end: 300px;
  background-color: whitesmoke;
}
.textsearch {
  margin-block-start: 17px;
}
</style>
