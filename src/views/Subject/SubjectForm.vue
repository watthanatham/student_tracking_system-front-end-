<template>
  <div>
    <b-button @click="addNew" variant="primary" class="buttonSub"><b-icon icon="plus-square-fill"></b-icon> เพิ่มข้อมูลวิชา</b-button>
    <b-modal
      id="modal-subject"
      ref="modalSubject"
      title="ข้อมูลวิชา"
      @show="showModal"
      @hidden="resetModal"
      @ok="handleOk"
      @cancel="disForm"
      @close="disForm"
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
            v-model="form.sub_id"
            :disabled="clickAdd"
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
        <b-form-group id="input-group-1" label="หมวดวิชา" label-for="input-1">
          <b-form-select
            id="input-1"
            v-model="form.st_id"
            :options="subject_type"
            required
          ></b-form-select>
        </b-form-group>
        <b-form-group id="input-group-2" label="โมดูล" label-for="input-2">
          <b-form-select
            id="input-2"
            v-model="form.module_id"
            :options="subject_module"
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
    subject: Object
  },
  data () {
    return {
      sub_id: '',
      form: {
        sub_id: '',
        sub_code: '',
        sub_name_thai: '',
        sub_name_eng: '',
        sub_credit: 0,
        st_id: null,
        module_id: null,
        course_id: '',
        status: false
      },
      id: 0,
      subject_type: [
      ],
      subject_module: [
      ],
      isAddNew: false,
      clickAdd: true
    }
  },
  watch: {
    clickAdd (v) {
      console.log(v)
    }
  },
  methods: {
    disForm (e) {
      this.clickAdd = true
      console.log('test', this.clickAdd)
    },
    async selectSubjectType () {
      const tid = this.$store.state.course_id
      await axios.get('http://localhost:8081/subject_type/st/' + tid).then(data => {
        this.subject_type = data.data
      })
      this.subject_type.unshift({ text: 'เลือกหมวดวิชา', value: null })
    },
    async selectModule () {
      const mid = this.$store.state.course_id
      await axios.get('http://localhost:8081/model_subject/md/' + mid).then(data => {
        this.subject_module = data.data
      })
      this.subject_module.unshift({ text: 'เลือกโมดูลวิชา', value: null })
      // console.log(this.subject_module)
    },
    async addNew () {
      // call api for select
      // path api GET: /st/:id
      // SELECT st_id as value, CONCAT('วิชา',st_name) as text FROM subject_type a WHERE a.course_id = ?;
      this.isAddNew = true
      this.clickAdd = false
      this.$nextTick(() => {
        this.show()
        this.isAddNew = false
      })
    },
    async show () {
      if (!this.isAddNew) {
        this.selectSubjectType()
        this.selectModule()
        this.form = { ...this.subject }
        // this.id = this.subject.sub_id
      }
      await this.$refs.modalSubject.show()
    },
    submit () {
      // console.log(this.form)
      const subject = JSON.parse(JSON.stringify(this.form))
      this.$emit('save', subject)
      this.reset()
    },
    reset () {
      this.form = {
        sub_id: '',
        sub_code: '',
        sub_name_thai: '',
        sub_name_eng: '',
        sub_credit: 0,
        st_id: null,
        module_id: null,
        course_id: this.$store.state.course_id,
        status: false
      }
    },
    showModal () {
      if (this.isAddNew) {
        this.reset()
      } else {
        // edit
        this.form.sub_id = this.subject.sub_id
        this.form.sub_name_thai = this.subject.sub_name_thai
        this.form.sub_name_eng = this.subject.sub_name_eng
        this.form.sub_credit = this.subject.sub_credit
        this.form.st_id = this.subject.st_id
        this.form.module_id = this.subject.module_id
        this.form.course_id = this.$store.state.course_id
      }
    },
    resetModal (evt) {
      this.clickAdd = true
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
  },
  mounted () {
    this.selectSubjectType()
    this.selectModule()
  }
}
</script>
<style>
.buttonSub {
  margin-block-start: -105px;
  margin-left: 965px;
}
</style>
