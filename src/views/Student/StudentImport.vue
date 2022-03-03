<template>
  <div id="app">
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
                  <th>My Fields</th>
                  <th>Column</th>
                </tr>
              </template>

              <template slot="next" slot-scope="{ load }">
                <button @click.prevent="load">ตรวจสอบข้อมูล</button>
              </template>

              <template slot="submit" slot-scope="{ submit }">
                <button @click.prevent="submit">send!</button>
              </template>
            </vue-csv-import>
            <pre class="mt-15" v-if="csv"><code>{{ csv }}</code></pre>
          </div>
        </div>
      </section>
    </div>
    <button @click="importData">บันทึกข้อมูล</button>
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
  margin-top: 60px;
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
</style>
