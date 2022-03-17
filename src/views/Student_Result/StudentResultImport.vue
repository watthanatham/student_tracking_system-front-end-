<template>
  <div id="app" class="container">
    <b-button @click="addNew" variant="success" class="buttonImport"><b-icon icon="cloud-arrow-up-fill"></b-icon> Import CSV</b-button>
    <b-modal
    id="modal-studentresultimport"
    ref="modalStudentResultImport"
    title="เพิ่มข้อมูลวิชา"
    @show="showModal"
    @hidden="resetModal"
    @ok="handleOk">
      <div class="container">
      <section>
        <div>
          <div >
            <vue-csv-import
              v-model="csv"
              :map-fields="['sr_id','stu_id', 'sub_id', 'sr_year', 'sr_term', 'sr_grade']"
            >
              <template slot="error"> <p class="text-danger">ไม่สามารถอ่านข้อมูลได้ กรุณาอัพโหลดใหม่อีกครั้ง</p></template>

              <template >
                <tr>
                  <th>รูปแบบที่กำหนด</th>
                  <th>คอลัมน์ไฟล์</th>
                </tr>
              </template>

              <template slot="next" slot-scope="{ load }">
                <b-button variant="info" @click.prevent="load"><b-icon icon="list-check"></b-icon> ตรวจสอบข้อมูล</b-button>
              </template>

              <template slot="submit" slot-scope="{ submit }">
                <button @click.prevent="submit">send!</button>
              </template>
              <template slot="hasHeaders" slot-scope="{ headers }">
                {{headers}}
              </template>
            </vue-csv-import>
            <!-- <pre class="mt-15" v-if="csv"><code>{{ csv }}</code></pre> -->
          </div>
        </div>
      </section>
    </div>
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
    makeToast (title, message, variant = 'success', append = false) {
      this.toastCount++
      this.$bvToast.toast(message, {
        title: 'ข้อมูลผลการเรียน',
        variant: variant,
        autoHideDelay: 3000,
        appendToast: append
      })
    },
    addNew () {
      this.isAddnew = true
      this.$nextTick(() => {
        this.show()
        this.isAddnew = false
      })
    },
    reset () {
      console.log('reset')
    },
    async show () {
      await this.$refs.modalStudentResultImport.show()
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
        this.$bvModal.hide('modal-studentresultimport')
      })
    },
    submit () {
      this.$emit('save')
      this.importData()
      this.reset()
    },
    async importData () {
      this.csv.splice(0, 1)
      var studentResult = []
      this.csv.forEach((item) => {
        studentResult.push([
          item.sr_id, item.stu_id, item.sub_id, item.sr_year, item.sr_term, item.sr_grade
        ])
      })
      await axios.post('http://localhost:8081/student_result/import', studentResult)
      console.log(studentResult)
      this.makeToast('เพิ่มสำเร็จ', 'ข้อมูลถูกเพิ่มแล้ว')
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
  text-align: left;
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
.buttonImport {
  margin-right: -915px;
  margin-block-start: -69px;
}
</style>
