<template>
  <div>
    <b-container fluid style="padding:0px">
      <b-row>
        <b-col class="text-right">
          <CourseForm
            :course="selectedItem"
            ref="courseForm"
            @save="saveForm"
            style="margin-bottom: 0px"
          ></CourseForm>
        </b-col>
      </b-row>
      <b-row>
        <b-col style="padding-top: 0px">
          <b-table
            striped
            hover
            :items="courseItems"
            :fields="fields"
            class="tablecoursecourse"
          >
          <template #cell(course_inspect)="{ item }">
              <b-button @click="selectedCourse(item)" variant="info"
                ><i class="fa fa-search"></i
              ></b-button>
            </template>
          </b-table>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import axios from 'axios'
import CourseForm from './CourseForm.vue'
export default {
  components: {
    CourseForm
  },
  methods: {
    addSuccess () {
      this.$swal({
        icon: 'success',
        title: 'เพิ่มข้อมูลหลักสูตร'
      })
    },
    addFailed () {
      this.$swal({
        icon: 'error',
        title: 'เพิ่มข้อมูลไม่สำเร็จ',
        text: 'เนื่องจากมีข้อมูลอยู่แล้วหรือข้อมูลไม่ถูกต้อง'
      })
    },
    selectedCourse (item, index, evt) {
      this.$store.dispatch('setCourse', item.course_id)
      this.$store.dispatch('setName', item.course_name)
      console.log(item.course_name)
      this.$router.push({ path: '/coursestructure' })
    },
    async getCourses () {
      await axios.get('http://localhost:8081/course').then((data) => {
        this.courseItems = data.data
      })
    },
    async saveForm (course) {
      // add
      const response = await axios.post('http://localhost:8081/course', course)
      if (!response.data.status) {
        this.addFailed()
      } else {
        this.getCourses()
        this.addSuccess()
      }
    }
  },
  data () {
    return {
      fields: [
        { key: 'course_id', label: 'รหัสหลักสูตร' },
        { key: 'course_name', label: 'ชื่อหลักสูตร' },
        { key: 'course_totalcredit', label: 'หน่วยกิตรวม' },
        { key: 'course_inspect', label: 'ตรวจสอบข้อมูล' }
      ],
      courseItems: [],
      selectedItem: null
    }
  },
  mounted () {
    this.getCourses()
  }
}
</script>
<style scoped lang="scss">
.tablecoursecourse {
  text-align: center;
  margin-inline-end: 300px;
  margin-block-start: 40px;
  background-color: whitesmoke;
  & tr {
    cursor: pointer;
  }
}
</style>
