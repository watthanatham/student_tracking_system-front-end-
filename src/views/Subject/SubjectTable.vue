<template>
  <div>
    <b-nav class="mt-4">
      <b-nav-item to="/coursestructure">โครงสร้างหลักสูตร</b-nav-item>
      <b-nav-item to="/subject_type">หมวดวิชา</b-nav-item>
      <b-nav-item to="/modulesubject">โมดูลวิชา</b-nav-item>
      <b-nav-item to="/subject">วิชา</b-nav-item>
    </b-nav>
    <b-container fluid>
      <b-row>
        <b-col>
          <SubjectForm
            :subject="selectedItem"
            ref="SubjectForm"
            @save="saveSubject"
            class="mr-10"
          ></SubjectForm>
          <SubjectImport
          @save="getSubjects"
          class="ml-10">
          </SubjectImport>
        </b-col>
      </b-row>
      <b-row>
        <b-col style="padding:0">
          <b-table striped hover :items="subjectItems" :fields="fields" class="tableSubject" @row-clicked="selectedSubject">
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
import SubjectImport from './SubjectImport.vue'
export default {
  components: {
    SubjectForm,
    SubjectImport
  },
  methods: {
    selectedSubject (item, index, evt) {
      console.log(item.sub_id)
      this.$store.dispatch('setSub', item.sub_id)
      this.$router.push({ path: '/student_result' })
    },
    async getSubjects () {
      const id = this.$store.state.course_id
      await axios.get('http://localhost:8081/subject/' + id).then(data => {
        this.subjectItems = data.data
      })
    },
    async saveSubject (subject) {
      if (!subject.status) { // add
        // this.subjectItems.push(subject)
        await axios.post('http://localhost:8081/subject', subject)
        this.getSubjects()
      } else { // save
        await axios.put('http://localhost:8081/subject/' + subject.sub_id, subject)
        this.getSubjects()
      }
    },
    async editSubject (item) {
      const temp = await axios.get('http://localhost:8081/subject/sub/' + item.sub_id)
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
      oid: '',
      fields: [
        { key: 'sub_id', label: 'รหัสวิชา' },
        { key: 'sub_name_thai', label: 'ชื่อวิชาภาษาไทย' },
        { key: 'sub_name_eng', label: 'ชื่อวิชาภาษาอังกฤษ' },
        { key: 'sub_credit', label: 'หน่วยกิต' },
        { key: 'st_name', label: 'หมวดวิชา' },
        { key: 'module_name', label: 'โมดูล' },
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
<style lang="scss">
tableSubject{
  text-align: center;
  margin-inline-end: 300px;
  background-color: whitesmoke;
  & tr {
    cursor: pointer;
  }
}
</style>
