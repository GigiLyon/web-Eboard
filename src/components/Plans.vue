<template>
<div>
    <!-- <iframe src="http://view.officeapps.live.com/op/view.aspx?src=http%3a%2f%2fvideo.ch9.ms%2fbuild%2f2011%2fslides%2fTOOL-532T_Sutter.pptx&embedded=true" style="height:700px; width:100%;"></iframe> -->
    <!-- <iframe src="http://view.officeapps.live.com/op/view.aspx?src=newteach.pbworks.com%2Ff%2Fele%2Bnewsletter.docx&embedded=true" style="height:700px; width:100%;"></iframe> -->
    <!-- <iframe src="http://view.officeapps.live.com/op/view.aspx?src=http%3A%2F%2Flearn.bankofamerica.com%2Fcontent%2Fexcel%2FWedding_Budget_Planner_Spreadsheet.xlsx&embedded=true" style="height:700px; width:100%;"></iframe> -->
    <!-- <iframe src="https://eserver1.stl-horizon.com/api_v13/frontend/web/user/files?companyId=2&userId=3&companyCode=010&actionTypes=getDocDownload&DocId=1955&embedded=true" style="height:700px; width:100%;"></iframe> -->
    <!-- <iframe src="test.docx&embedded=true" style="height:700px; width:100%;"></iframe> -->
    
    
    <!-- <button type="button" @click="changeUrl">切换</button> -->
    <!-- <VueDocPreview :type="type" :value="emptyValue" :url="value" :height="80" id="vdp" language="javascript" ></VueDocPreview> -->
    <!-- <VueDocPreview type="office" value="https://view.officeapps.live.com/op/view.aspx?src=newteach.pbworks.com%2Ff%2Fele%2Bnewsletter.docx"></VueDocPreview> -->
    <!-- <VueDocPreview type="office" value="http://view.officeapps.live.com/op/view.aspx?src=newteach.pbworks.com%2Ff%2Fele%2Bnewsletter.docx"></VueDocPreview> -->
    <VueDocPreview type="office" value="https://static-1252421604.cos.ap-guangzhou.myqcloud.com/vdp.docx"></VueDocPreview>
</div>
</template>

<script>
import VueDocPreview from 'vue-doc-preview';
export default {
  name: 'demo',
  components: {
    VueDocPreview
  },
  data: function () {
    return {
      mdStyle: {
        code: {
          'background-color': 'rgb(187, 255, 255)',
          'line-height': '20px'
        }
      },
      type: 'office',
      emptyValue: '',
    //   url: 'https://ic-1252421604.cosgz.myqcloud.com/admin/%E6%B5%8B%E8%AF%95%E4%B8%8A%E4%BC%A0/2%E7%BA%A7%E6%96%87%E4%BB%B6%E5%A4%B9/README.md?sign=YoQARwI0oYQgFYNcSFn6ivaKwRJhPTEyNTI0MjE2MDQmaz1BS0lEQ0tYcTlUcGRMM2UzTFZtRjdvTmwxOVRzU3EzN2FxVE4mZT0xNTM2ODA1MzI0JnQ9MTUzNDIxMzMyNCZyPTk1NjI3MDE4NiZmPS9hZG1pbi8lRTYlQjUlOEIlRTglQUYlOTUlRTQlQjglOEElRTQlQkMlQTAvMiVFNyVCQSVBNyVFNiU5NiU4NyVFNCVCQiVCNiVFNSVBNCVCOS9SRUFETUUubWQmYj1pYw==',
    //   value: 'https://static-1252421604.cos.ap-guangzhou.myqcloud.com/vdp.docx',
    //   value: 'test.docx',
    //   value: 'https://eserver1.stl-horizon.com/api_v13/frontend/web/user/files?companyId=2&userId=3&companyCode=010&actionTypes=getDocDownload&DocId=1955',
      mdString: '# Marked\n **success**\n```javascript\nconst a = 10\nfunction () {\n  console.log(a)\n}```',
      textString: '排列数A(n, m) = n! / (n-m)!\n组合数C(n, m) = A(n, m) / m!',
      codeString: 'import Marked from \'marked\'\n' +
      'import HLJS from \'../lib/highlight\'\n' +
      '  watch: {\n' +
      '    value: function (val) {\n' +
      '      this.updateContent(val)\n' +
      '    }\n' +
      '  },\n' +
      '  mounted: function () {\n' +
      '    this.updateContent(this.value)\n' +
      '  },\n' +
      'updateContent: function (val) {\n' +
      '      if (val) {\n' +
      '        const parseMarked = Marked(val)\n' +
      '        this.content = parseMarked\n' +
      '        let self = this\n' +
      '        this.$nextTick(() => {\n' +
      '          self.parseHtml()\n' +
      '          console.log(\'Hello VueDocPreview\')\n' +
      '        })\n' +
      '      }\n' +
      '    }'
    }
  },
  methods: {
    changeUrl: function () {
      if (!this.isChange) {
        this.emptyValue = 'https://static-1252421604.cos.ap-guangzhou.myqcloud.com/vdp.pptx'
        // this.url = this.value
        // this.type = 'office'
        this.isChange = true
      } else {
        this.emptyValue = ''
        // this.type = 'markdown'
        this.isChange = false
      }
      // this.url = 'http://ic-1252421604.cosgz.myqcloud.com/admin/%E6%B5%8B%E8%AF%95%E4%B8%8A%E4%BC%A0/README.MD?sign=AlbseDL/V3P/WyixtNlBGdbwdDJhPTEyNTI0MjE2MDQmaz1BS0lEQ0tYcTlUcGRMM2UzTFZtRjdvTmwxOVRzU3EzN2FxVE4mZT0xNTM2ODA1NTMxJnQ9MTUzNDIxMzUzMSZyPTg1NTg2Mzk2NiZmPS9hZG1pbi8lRTYlQjUlOEIlRTglQUYlOTUlRTQlQjglOEElRTQlQkMlQTAvUkVBRE1FLk1EJmI9aWM='
    }
  }
}
</script>

<style scoped>
</style>