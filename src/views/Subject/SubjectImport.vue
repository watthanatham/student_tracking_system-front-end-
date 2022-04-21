<template>
  <div id="app" class="container">
    <b-button @click="addNew" variant="success" class="buttonsubject"
      ><b-icon icon="cloud-arrow-up-fill"></b-icon> Import CSV</b-button
    >
    <b-modal
      id="modal-subjectimport"
      ref="modalSubjectImport"
      title="เพิ่มข้อมูลวิชา"
      @show="showModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <div class="container">
        <section>
          <div>
            <div>
              <vue-csv-import
                v-model="csv"
                :map-fields="[
                  'รหัสวิชา',
                  'รหัสหมวดวิชา',
                  'รหัสโมดูล',
                  'รหัสหลักสูตร',
                  'ชื่อวิชาภาษาไทย',
                  'ชื่อวิชาภาษาอังกฤษ',
                  'หน่วยกิต'
                ]"
                :autoMatchFields="true"
                :autoMatchIgnoreCase="true"
              >
                <template slot="error">
                  <p class="text-danger">
                    ไม่สามารถอ่านข้อมูลได้ กรุณาอัพโหลดใหม่อีกครั้ง
                  </p></template
                >

                <template>
                  <tr>
                    <th>รูปแบบที่กำหนด</th>
                    <th>คอลัมน์ไฟล์</th>
                  </tr>
                </template>

                <template slot="next" slot-scope="{ load }">
                  <b-button
                    variant="info"
                    @click.prevent="load"
                    ><b-icon icon="list-check"></b-icon> ตรวจสอบข้อมูล</b-button
                  >
                  <b-button
                    class="ml-2"
                    variant="success"
                    href="https://drive.google.com/uc?export=download&id=1ip1KRYjn_sBISRKqi8Gtr4qScjOgPcOE"
                    ><b-icon icon="download"></b-icon> Download
                    Template</b-button>
                </template>

                <template slot="submit" slot-scope="{ submit }">
                  <button @click.prevent="submit">send!</button>
                </template>
                <template slot="hasHeaders" slot-scope="{ headers }">
                  {{ headers }}
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
    addSuccess () {
      this.$swal({
        icon: 'success',
        title: 'เพิ่มข้อมูลสำเร็จ'
      })
    },
    addFailed () {
      this.$swal({
        icon: 'error',
        title: 'เพิ่มข้อมูลไม่สำเร็จ',
        text: 'เนื่องจากมีข้อมูลอยู่แล้วหรือข้อมูลไม่ถูกต้อง'
      })
    },
    addError () {
      this.$swal({
        icon: 'error',
        title: 'เพิ่มข้อมูลไม่สำเร็จ',
        text: 'ข้อมูลไม่ถูกต้อง'
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
      await this.$refs.modalSubjectImport.show()
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
        this.$bvModal.hide('modal-subjectimport')
      })
    },
    submit () {
      const col = []
      Object.keys(this.csv[0]).map((v) => {
        col.push(this.csv[0][v])
      })
      const check = col.filter((item, index) => {
        return col.indexOf(item) !== index
      })
      if (check.length > 0) {
        this.addError()
      } else {
        this.$emit('save')
        this.importData()
        this.reset()
      }
    },
    async importData () {
      this.csv.splice(0, 1)
      var subjects = []
      this.csv.forEach((item) => {
        subjects.push([
          item['รหัสวิชา'],
          item['รหัสหมวดวิชา'],
          item['รหัสโมดูล'],
          item['รหัสหลักสูตร'],
          item['ชื่อวิชาภาษาไทย'],
          item['ชื่อวิชาภาษาอังกฤษ'],
          item['หน่วยกิต']
        ])
      })
      const response = await axios.post('http://localhost:8081/subject/import', subjects)
      if (!response.data.status) {
        this.addFailed()
        // return
      } else {
        this.addSuccess()
        this.$emit('save')
      }
    }
  },
  mounted () {
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block)
    })
  }
}
</script>

<style scoped>
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
.buttonsubject {
  margin-right: -650px;
  margin-block-start: -155px;
}
</style>
