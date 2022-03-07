<template>
  <div id="app">
    <b-button @click="addNew" variant="success" class="buttonexcel"><i class="far fa-plus-square"></i> Import CSV</b-button>
    <b-modal
    id="modal-studentimport"
    ref="modalStudentImport"
    title="เพิ่มข้อมูลนิสิต"
    @show="showModal"
    @hidden="resetModal"
    @ok="handleOk">
      <div class="container">
      <section class="py-5">
        <div class="row mt-5">
          <div class="col-8 offset-2"></div>
        </div>
        <div class="row mt-5">
          <div class="col-8 offset-2">
            <vue-csv-import
              v-model="csv"
              :map-fields="['stu_id', 'course_id', 'stu_firstname', 'stu_lastname', 'stu_username', 'stu_password']"
            >
              <template slot="error"> File type is invalid </template>

              <template slot="thead">
                <tr>
                  <th>รูปแบบที่กำหนด</th>
                  <th>คอลัมน์ไฟล์</th>
                </tr>
              </template>

              <template slot="next" slot-scope="{ load }">
                <button @click.prevent="load">ตรวจสอบข้อมูล</button>
              </template>

              <template slot="submit" slot-scope="{ submit }">
                <button @click.prevent="submit">send!</button>
              </template>
            </vue-csv-import>
            <!-- <pre class="mt-15" v-if="csv"><code>{{ csv }}</code></pre> -->
          </div>
        </div>
      </section>
    </div>
    <button @click="importData">บันทึกข้อมูล</button>
    </b-modal>
  </div>
</template>

<script>
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
import axios from 'axios'

function hljsDefineVue (hljs) {
  return {
    subLanguage: 'xml',
    contains: [
      hljs.COMMENT('<!--', '-->', {
        relevance: 10
      }),
      {
        begin: /^(\s*)(<script>)/gm,
        end: /^(\s*)(<\/script>)/gm,
        subLanguage: 'javascript',
        excludeBegin: true,
        excludeEnd: true
      },
      {
        begin: /^(\s*)(<script lang=["']ts["']>)/gm,
        end: /^(\s*)(<\/script>)/gm,
        subLanguage: 'typescript',
        excludeBegin: true,
        excludeEnd: true
      },
      {
        begin: /^(\s*)(<style(\sscoped)?>)/gm,
        end: /^(\s*)(<\/style>)/gm,
        subLanguage: 'css',
        excludeBegin: true,
        excludeEnd: true
      },
      {
        begin: /^(\s*)(<style lang=["'](scss|sass)["'](\sscoped)?>)/gm,
        end: /^(\s*)(<\/style>)/gm,
        subLanguage: 'scss',
        excludeBegin: true,
        excludeEnd: true
      },
      {
        begin: /^(\s*)(<style lang=["']stylus["'](\sscoped)?>)/gm,
        end: /^(\s*)(<\/style>)/gm,
        subLanguage: 'stylus',
        excludeBegin: true,
        excludeEnd: true
      }
    ]
  }
}

hljsDefineVue(hljs)

export default {
  name: 'App',
  data () {
    return {
      csv: null
    }
  },
  methods: {
    addNew () {
      this.isAddnew = true
      this.$nextTick(() => {
        this.show()
        this.isAddnew = false
      })
    },
    async show () {
      await this.$refs.modalStudentImport.show()
    },
    showModal () {
      this.reset()
    },
    resetModal () {
      this.reset()
    },
    handleOk (evt) {
      evt.preventDefault()
      this.submit()
      this.$nextTick(() => {
        this.$bvModal.hide('modal-studentimport')
      })
    },
    submit () {
      this.$emit('save')
      this.importData()
      this.reset()
    },
    async importData () {
      this.csv.splice(0, 1)
      var arr = []
      this.csv.forEach((item) => {
        arr.push([
          item.stu_id, item.course_id, item.stu_firstname, item.stu_lastname, item.stu_username, item.stu_password
        ])
      })
      await axios.post('http://localhost:8081/student/import', arr)
      console.log(arr)
    }
  },
  mounted () {
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block)
    })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 3px;
}

.container {
  text-align: left end;
}

code {
  background-color: #eee;
  border: 1px solid #999;
  display: block;
  padding: 20px;
}

#app .form {
  text-align: left;
}
.buttonexcel{
  margin-right: -1345px;
  margin-block-start: -69px;
}
</style>
