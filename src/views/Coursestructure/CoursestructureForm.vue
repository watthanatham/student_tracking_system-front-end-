<template>
  <div>
    <!-- <b-button @click="addNew" variant="primary"><i class="far fa-plus-square"></i> เพิ่มข้อมูลวิชา</b-button> -->
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
          label="หัวข้อ"
          label-for="subject-code"
        >
          <b-form-input
            type="text"
            id="subject-code"
            v-model="form.st_name"
          >
          </b-form-input>
        </b-form-group>
        <b-form-group
          id="form-group-subject-cerdit"
          label="หน่วยกิต"
          label-for="subject-credit-credit"
        >
          <b-form-input
            type="number"
            id="subject-credit-credit"
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
    subject: Object
  },
  data () {
    return {
      form: {
        st_id: -1,
        st_name: '',
        st_credit: 0
      },
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
        this.id = this.subject.st_id
      }
      this.$refs.modalSubject.show()
    },
    submit () {
      console.log(this.form)
      const subject = JSON.parse(JSON.stringify(this.form))
      subject.st_credit = parseFloat(subject.st_credit)
      subject.st_id = (this.form.st_id === -1) ? -1 : this.id
      console.log(subject)
      this.$emit('save', subject)
      this.reset()
    },
    reset () {
      this.form = {
        st_id: -1,
        st_name: '',
        st_credit: 0
      }
    },
    showModal () {
      if (this.isAddNew) {
        this.reset()
      } else {
        // edit
        this.form.st_id = this.subject.id
        this.form.st_name = this.subject.st_name
        this.form.st_credit = this.subject.st_credit
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
