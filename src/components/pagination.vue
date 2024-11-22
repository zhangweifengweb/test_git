<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="pageSizeList"
    :page-size="pageSize"
    :layout="layout"
    :total="totalCount"
  ></el-pagination>
</template>
<script>
let me;
export default {
  data() {
    return {};
  },
  props: {
    pageSizeList: {
      type: Array,
      default: [10, 50, 100]
    },
    pageSize: {
      type: Number,
      default: 10
    },
    currentPage: {
      type: Number,
      default: 1
    },
    totalCount: {
      type: Number,
      default: 0
    },
    // 布局
    layout: {
      type: String,
      default: "total, sizes, prev, pager, next, jumper"
    }
  },
  mounted() {
    me = this;
  },
  methods: {
    handleSizeChange(e) {
      this.$emit("handleSizeChange", e);
    },
    handleCurrentChange(e) {
      this.$emit("handleCurrentChange", e);
    },
  }
};
</script>
<style scoped>
</style>
