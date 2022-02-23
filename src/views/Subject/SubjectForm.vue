<template>
  <div>
    <b-button @click="addNew" variant="primary"><i class="far fa-plus-square"></i> เพิ่มข้อมูลวิชา</b-button>
    <b-modal
      id="modal-subject"
      ref="modalSubject"
      title="ข้อมูลวิชา"
      @show="showModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <b-form @submit.stop.prevent="submit" @reset.stop.prevent="reset">
        <b-form-group
          id="form-group-subject-code"
          label="รหัสวิชา"
          label-for="subject-code"
        >
          <b-form-input
            type="text"
            id="subject-code"
            v-model="form.sub_code"
          >
          </b-form-input>
        </b-form-group>
        <b-form-group
          id="form-group-subject-name"
          label="ชื่อวิชาภาษาไทย"
          label-for="subject-name-thai"
        >
          <b-form-input
            type="text"
            id="subject-name-thai"
            v-model="form.sub_name_thai"
          >
          </b-form-input>
        </b-form-group>
        <b-form-group
          id="form-group-subject-name"
          label="ชื่อวิชาภาษาอังกฤษ"
          label-for="subject-name-eng"
        >
          <b-form-input
            type="text"
            id="subject-name-eng"
            v-model="form.sub_name_eng"
          >
          </b-form-input>
        </b-form-group>
        <b-form-group
          id="form-group-subject-credit"
          label="หน่วยกิต"
          label-for="subject-credit"
        >
          <b-form-input
            type="number"
            id="subject-credit"
            v-model="form.sub_credit"
          >
          </b-form-input>
        </b-form-group>
        <b-form-group id="input-group-4" label="หมวดวิชา" label-for="input-4">
          <b-form-select
            id="input-3"
            v-model="form.st_id"
            :options="subject_type"
            required
          ></b-form-select>
        </b-form-group>
        <b-form-group id="input-group-4" label="โมดูล" label-for="input-4">
          <b-form-select
            id="input-3"
            v-model="form.module_id"
            :options="subject_module"
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
    subject: Object
  },
  data () {
    return {
      form: {
        sub_id: -1,
        sub_code: '',
        sub_name_thai: '',
        sub_name_eng: '',
        sub_credit: 0,
        st_id: null,
        module_id: null
      },
      id: 0,
      subject_type: [
        { text: 'เลือกหมวดวิชา', value: null },
        { text: 'วิชาศึกษาทั่วไป', value: 1 },
        { text: 'วิชาแกน', value: 2 },
        { text: 'วิชาเอกบังคับ', value: 3 },
        { text: 'วิชาเอกเลือก', value: 4 },
        { text: 'วิชาเลือกเสรี', value: 5 }
      ],
      subject_module: [
        { text: 'เลือกโมดูล', value: null },
        { text: 'โมดูล 1', value: 1 },
        { text: 'โมดูล 2', value: 2 },
        { text: 'โมดูล 3', value: 3 },
        { text: 'โมดูล 4', value: 4 },
        { text: 'โมดูล 5', value: 5 },
        { text: 'โมดูล 6', value: 6 },
        { text: 'โมดูล 7', value: 7 }
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
        this.form = { ...this.subject }
        this.id = this.subject.sub_id
      }
      this.$refs.modalSubject.show()
    },
    submit () {
      console.log(this.form)
      const subject = JSON.parse(JSON.stringify(this.form))
      subject.sub_credit = parseFloat(subject.sub_credit)
      subject.sub_id = (this.form.sub_id === -1) ? -1 : this.id
      console.log(subject)
      this.$emit('save', subject)
      this.reset()
    },
    reset () {
      this.form = {
        sub_id: -1,
        sub_code: '',
        sub_name_thai: '',
        sub_name_eng: '',
        sub_credit: 0
      }
    },
    showModal () {
      if (this.isAddNew) {
        this.reset()
      } else {
        // edit
        this.form.sub_id = this.subject.id
        this.form.sub_code = this.subject.sub_code
        this.form.sub_name_thai = this.subject.sub_name_thai
        this.form.sub_name_eng = this.subject.sub_name_eng
        this.form.sub_credit = this.subject.sub_credit
        this.form.st_id = this.subject.st_id
        this.form.module_id = this.subject.module_id
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
        this.$bvModal.hide('modal-subject')
      })
    }
  }
}
</script>
<style></style>
