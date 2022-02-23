<template>
  <div>
    <b-nav class="mt-4">
      <h3>วิชา :</h3>
      <b-nav-item to="/formInput2">โครงสร้างหลักสูตร</b-nav-item>
      <b-nav-item to="/formInput3">หมวดวิชา</b-nav-item>
      <b-nav-item to="/formInput4">โมดูลวิชา</b-nav-item>
      <b-nav-item to="/subject">วิชา</b-nav-item>
    </b-nav>
    <b-container fluid>
      <b-row>
        <b-col class="text-right">
          <SubjectForm
            :subject="selectedItem"
            ref="subjectForm"
            @save="saveSubject"
          ></SubjectForm>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-table :items="subjectItems" :fields="fields" class="text-left">
            <template #cell(sub_edit)="{ item }">
              <b-button @click="editSubject(item)" variant="warning"><i class="fas fa-edit"></i></b-button>
            </template>
            <template #cell(sub_del)="{ item }">
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
import SubjectForm from './SubjectForm.vue'
export default {
  components: {
    SubjectForm
  },
  methods: {
    async getSubjects () {
      await axios.get('http://localhost:8081/subject').then(data => {
        this.subjectItems = data.data
      })
    },
    async saveSubject (subject) {
      if (subject.sub_id < 0) { // add
        subject.sub_id = this.subjectId
        this.subjectItems.push(subject)
        this.subjectId++
        await axios.post('http://localhost:8081/subject', subject)
        this.getSubjects()
      } else { // save
        const index = this.subjectItems.findIndex((item) => {
          return subject.sub_id === item.sub_id
        })
        this.subjectItems.splice(index, 1, subject)
        await axios.put('http://localhost:8081/subject/' + subject.sub_id, subject)
        this.getSubjects()
      }
    },
    editSubject (item) {
      this.selectedItem = JSON.parse(JSON.stringify(item))
      this.selectedItem = { ...item }
      this.$nextTick(() => {
        this.$refs.subjectForm.show()
      })
    },
    async deleteSubject (subject) {
      console.log(subject)
      if (confirm(`คุณต้องการจะลบข้อมูลวิชา ${subject.sub_name_thai} หรือไม่`)) {
        const index = this.subjectItems.findIndex(function (item) {
          return subject.sub_id === item.sub_id
        })
        this.subjectItems.splice(index, 1)
        await axios.delete('http://localhost:8081/subject/' + subject.sub_id)
        this.getSubjects()
      }
    }
  },
  data () {
    return {
      fields: [
        { key: 'sub_id', label: 'No' },
        { key: 'sub_code', label: 'รหัสวิชา' },
        { key: 'sub_name_thai', label: 'ชื่อวิชาภาษาไทย' },
        { key: 'sub_name_eng', label: 'ชื่อวิชาภาษาอังกฤษ' },
        { key: 'sub_credit', label: 'หน่วยกิต' },
        { key: 'st_id', label: 'หมวดวิชา' },
        { key: 'module_id', label: 'โมดูล' },
        { key: 'sub_edit', label: 'แก้ไข' },
        { key: 'sub_del', label: 'ลบข้อมูล' }
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
<style></style>
