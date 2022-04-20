<template>
  <div>
    <!-- <b-container class="pt-2">
      <p>{{ this.course_name }} \ โครงสร้างโมดูล</p>
    </b-container> -->
    <b-nav class="mt-4">
      <b-nav-item to="/coursestructure">โครงสร้างหลักสูตร</b-nav-item>
      <b-nav-item to="/module_structure">โครงสร้างโมดูล</b-nav-item>
      <b-nav-item to="/subject_type">รายวิชา</b-nav-item>
      <b-nav-item to="/moduleSubject">โมดูล</b-nav-item>
      <b-nav-item to="/subject">วิชา</b-nav-item>
    </b-nav>
    <b-container>
      <b-row>
        <b-col class="text-right">
          <ModuleForm
            :module="selectedItem"
            ref="moduleForm"
            @save="saveModuleStructure"
          ></ModuleForm>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-table
            striped
            hover
            :items="moduleItems"
            :fields="fields"
            class="tablemodule"
          >
            <template #cell(module_edit)="{ item }">
              <b-button @click="editModule(item)" variant="warning"
                ><i class="fas fa-edit"></i
              ></b-button>
            </template>
            <template #cell(module_del)="{ item }">
              <b-button @click="deleteModule(item)" variant="danger"
                ><i class="fas fa-trash-alt"></i
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
import ModuleForm from './ModuleForm.vue'
export default {
  components: {
    ModuleForm
  },
  methods: {
    editSuccess () {
      this.$swal({
        icon: 'success',
        title: 'แก้ไขข้อมูลสำเร็จ'
      })
    },
    addSuccess () {
      this.$swal({
        icon: 'success',
        title: 'เพิ่มข้อมูลสำเร็จ'
      })
    },
    async getModuleItems () {
      const id = this.$store.state.course_id
      await axios
        .get('http://localhost:8081/model_subject/all/' + id)
        .then((data) => {
          this.moduleItems = data.data
          console.log(data.data)
        })
    },
    async saveModuleStructure (module) {
      if (module.module_id < 0) {
        // add
        module.module_id = this.moduleId
        this.moduleItems.push(module)
        this.moduleId++
        await axios.post('http://localhost:8081/model_subject/', module)
        this.getModuleItems()
        this.addSuccess()
      } else {
        // edit
        const index = this.moduleItems.findIndex((item) => {
          console.log(module)
          return module === item.module_id
        })
        this.moduleItems.splice(index, 1, module)
        await axios.put(
          'http://localhost:8081/model_subject/' + module.module_id,
          module
        )
        this.getModuleItems()
        this.editSuccess()
      }
    },
    async editModule (item) {
      console.log('ok')
      const temp = await axios.get(
        'http://localhost:8081/model_subject/search_id/' + item.module_id
      )
      this.selectedItem = { ...temp.data[0] }
      console.log(temp.data[0])
      this.oid = this.selectedItem.module_id
      this.$nextTick(() => {
        this.$refs.moduleForm.show()
      })
    }
    // async deleteModule (subject) {
    //   console.log(subject)
    //   if (confirm(`คุณต้องการจะลบข้อมูลหมวดวิชา ${subject.st_name} หรือไม่`)) {
    //     const index = this.moduleItems.findIndex(function (item) {
    //       return subject.module_id === item.module_id
    //     })
    //     this.moduleItems.splice(index, 1)
    //     await axios.delete('http://localhost:8081/subject_type/' + subject.module_id)
    //     this.getModuleItems()
    //   }
    // }
  },
  data () {
    return {
      oid: '',
      fields: [
        { key: 'module_id', label: 'ไอดี' },
        { key: 'module_name', label: 'โมดูล' },
        { key: 'module_credit', label: 'หน่วยกิต' },
        { key: 'module_edit', label: 'แก้ไข' }
      ],
      moduleItems: [],
      selectedItem: null
    }
  },
  mounted () {
    this.getModuleItems()
    // this.course_name = this.$store.state.course_name
  }
}
</script>
<style scoped>
.mt-4 {
  margin-inline-end: 150px;
}
.tablemodule {
  text-align: center;
  margin-block-start: 15px;
  background-color: whitesmoke;
}
</style>
