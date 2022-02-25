<template>
  <div>
    <b-button @click="addNew" variant="primary"><i class="far fa-plus-square"></i> เพิ่มข้อมูลผลการเรียน</b-button>
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
        <b-form-group
          id="form-group-studentResult-term"
          label="เทอม"
          label-for="studentResult-term"
        >
          <b-form-input
            type="text"
            id="studentResult-term"
            v-model="form.sr_term"
          >
          </b-form-input>
        </b-form-group>
        <b-form-group id="input-group-4" label="ผลการเรียน" label-for="input-4">
          <b-form-select
            id="input-3"
            v-model="form.sr_grade"
            :options="studentResult_grade"
            required
          ></b-form-select>
        </b-form-group>
      </b-form>
      <b-card>
        <pre>
        {{ form }}
      </pre
        >
      </b-card>
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
        sr_id: -1,
        sr_year: '',
        sr_term: '',
        sr_grade: null
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
        { text: 'F', value: 'F' }
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
    show () {
      if (!this.isAddNew) {
        this.form = { ...this.studentResult }
        this.id = this.studentResult.sr_id
      }
      this.$refs.modalstudentResult.show()
    },
    submit () {
      console.log(this.form)
      const studentResult = JSON.parse(JSON.stringify(this.form))
      studentResult.sr_id = (this.form.sr_id === -1) ? -1 : this.id
      console.log(studentResult)
      this.$emit('save', studentResult)
      this.reset()
    },
    reset () {
      this.form = {
        sr_id: -1,
        sr_year: '',
        sr_term: ''
      }
    },
    showModal () {
      if (this.isAddNew) {
        this.reset()
      } else {
        // edit
        this.form.sr_id = this.studentResult.id
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
<style></style>
