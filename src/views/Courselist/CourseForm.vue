<template>
  <div>
    <b-button @click="addNew" variant="primary" class="buttonSub"><b-icon icon="plus-square-fill"></b-icon> เพิ่มหลักสูตร</b-button>
    <b-modal
      id="modal-course"
      ref="modalCourse"
      title="ข้อมูลวิชา"
      @show="showModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <b-form @submit.stop.prevent="submit" @reset.stop.prevent="reset">
        <b-form-group
          id="form-group-course-code"
          label="รหัสหลักสูตร"
          label-for="course-code"
          :invalid-feedback="invalidFeedbackCourseid"
          valid-feedback="สำเร็จ"
          :state="stateCourseid"
        >
          <b-form-input
            type="text"
            id="course-code"
            v-model="form.course_id"
            required
          >
          </b-form-input>
        </b-form-group>
        <b-form-group
          id="form-group-course-name"
          label="ชื่อหลักสูตร"
          label-for="course-name"
          :invalid-feedback="invalidFeedbackCoursename"
          valid-feedback="สำเร็จ"
          :state="stateCoursename"
        >
          <b-form-input
            type="text"
            id="course-name-thai"
            v-model="form.course_name"
            required
          >
          </b-form-input>
        </b-form-group>
        <b-form-group
          id="form-group-course-totalcredit"
          label="หน่วยกิต"
          label-for="course-totalcredit"
          :invalid-feedback="invalidFeedbackCoursecredit"
          valid-feedback="สำเร็จ"
          :state="stateCoursecredit"
        >
          <b-form-input
            type="number"
            id="course-totalcredit"
            v-model="form.course_totalcredit"
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
    subject: Object
  },
  data () {
    return {
      sub_id: '',
      form: {
        course_id: '',
        course_name: '',
        course_totalcredit: ''
      },
      id: 0,
      isAddNew: false
    }
  },
  methods: {
    async addNew () {
      // call api for select
      // path api GET: /st/:id
      // SELECT st_id as value, CONCAT('วิชา',st_name) as text FROM subject_type a WHERE a.course_id = ?;
      this.isAddNew = true
      this.$nextTick(() => {
        this.show()
        this.isAddNew = false
      })
    },
    async show () {
      if (!this.isAddNew) {
        this.form = { ...this.course }
        // this.id = this.subject.sub_id
      }
      await this.$refs.modalCourse.show()
    },
    submit () {
      // console.log(this.form)
      const course = JSON.parse(JSON.stringify(this.form))
      this.$emit('save', course)
      this.reset()
    },
    reset () {
      this.form = {
        course_id: '',
        course_name: '',
        course_totalcredit: ''
      }
    },
    showModal () {
      if (this.isAddNew) {
        this.reset()
      } else {
        // edit
        this.form.course_id = this.course.course_id
        this.form.course_name = this.course.course_name
        this.form.course_totalcredit = this.course.course_totalcredit
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
    stateCourseid () {
      return this.form.course_id.length > 0
    },
    invalidFeedbackCourseid () {
      if (this.form.course_id.length < 0) {
        return 'ต้องกรอกรหัสหลักสูตร'
      }
      return 'กรุณาใส่รหัสหลักสูตร'
    },
    stateCoursename () {
      return this.form.course_name.length > 0
    },
    invalidFeedbackCoursename () {
      if (this.form.course_name.length < 0) {
        return 'ต้องกรอกรหัสหลักสูตร'
      }
      return 'กรุณาใส่ชื่อหลักสูตร'
    },
    stateCoursecredit () {
      return this.form.course_totalcredit.length > 0
    },
    invalidFeedbackCoursecredit () {
      if (this.form.course_totalcredit.length < 0) {
        return 'ต้องกรอกรหัสหลักสูตร'
      }
      return 'กรุณาใส่หน่วยกิตหลักสูตร'
    }
  }
}
</script>
<style scoped>
.buttonSub {
  margin-block-start: 10px;
  margin-left: 765px;
}
</style>
