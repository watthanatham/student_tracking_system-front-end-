<template>
  <div>
    <b-button @click="addNew" variant="primary" class="ADD"><b-icon icon="plus-square-fill"></b-icon> เพิ่มข้อมูลผลการเรียน</b-button>
    <b-modal
      id="modal-studentResult"
      ref="modalstudentResult"
      title="ข้อมูลผลการเรียนนิสิต"
      @show="showModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <b-form @submit.stop.prevent="submit" @reset.stop.prevent="reset">
        <b-form-group
          id="form-group-studentResult-stu_id"
          label="รหัสนิสิต"
          label-for="studentResult-stu_id"
        >
          <b-form-input
            type="text"
            id="studentResult-stu_id"
            v-model="form.stu_id"
          >
          </b-form-input>
        </b-form-group>
        <b-form-group
          id="form-group-studentResult-sub_id"
          label="รหัสวิชา"
          label-for="studentResult-sub_id"
        >
          <b-form-input
            type="text"
            id="studentResult-sub_id"
            v-model="form.sub_id"
          >
          </b-form-input>
        </b-form-group>
        <b-form-group
          id="form-group-studentResult-year"
          label="ปีการศึกษา"
          label-for="studentResult-year"
        >
          <b-form-input
            type="text"
            id="studentResult-year"
            v-model="form.sr_year"
          >
          </b-form-input>
        </b-form-group>
        <b-form-group id="input-group-1" label="เทอม" label-for="input-1">
          <b-form-select
            id="input-1"
            v-model="form.sr_term"
            :options="studentResult_term"
            required
          ></b-form-select>
        </b-form-group>
        <b-form-group id="input-group-2" label="ผลการเรียน" label-for="input-2">
          <b-form-select
            id="input-2"
            v-model="form.sr_grade"
            :options="studentResult_grade"
            required
          ></b-form-select>
        </b-form-group>
      </b-form>
      <!-- <b-card>
        <pre>
        {{ form }}
      </pre
        >
      </b-card> -->
    </b-modal>
  </div>
</template>
<script>
export default {
  props: {
    studentResult: Object
  },
  data () {
    return {
      form: {
        sr_id: '',
        stu_id: '',
        sub_id: '',
        sr_year: '',
        sr_term: null,
        sr_grade: null,
        status: false
      },
      id: 0,
      studentResult_grade: [
        { text: 'เลือกผลการศึกษา', value: null },
        { text: 'A', value: 'A' },
        { text: 'B+', value: 'B+' },
        { text: 'B', value: 'B' },
        { text: 'C+', value: 'C+' },
        { text: 'C', value: 'C' },
        { text: 'D+', value: 'D+' },
        { text: 'D', value: 'D' },
        { text: 'F', value: 'F' },
        { text: 'W', value: 'W' },
        { text: 'กำลังศึกษา', value: '-' }
      ],
      studentResult_term: [
        { text: 'เลือกเทอมการศึกษา', value: null },
        { text: '1', value: '1' },
        { text: '2', value: '2' },
        { text: 'ฤดูร้อน', value: '3' }
      ],
      isAddNew: false
    }
  },
  methods: {
    addNew () {
      this.isAddNew = true
      this.$nextTick(() => {
        this.show()
        this.isAddNew = false
      })
    },
    async show () {
      if (!this.isAddNew) {
        this.form = { ...this.studentResult }
        console.log(this.form)
        // this.id = this.studentResult.sr_id
      }
      await this.$refs.modalstudentResult.show()
    },
    submit () {
      console.log(this.form)
      const studentResult = JSON.parse(JSON.stringify(this.form))
      // studentResult.sr_id = (this.form.sr_id === -1) ? -1 : this.id
      // console.log(studentResult)
      this.$emit('save', studentResult)
      this.reset()
    },
    reset () {
      this.form = {
        sr_id: '',
        stu_id: '',
        sub_id: this.$store.state.sub_id,
        sr_year: '',
        sr_term: null,
        sr_grade: null,
        status: false
      }
    },
    showModal () {
      if (this.isAddNew) {
        this.reset()
        console.log('new')
      } else {
        // edit
        this.show()
        this.form.sr_id = this.studentResult.sr_id
        this.form.stu_id = this.studentResult.stu_id
        this.form.sr_year = this.studentResult.sr_year
        this.form.sr_grade = this.studentResult.sr_grade
      }
    },
    resetModal (evt) {
      this.reset()
    },
    handleOk (evt) {
      evt.preventDefault()
      // if (!this.validateForm) return
      this.submit()
      this.$nextTick(() => {
        this.$bvModal.hide('modal-studentResult')
      })
    }
  }
}
</script>
<style scoped>
.ADD {
  margin-block-start: 10px;
}
</style>
