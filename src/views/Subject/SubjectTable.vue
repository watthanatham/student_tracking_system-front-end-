<template>
  <div>
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
          <b-table :items="subjectItems" :fields="fields">
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
    async addSubject () {
    },
    async saveSubject (subject) {
      // console.log('submit', subject)
      if (subject.sub_id < 0) {
        subject.sub_id = this.subjectId
        // console.log(subject.sub_id)
        this.subjectItems.push(subject)
        this.subjectId++
        await axios.post('http://localhost:8081/subject', subject)
      } else {
        const index = this.subjectItems.findIndex((item) => {
          return subject.sub_id === item.sub_id
        })
        this.subjectItems.splice(index, 1, subject)
        await axios.put('http://localhost:8081/subject/' + subject.sub_id, subject)
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
      if (confirm(`คุณต้องการจะลบข้อมูลวิชา ${subject.sub_name} หรือไม่`)) {
        const index = this.subjectItems.findIndex(function (item) {
          return subject.sub_id === item.sub_id
        })
        this.subjectItems.splice(index, 1)
        await axios.delete('http://localhost:8081/subject/' + subject.sub_id)
      }
    }
  },
  data () {
    return {
      fields: [
        { key: 'sub_id', label: 'No' },
        { key: 'sub_code', label: 'รหัสวิชา' },
        { key: 'sub_name', label: 'ชื่อวิชา' },
        { key: 'sub_credit', label: 'หน่วยกิต' },
        { key: 'st_id', label: 'หมวดวิชา' },
        { key: 'module_id', label: 'โมดูล' },
        { key: 'sub_edit', label: 'แก้ไข' },
        { key: 'sub_del', label: 'ลบข้อมูล' }
      ],
      subjectItems: [
        {
          sub_id: 1,
          sub_code: '85510459',
          sub_name: 'Information Technology for Industry',
          sub_credit: 2,
          st_id: 2,
          module_id: 1
        },
        {
          sub_id: 2,
          sub_code: '85510659',
          sub_name: 'IT Support',
          sub_credit: 3,
          st_id: 1,
          module_id: 2
        },
        {
          sub_id: 3,
          sub_code: '85511359',
          sub_name: 'Discrete and Math',
          sub_credit: 3,
          st_id: 2,
          module_id: 4
        },
        {
          sub_id: 4,
          sub_code: '85510059',
          sub_name: 'Statics for comoputing',
          sub_credit: 3,
          st_id: 2,
          module_id: 2
        },
        {
          sub_id: 5,
          sub_code: '85611259',
          sub_name: 'Logical Thinking',
          sub_credit: 3,
          st_id: 2,
          module_id: 1
        }
      ],
      subjectId: 5,
      selectedItem: null
    }
  },
  mounted () {
    this.getSubjects()
  }
}
</script>
<style></style>
