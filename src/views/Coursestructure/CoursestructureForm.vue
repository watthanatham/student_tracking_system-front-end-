<template>
  <div>
    <b-button @click="addNew" variant="primary"><b-icon icon="plus-square-fill"></b-icon> เพิ่มข้อมูลหมวดวิชา</b-button>
    <b-modal
      id="modal-course"
      ref="modalCourse"
      title="ข้อมูลหมวดวิชา"
      @show="showModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <b-form @submit.stop.prevent="submit" @reset.stop.prevent="reset">
        <b-form-group
          id="form-group-course-code"
          label="หัวข้อ"
          label-for="course-code"
          :invalid-feedback="invalidFeedbackCoursecode"
          :state="stateCoursecode"
        >
          <b-form-input
            type="text"
            id="course-code"
            v-model="form.st_name"
            required
          >
          </b-form-input>
        </b-form-group>
        <b-form-group
          id="form-group-course-cerdit"
          label="หน่วยกิต"
          label-for="course-credit-credit"
          :invalid-feedback="invalidFeedbackCoursecreditcredit"
          :state="stateCoursecreditcredit"
        >
          <b-form-input
            type="number"
            id="course-credit-credit"
            v-model="form.st_credit"
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
    course: Object
  },
  data () {
    return {
      form: {
        st_id: -1,
        st_name: '',
        st_credit: 0,
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
        this.form = { ...this.course }
        this.id = this.form.st_id
        console.log(this.form)
      }
      this.$refs.modalCourse.show()
    },
    submit () {
      console.log(this.form)
      const course = JSON.parse(JSON.stringify(this.form))
      course.st_credit = parseFloat(course.st_credit)
      course.st_id = (this.form.st_id === -1) ? -1 : this.id
      console.log(course)
      this.$emit('save', course)
      this.reset()
    },
    reset () {
      this.form = {
        st_id: -1,
        st_name: '',
        st_credit: 0,
        course_id: this.$store.state.course_id
      }
    },
    showModal () {
      if (this.isAddNew) {
        this.reset()
      } else {
        // edit
        // this.form.st_id = this.st_id
        this.form.st_name = this.course.st_name
        this.form.st_credit = this.course.st_credit
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
        this.$bvModal.hide('modal-course')
      })
    }
  },
  computed: {
    stateCoursecode () {
      return this.form.st_name.length >= 2
    },
    invalidFeedbackCoursecode () {
      if (this.form.st_name.length > 0) {
        return 'ชื่องานต้องมีขนาดอย่างน้อย 2 ตัวอักษร'
      }
      return 'ต้องใส่ชื่อหัวข้อ'
    },
    stateCoursecreditcredit () {
      return this.form.st_credit > 0
    },
    invalidFeedbackCoursecreditcredit () {
      if (this.form.st_credit > 0) {
      }
      return 'ต้องใส่หน่วยกิต'
    }
  }
}
</script>
<style></style>
