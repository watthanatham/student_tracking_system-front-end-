<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      รายละเอียดของทางสาขา
      <a href="https://www.informatics.buu.ac.th/2020/" target="_blank" rel="noopener">ดูข้อมูลเพิ่มเติม</a>.
    </p>
    <b-button v-b-toggle.collapse-2 class="m-1">หลักสูตรแผนการเรียน</b-button>
    <b-button v-b-toggle.collapse-3 class="m-1">อาจารย์ผู้สอนของสาขา</b-button>
    <b-button v-b-toggle.collapse-4 class="m-1">การสอบวัดคุณสมบัติโมดูล</b-button>
    <b-button v-b-toggle.collapse-5 class="m-1">อนาคตหลังสำเร็จการศึกษา</b-button>
      <b-collapse id="collapse-2">
        <a href="https://www.informatics.buu.ac.th/2020/wp-content/uploads/2021/11/%E0%B9%81%E0%B8%9C%E0%B8%99%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%80%E0%B8%A3%E0%B8%B5%E0%B8%A2%E0%B8%99%E0%B8%95%E0%B8%B2%E0%B8%A1%E0%B9%82%E0%B8%84%E0%B8%A3%E0%B8%87%E0%B8%AA%E0%B8%A3%E0%B9%89%E0%B8%B2%E0%B8%87%E0%B8%AB%E0%B8%A5%E0%B8%B1%E0%B8%81%E0%B8%AA%E0%B8%B9%E0%B8%95%E0%B8%A3-2564.pdf" target="_blank" rel="noopener">-โครงสร้างหลักสูตร 2564</a>
        <br>
        <a href="https://www.informatics.buu.ac.th/2020/wp-content/uploads/2021/11/%E0%B9%81%E0%B8%9C%E0%B8%99%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%80%E0%B8%A3%E0%B8%B5%E0%B8%A2%E0%B8%99%E0%B8%95%E0%B8%B2%E0%B8%A1%E0%B9%82%E0%B8%84%E0%B8%A3%E0%B8%87%E0%B8%AA%E0%B8%A3%E0%B9%89%E0%B8%B2%E0%B8%87%E0%B8%AB%E0%B8%A5%E0%B8%B1%E0%B8%81%E0%B8%AA%E0%B8%B9%E0%B8%95%E0%B8%A3-2563.pdf" target="_blank" rel="noopener">-โครงสร้างหลักสูตร 2563</a>
      </b-collapse>
      <b-collapse id="collapse-3">
        <div>
         <b-table :items="items">
         </b-table>
        </div>
      </b-collapse>
       <b-collapse id="collapse-4">
        <a href="https://www.informatics.buu.ac.th/2020/wp-content/uploads/2020/09/%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%AA%E0%B8%AD%E0%B8%9A%E0%B8%A7%E0%B8%B1%E0%B8%94%E0%B8%84%E0%B8%B8%E0%B8%93%E0%B8%AA%E0%B8%A1%E0%B8%9A%E0%B8%B1%E0%B8%95%E0%B8%B4%E0%B9%82%E0%B8%A1%E0%B8%94%E0%B8%B9%E0%B8%A5-AAI-0072-2563.pdf" target="_blank" rel="noopener">-ประกาศ/ขั้นตอน การสอบวัดคุณสมบัติโมดูล</a>
      </b-collapse>
      <b-collapse id="collapse-5">
        หลักสูตรวิทยาศาสตรบัณฑิตสาขาวิชาปัญญาประดิษฐ์ประยุกต์และระบบอัจฉริยะได้พัฒนาขึ้นเพื่อตอบสนองต่อความต้องการบุคลากรในอุตสาหกรรมดิจิทัลและระบบอัจฉริยะรองรับการเปลี่ยนรูปองค์การไปสู่องค์กรอัจฉริยะที่ขับเคลื่อนด้วยข้อมูล (Data-driven Business)
        บนพื้นฐานของเทคโนโลยีปัญญาประดิษฐ์ตลอดถึงการพัฒนากำลังคนสำหรับธุรกิจดิจิทัล และระบบอัจฉริยะ
            เช่น โรงงานอัจฉริยะ (Smart Factory) เกษตรอัจฉริยะ (Smart Agriculture) ฟาร์มอัจฉริยะ (Smart Farming) เมืองอัจฉริยะ (Smart City)
            การบริการอัจฉริยะ (Smart Services) การท่องเที่ยวอัจฉริยะ (Smart Tourisms) และโลจิสติกส์อัจฉริยะ (Smart Logistics) สอดคล้องกับโครงการเขตพัฒนาพิเศษภาคตะวันออก (EEC) ภายใต้แผนยุทธศาสตร์ประเทศไทย 4.0

        <h3>ตัวอย่างแนวทางการประกอบอาชีพ</h3>
นักออกแบบและพัฒนาปรับปรุงปัญญาประดิษฐ์และเทคโนโลยีอัจฉริยะเพื่อการเปลี่ยนรูปองค์กรเป็นองค์กรที่ขับเคลื่อนด้วยดิจิทัล (Digital Transformation)
เช่นวิศวกรปัญญาประดิษฐ์ประยุกต์ (AppliedArtificial Intelligence Engineer) วิศวกรการเรียนรู้เชิงลึก (Deep Learning Engineer)
เจ้าหน้าที่ทํางานทางด้านการประยุกต์ใช้ปัญญาประดิษฐ์และข้อมูลดิจิทัลในองค์กรวิศวกรคอมพิวเตอร์วิทัศน์ (Computer Vision Engineer) นักพัฒนาธุรกิจอัจฉริยะ (Business Intelligence Developer)นักพัฒนาอินเทอร์เน็ตของสรรพสิ่ง (Internet of Things Developer)
นักวางแผนการประยุกต์ใช้ปัญญาประดิษฐ์และข้อมูลดิจิทัลผู้เชี่ยวชาญและให้คําปรึกษาด้านการจัดการเกี่ยวกับการประยุกต์ใช้ปัญญาประดิษฐ์และเทคโนโลยีข้อมูลดิจิทัลนักวิเคราะห์ข้อมูลในภาคอุตสาหกรรมที่ขับเคลื่อนด้วยข้อมูลผู้ประกอบการอิสระด้านการประยุกต์ใช้ปัญญาประดิษฐ์และข้อมูลดิจิทัล
บริษัท Start UP ด้านดิจิทัล เพื่อรับงานวิเคราะห์และออกแบบระบบงานสารสนเทศอัจฉริยะ รวมถึงเป็น Design House, Intelligent Product Design, และ System Integration ส่วนของ Smart Technology ให้ลูกค้า หรือ Software House ทั่วไป
      </b-collapse>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        { ชื่อ: 'ผศ.ดร. สุภาวดี ศรีคำดี', Email: 'srikamdee@buu.ac.th', ห้องทำงาน: 'IF-911C', หมายเหตุ: '(ประธานหลักสูตรฯ)' },
        { ชื่อ: 'อาจารย์ประวิทย์ บุญมี', Email: 'prawit@buu.ac.th', ห้องทำงาน: 'IF-912C', หมายเหตุ: '' },
        { ชื่อ: 'ผศ.ดร. กฤษณะ ชินสาร', Email: 'krisana@informatics.buu.ac.th', ห้องทำงาน: 'IF-913B/ห้องคณบดี\nชั้น 2 IF-215', หมายเหตุ: '' },
        { ชื่อ: 'อาจารย์พลวัต ช่อผูก', Email: 'ponlawat.ch@buu.ac.th, \nponlawat.ch@go.buu.ac.th', ห้องทำงาน: 'IF-913F', หมายเหตุ: '' },
        { ชื่อ: 'อาจารย์จอห์น เกตวูต แฮม', Email: 'buraphalinuxserver@gmail.com', ห้องทำงาน: 'IF-909A', หมายเหตุ: '' }
      ]
    }
  },
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: blue;
}
</style>
