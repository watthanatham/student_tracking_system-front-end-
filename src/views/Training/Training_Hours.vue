<template>
  <div>
    <b-container fluid>
      <b-row>
        <!-- <b-col class="text-right">
          <SubjectForm
            :subject="selectedItem"
            ref="subjectForm"
            @save="saveSubject"
          ></SubjectForm>
        </b-col> -->
      </b-row>
      <b-row>
        <b-col>
          <b-table striped hover :items="subjectItems" :fields="fields" class="text-left">
            <template #cell(sub_edit)="{ item }">
              <b-button @click="editSubject(item)" variant="warning"><i class="fas fa-edit"></i></b-button>
            </template>
          </b-table>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import axios from 'axios'
// import SubjectForm from './SubjectForm.vue'
export default {
  components: {
    // SubjectForm
  },
  methods: {
    async getSubjects () {
      await axios.get('http://localhost:8081/training_hours').then(data => {
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
        { key: 'th_id', label: 'No' },
        { key: 'th_section', label: 'หัวข้อการอบรม' },
        { key: 'th_hours', label: 'จำนวนชั่วโมงที่เข้าร่วม' },
        { key: 'th_status', label: 'สถานะการดำเนินการ' }
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
