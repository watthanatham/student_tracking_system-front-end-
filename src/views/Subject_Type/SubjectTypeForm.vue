<template>
  <div>
    <b-button @click="addNew" variant="primary"><i class="far fa-plus-square"></i> เพิ่มข้อมูลหมวดวิชา</b-button>
    <b-modal
      id="modal-subject"
      ref="modalsubject"
      title="ข้อมูลหมวดวิชา"
      @show="showModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <b-form @submit.stop.prevent="submit" @reset.stop.prevent="reset">
        <b-form-group id="input-group-4" label="หมวดวิชา" label-for="input-4">
          <b-form-select
            id="input-3"
            v-model="form.st_type"
            :options="sub_type"
            required
          ></b-form-select>
        </b-form-group>
        <b-form-group
          id="form-group-subject_type-credit"
          label="หน่วยกิต"
          label-for="subject_type-credit"
        >
          <b-form-input
            type="number"
            id="subject_type-credit"
            v-model="form.st_credit"
          >
          </b-form-input>
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
    subject_type: Object
  },
  data () {
    return {
      form: {
        st_id: -1,
        st_type: null,
        st_credit: 0
      },
      id: 0,
      sub_type: [
        { text: 'เลือกหมวดวิชา', value: null },
        { text: 'วิชาศึกษาทั่วไป', value: 1 },
        { text: 'วิชาแกน', value: 2 },
        { text: 'วิชาเอกบังคับ', value: 3 },
        { text: 'วิชาเอกเลือก', value: 4 },
        { text: 'วิชาเลือกเสรี', value: 5 }
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
      this.$refs.modalsubject.show()
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
        st_id: -1,
        st_type: null,
        sub_credit: 0
      }
    },
    showModal () {
      if (this.isAddNew) {
        this.reset()
      } else {
        // edit
        this.form.st_id = this.subject_type.st_id
        this.form.st_type = this.subject_type.st.type
        this.form.st_credit = this.subject_type.st_credit
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
