<template>
  <div>
    <router-link to="/">回首页</router-link>
    <router-link to="/test/">测试页</router-link>
    <el-radio-group v-model="radio2">
      <el-radio :label="3">备选项</el-radio>
      <el-radio :label="6">备选项</el-radio>
      <el-radio :label="9">备选项</el-radio>
    </el-radio-group>
  </div>
</template>

<script>
export default {
  data () {
    return {
      radio2: 3
    };
  }
};
</script>
