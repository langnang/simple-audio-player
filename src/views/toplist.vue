<template>
  <el-row>
    <el-form label-width="80px" size="mini">
      <el-form-item label="平台">
        <el-radio-group v-model="platform">
          <el-radio-button label="网易云"></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="榜单">
        <el-radio-group v-model="toplist.active" @change="handleChangeToplist">
          <el-radio-button
            v-for="top in toplist.data"
            :key="top.id"
            :label="top.id"
            >{{ top.name }}</el-radio-button
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button
          :disabled="playlist.tableData.length == 0"
          @click="handlePlay"
          type="info"
          >播放</el-button
        >
        <el-button
          :disabled="playlist.tableData.length == 0"
          @click="handleAddtoPlaylist"
          type="info"
          >添加至播放列表</el-button
        >
      </el-form-item>
    </el-form>
    <el-col :span="24">
      <el-table
        :data="playlist.tableData"
        v-loading="playlist.loading"
        size="mini"
        max-height="621px"
      >
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column prop="name" label="标题" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="时长" show-overflow-tooltip width="80px">
          <template slot-scope="$scope">
            {{ parseInt($scope.row.dt / 1000 / 60) }}:{{
              parseInt($scope.row.dt / 1000) % 60 > 9
                ? parseInt($scope.row.dt / 1000) % 60
                : "0" + (parseInt($scope.row.dt / 1000) % 60)
            }}
          </template>
        </el-table-column>
        <el-table-column label="歌手" show-overflow-tooltip width="280px">
          <template slot-scope="$scope">
            <span v-for="artist in $scope.row.ar" :key="artist.id">{{
              artist.name
            }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>
<script>
import { get_toplist, get_playlist } from "@/api";
export default {
  name: "toplist",
  data() {
    return {
      platform: "网易云",
      toplist: {
        active: "",
        data: []
      },
      playlist: {
        active: "",
        tableData: [],
        loading: false
      }
    };
  },
  computed: {},
  created() {
    this.getToplist();
  },
  methods: {
    // 查询排行榜列表
    getToplist() {
      get_toplist().then(res => {
        this.toplist.data = res.list;
        this.toplist.active = res.list[0].id;
        this.getPlaylist();
      });
    },
    // 查询歌单列表
    getPlaylist() {
      const id = this.toplist.active;
      this.playlist.loading = true;
      get_playlist(id).then(res => {
        this.playlist.tableData = res.playlist.tracks;
        this.playlist.loading = false;
      });
    },
    // 选中排行榜
    handleChangeToplist() {
      this.getPlaylist();
    },
    // 播放
    handlePlay() {
      this.$confirm("此操作将替换当前播放列表, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.commit("SET_PLAY_LIST", this.playlist.tableData);
          this.$message({
            type: "success",
            message: "添加成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消添加"
          });
        });
    },
    // 添加至播放列表
    handleAddtoPlaylist() {
      this.$confirm("此操作将排行榜添加至当前播放列表, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.dispatch("pushPlaylist", this.playlist.tableData);
          this.$message({
            type: "success",
            message: "添加成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消添加"
          });
        });
    }
  },
  watch: {}
};
</script>
