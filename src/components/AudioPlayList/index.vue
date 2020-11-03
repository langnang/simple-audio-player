<template>
  <div class="audio-play-list">
    <el-table
      :data="playList"
      :show-header="false"
      style="width: 100%"
      @row-click="onRowClick"
    >
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="name"
      >
      </el-table-column>
      <el-table-column
        prop="author"
        width="160px"
      >
      </el-table-column>
      <el-table-column
        prop="album"
        width="200px"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "AudioPlayList",
  props: ["playList"],
  methods: {
    onRowClick(row) {
      this.$store.commit("audio/SET_ITEM", row);
    }
  }
}
</script>

<style lang="scss" scoped>
.audio-play-list {
}

::v-deep .el-table td, .el-table th {
  padding: 8px 0;
}
</style>
