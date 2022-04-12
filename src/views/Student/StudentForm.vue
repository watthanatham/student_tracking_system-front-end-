<template>
  <div>
    <b-button @click="addNew" variant="primary" class="buttonaddnew"><b-icon icon="plus-square-fill"></b-icon> เพิ่มข้อมูลนิสิต</b-button>
    <b-modal
      id="modal-student"
      ref="modalstudent"
      title="ข้อมูลนิสิต"
      @show="showModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <b-form @submit.stop.prevent="submit" @reset.stop.prevent="reset">
        <b-form-group
          id="form-group-student-code"
          label="รหัสนิสิต"
          label-for="student-code"
        >
          <b-form-input
            type="text"
            id="student-code"
            v-model="form.stu_id"
          >
          </b-form-input>
        </b-form-group>
        <b-form-group
          id="form-group-student-firstname"
          label="ชื่อ"
          label-for="student-firstname"
        >
          <b-form-input
            type="text"
            id="student-firstname"
            v-model="form.stu_firstname"
          >
          </b-form-input>
        </b-form-group>
        <b-form-group
          id="form-group-student-lastname"
          label="นามสกุล"
          label-for="student-lastname"
        >
          <b-form-input
            type="text"
            id="student-lastname"
            v-model="form.stu_lastname"
          >
          </b-form-input>
        </b-form-group>
        <b-form-group
          id="form-group-student-username"
          label="ชื่อบัญชีผู้ใช้"
          label-for="student-username"
        >
          <b-form-input
            type="text"
            id="student-username"
            v-model="form.stu_username"
          >
          </b-form-input>
        </b-form-group>
        <b-form-group
          id="form-group-student-password"
          label="รหัสผ่าน"
          label-for="student-password"
        >
          <b-form-input
            type="text"
            id="student-password"
            v-model="form.stu_password"
          >
          </b-form-input>
        </b-form-group>
        <b-form-group id="input-group-1" label="หลักสูตร" label-for="input-1">
          <b-form-select
            id="input-1"
            v-model="form.course_id"
            :options="student_course"
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
import axios from 'axios'
export default {
  props: {
    student: Object
  },
  data () {
    return {
      stu_id: '',
      form: {
        stu_id: '',
        stu_firstname: '',
        stu_lastname: '',
        stu_username: '',
        stu_password: '',
        status: false,
        course_id: null
      },
      id: 0,
      student_course: [
      ],
      isAddNew: false
    }
  },
  methods: {
    async selectCourse () {
      await axios.get('http://localhost:8081/course/course_form').then(data => {
        this.student_course = data.data
      })
      this.student_course.unshift({ text: 'เลือกหลักสูตร', value: null })
    },
    addNew () {
      this.isAddNew = true
      this.$nextTick(() => {
        this.show()
        this.isAddNew = false
      })
    },
    async show () {
      if (!this.isAddNew) {
        this.form = { ...this.student }
        console.log(this.form)
        this.selectCourse()
        console.log(this.form.stu_id)
        console.log(this.student.stu_id)
      }
      await this.$refs.modalstudent.show()
    },
    submit () {
      const student = JSON.parse(JSON.stringify(this.form))
      this.$emit('save', student)
      this.reset()
    },
    reset () {
      this.form = {
        stu_id: '',
        stu_firstname: '',
        stu_lastname: '',
        stu_username: '',
        stu_password: '',
        course_id: null,
        status: false
      }
    },
    showModal () {
      if (this.isAddNew) {
        this.reset()
      } else {
        // edit
        this.form.stu_id = this.student.stu_id
        this.form.stu_firstname = this.student.stu_firstname
        this.form.stu_lastname = this.student.stu_lastname
        this.form.stu_username = this.student.stu_username
        this.form.stu_password = this.student.stu_password
        this.form.course_id = this.student.course_id
        // this.form.course_name = this.student.course_name
      }
    },
    resetModal (evt) {
      this.reset()
    },
    handleOk (evt) {
      evt.preventDefault()
      this.submit()
      this.$nextTick(() => {
        this.$bvModal.hide('modal-student')
      })
    }
  },
  mounted () {
    this.selectCourse()
  }
}
</script>
<style scoped>
.buttonaddnew {
  margin-block-start: 15px;
  /* margin-right: -435px; */
}
</style>
