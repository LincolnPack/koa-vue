<template>
<div>
    <h1>这个是用户头像上传！</h1>
    <el-upload
    action="/api/upload/img"
    list-type="picture-card"
    :on-preview="handlePictureCardPreview"
    :on-progress='progress'
    :on-remove="handleRemove">
    <i class="el-icon-plus"></i>
  </el-upload>
  <el-dialog :visible.sync="dialogVisible">
    <img width="100%" :src="dialogImageUrl" alt="">
  </el-dialog>
  
</div>
  </template>
<script>
    export default {
        data() {
            return {
                dialogImageUrl: '',
                dialogVisible: false
            };
        },
        methods: {
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            progress(event, file, fileList) {
                console.log(event, file, fileList)
            }
        }
    }
</script>

<style scoped>

</style>