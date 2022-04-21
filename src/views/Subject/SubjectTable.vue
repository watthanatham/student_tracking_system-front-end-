<template>
  <div>
    <b-container class="pt-2">
      <h6>{{ course_name }}</h6>
    </b-container>
    <b-nav class="mt-4">
      <b-nav-item to="/coursestructure">โครงสร้างหลักสูตร</b-nav-item>
      <b-nav-item to="/module_structure">โมดูล</b-nav-item>
      <b-nav-item to="/subject_type">รายวิชาแต่ละหมวดวิชา</b-nav-item>
      <b-nav-item to="/moduleSubject">รายวิชาแต่ละโมดูล</b-nav-item>
      <b-nav-item to="/subject">วิชาในหลักสูตร</b-nav-item>
    </b-nav>
    <b-container fluid style="padding: 0px">
      <b-row>
        <b-col lg="4" class="textsearchsubject">
          <b-form-group>
            <b-input-group size="md">
              <b-form-input
                id="filter-input"
                v-model="filter"
                type="search"
                placeholder=" ค้นหาข้อมูลวิชา"
              >
              </b-form-input>

              <b-input-group-append>
                <b-button
                  :active="!filter"
                  @click="filter = ''"
                  variant="primary"
                  >Clear</b-button
                >
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col>
          <SubjectForm
            :subject="selectedItem"
            ref="SubjectForm"
            @save="saveSubject"
            class="mr-10"
          ></SubjectForm>
          <SubjectImport @save="getSubjects" class="ml-10"> </SubjectImport>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <h6 class="pt-1">ตารางวิชาในหลักสูตร</h6>
          <b-table
            striped
            hover
            :current-page="currentPage"
            :per-page="perPage"
            @filtered="onFiltered"
            :filter="filter"
            :items="subjectItems"
            :fields="fields"
            class="tableSubject"
          >
            <template #cell(sub_edit)="{ item }">
              <b-button @click="editSubject(item)" variant="warning"
                ><i class="fas fa-edit"></i
              ></b-button>
            </template>
            <template #cell(sub_del)="{ item }">
              <b-button @click="deleteSubject(item)" variant="danger"
                ><i class="fas fa-trash-alt"></i
              ></b-button>
            </template>
            <template #cell(sub_inspect)="{ item }">
              <b-button @click="selectedSubject(item)" variant="info"
                ><i class="fa fa-search"></i
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
import SubjectForm from './SubjectForm.vue'
import SubjectImport from './SubjectImport.vue'
export default {
  components: {
    SubjectForm,
    SubjectImport
  },
  methods: {
    addSuccess () {
      this.$swal({
        icon: 'success',
        title: 'เพิ่มข้อมูลวิชาสำเร็จ'
      })
    },
    editSuccess () {
      this.$swal({
        icon: 'success',
        title: 'แก้ไขข้อมูลวิชาสำเร็จ'
      })
    },
    delSuccess () {
      this.$swal({
        icon: 'success',
        title: 'ลบข้อมูลวิชาสำเร็จ'
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
    selectedSubject (item, index, evt) {
      console.log(item.sub_id)
      this.$store.dispatch('setSub', item.sub_id)
      this.$store.dispatch('setSubName', item.sub_name_thai)
      localStorage.setItem('sub_id', item.sub_id)
      localStorage.setItem('sub_name', item.sub_name_thai)
      this.$router.push({ path: '/student_result' })
    },
    async getSubjects () {
      const id = this.$store.state.course_id
      await axios.get('http://localhost:8081/subject/' + id).then((data) => {
        this.subjectItems = data.data
        this.totalRows = data.data.length
      })
    },
    async saveSubject (subject) {
      if (!subject.status) {
        const response = await axios.post(
          'http://localhost:8081/subject',
          subject
        )
        if (!response.data.status) {
          this.addFailed()
        } else {
          this.getSubjects()
          this.addSuccess()
        }
      } else {
        // save
        await axios.put(
          'http://localhost:8081/subject/' + subject.sub_id,
          subject
        )
        this.getSubjects()
        this.editSuccess()
      }
    },
    async editSubject (item) {
      const temp = await axios.get(
        'http://localhost:8081/subject/sub/' + item.sub_id
      )
      this.selectedItem = { ...temp.data[0] }
      console.log(temp)
      this.oid = this.selectedItem.sub_id
      this.selectedItem.status = true
      this.$nextTick(() => {
        this.$refs.SubjectForm.show()
      })
    },
    async deleteSubject (subject) {
      console.log(subject)
      if (
        confirm(`คุณต้องการจะลบข้อมูลวิชา ${subject.sub_name_thai} หรือไม่`)
      ) {
        const index = this.subjectItems.findIndex(function (item) {
          return subject.sub_id === item.sub_id
        })
        this.subjectItems.splice(index, 1)
        await axios.delete('http://localhost:8081/subject/' + subject.sub_id)
        this.getSubjects()
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
      course_name: '',
      oid: '',
      fields: [
        { key: 'sub_id', label: 'รหัสวิชา' },
        { key: 'sub_name_thai', label: 'ชื่อวิชาภาษาไทย' },
        { key: 'sub_name_eng', label: 'ชื่อวิชาภาษาอังกฤษ' },
        { key: 'sub_credit', label: 'หน่วยกิต' },
        { key: 'st_name', label: 'หมวดวิชา' },
        { key: 'module_name', label: 'โมดูล' },
        { key: 'sub_edit', label: 'แก้ไข' },
        { key: 'sub_del', label: 'ลบข้อมูล' },
        { key: 'sub_inspect', label: 'ตรวจสอบผลการเรียน' }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      subjectItems: [],
      selectedItem: null,
      filter: null
    }
  },
  mounted () {
    this.getSubjects()
    this.course_name = this.$store.state.course_name
  }
}
</script>
<style scoped lang="scss">
.tableSubject {
  text-align: left;
  margin-inline-end: 300px;
  margin-top: -30px;
  background-color: whitesmoke;
  & tr {
    cursor: pointer;
  }
}
// .my-1 {
//   margin-inline-start: 757px;
// }
.textsearchsubject {
  margin-block-start: 20px;
}
</style>
