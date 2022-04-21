<template>
  <div id="app" class="container">
    <b-button @click="addNew" variant="success" class="buttonexcel"
      ><b-icon icon="cloud-arrow-up-fill"></b-icon> Import CSV</b-button
    >
    <b-modal
      id="modal-studentimport"
      ref="modalStudentImport"
      title="เพิ่มข้อมูลนิสิต"
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
                  'รหัสนิสิต',
                  'รหัสหลักสูตร',
                  'ชื่อ',
                  'นามสกุล',
                  'บัญชีผู้ใช้',
                  'รหัสผ่าน'
                ]"
                :autoMatchFields="true"
                :autoMatchIgnoreCase="true"
              >
                <template slot="error">
                  <p class="text-danger">
                    ไม่สามารถอ่านข้อมูลได้ กรุณาอัพโหลดใหม่อีกครั้ง
                  </p></template
                >

                <template slot="thead">
                  <tr>
                    <th>รูปแบบที่กำหนด</th>
                    <th>คอลัมน์ไฟล์</th>
                  </tr>
                </template>

                <template slot="next" slot-scope="{ load }" class="col-10">
                  <b-button
                    variant="info"
                    @click.prevent="load"
                    ><b-icon icon="list-check"></b-icon> ตรวจสอบข้อมูล</b-button
                  >
                  <b-button
                    class="ml-2"
                    variant="success"
                    href="https://drive.google.com/uc?export=download&id=1v6eEf-xSzi3H6lG36vul65-23TV-YR-O"
                    ><b-icon icon="download"></b-icon> Download
                    Template</b-button
                  >
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
        title: 'เพิ่มข้อมูลนิสิตสำเร็จ'
      })
    },
    addFailed () {
      this.$swal({
        icon: 'error',
        title: 'เพิ่มข้อมูลไม่สำเร็จ',
        text: 'เนื่องจากมีข้อมูลอยู่แล้ว'
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
    async show () {
      await this.$refs.modalStudentImport.show()
    },
    reset () {
      console.log('reset')
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
        this.importData()
        this.$emit('save')
        this.reset()
      }
    },
    async importData () {
      this.csv.splice(0, 1)
      var arr = []
      this.csv.forEach((item) => {
        arr.push([
          item['รหัสนิสิต'],
          item['รหัสหลักสูตร'],
          item['ชื่อ'],
          item['นามสกุล'],
          item['บัญชีผู้ใช้'],
          item['รหัสผ่าน']
        ])
      })
      console.log(arr)
      const response = await axios.post(
        'http://localhost:8081/student/import',
        arr
      )
      if (!response.data.status) {
        this.addFailed()
      } else {
        this.$emit('save')
        this.addSuccess()
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
.buttonexcel {
  margin-right: -350px;
  margin-block-start: -69px;
}
</style>
