<template>
  <div>
    <b-button @click="addNew" variant="primary"><b-icon icon="plus-square-fill"></b-icon> เพิ่มข้อมูลโมดูล</b-button>
    <b-modal
      id="modal-module"
      ref="modalModule"
      title="ข้อมูลโมดูล"
      @show="showModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <b-form @submit.stop.prevent="submit" @reset.stop.prevent="reset">
        <b-form-group
          id="form-group-module-name"
          label="ชื่อโมดูล"
          label-for="module-name"
          :invalid-feedback="invalidFeedbackModulename"
          :state="stateModulename"
        >
          <b-form-input
            type="text"
            id="module-name"
            v-model="form.module_name"
            required
          >
          </b-form-input>
        </b-form-group>
        <b-form-group
          id="form-group-module-credit"
          label="หน่วยกิตโมดูล"
          label-for="module-credit-credit"
          :invalid-feedback="invalidFeedbackModulecredit"
          :state="stateModulecredit"
        >
          <b-form-input
            type="number"
            id="module-credit-credit"
            v-model="form.module_credit"
            required
          >
          </b-form-input>
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
    module: Object
  },
  data () {
    return {
      form: {
        module_id: -1,
        module_name: '',
        module_credit: 0,
        course_id: ''
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
        this.form = { ...this.module }
        this.id = this.module.module_id
      }
      this.$refs.modalModule.show()
    },
    submit () {
      console.log(this.form)
      const module = JSON.parse(JSON.stringify(this.form))
      module.module_id = (this.form.module_id === -1) ? -1 : this.id
      // console.log(module)
      this.$emit('save', module)
      this.reset()
    },
    reset () {
      this.form = {
        module_id: -1,
        module_name: '',
        module_credit: 0,
        course_id: this.$store.state.course_id
      }
    },
    showModal () {
      if (this.isAddNew) {
        this.reset()
      } else {
        // edit
        // this.form.module_id = this.module.module_id
        this.form.module_name = this.module.module_name
        this.form.module_credit = this.module.module_credit
        this.form.course_id = this.$store.state.course_id
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
        this.$bvModal.hide('modal-module')
      })
    }
  },
  computed: {
    stateModulename () {
      return this.form.module_name.length >= 2
    },
    invalidFeedbackModulename () {
      if (this.form.module_name.length > 0) {
        return 'ชื่องานต้องมีขนาดอย่างน้อย 2 ตัวอักษร'
      }
      return 'ต้องใส่ชื่อโมดูล'
    },
    stateModulecredit () {
      return this.form.module_credit.length > 0
    },
    invalidFeedbackModulecredit () {
      if (this.form.module_credit.length > 0) {
        return 'หน่วยกิตต้องมีมากกว่า 2 หน่วย'
      }
      return 'ต้องใส่หน่วยกิต'
    }
  }
}
</script>
<style></style>
