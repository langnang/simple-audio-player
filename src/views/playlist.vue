<template>
  <el-row>
    <el-form label-width="80px" size="mini">
      <el-form-item label="平台">
        <el-radio-group v-model="platform">
          <el-radio-button label="网易云"></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="系列">
        <el-radio-group v-model="catlist.activeCat" @change="handleChangeCat">
          <el-radio-button :label="-1">{{ catlist.all.name }}</el-radio-button>
          <el-radio-button
            v-for="(cat, key) in catlist.categories"
            :key="key"
            :label="key"
            >{{ cat }}</el-radio-button
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item label="分类" v-if="catlist.activeCat != '-1'">
        <el-radio-group v-model="catlist.activeSub" @change="handleChangeSub">
          <el-radio-button
            v-for="(cat, key) in catlist.sub.filter(
              item => item.category == catlist.activeCat
            )"
            :key="key"
            :label="cat.name"
          ></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="歌单" v-if="playlists.tableData.length > 0">
        <el-radio-group
          v-model="playlists.active"
          @change="handleChangePlaylist"
        >
          <el-radio-button
            v-for="(play, key) in playlists.tableData"
            :key="key"
            :label="play.id"
            >{{ play.name }}</el-radio-button
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
import { get_playlist, get_playlist_catlist, get_playlist_top } from "@/api";
export default {
  name: "toplist",
  data() {
    return {
      platform: "网易云",

      catlist: {
        all: {},
        activeCat: "-1",
        categories: {},
        activeSub: "",
        sub: []
      },
      playlists: {
        active: "",
        tableData: [],
        loading: false
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
    this.getPlaylistCatlist();
  },
  methods: {
    // 选中排行榜
    handleChangePlaylist() {
      this.getPlaylist();
    },
    getPlaylistCatlist() {
      get_playlist_catlist().then(res => {
        if (res == "") {
          setTimeout(this.getPlaylistCatlist(), 1000);
          return;
        }
        this.catlist.all = res.all;
        this.catlist.categories = res.categories;
        this.catlist.sub = res.sub;
        this.getTopPlaylist();
      });
    },
    handleChangeCat() {
      if (this.catlist.activeCat == -1) {
        this.getTopPlaylist();
      }
    },
    handleChangeSub() {
      this.getTopPlaylist(this.catlist.activeSub).then();
    },
    // 查询精选碟歌单
    getTopPlaylist(cat) {
      this.playlists.loading = true;
      get_playlist_top(cat).then(res => {
        this.playlists.tableData = res.playlists;
        this.playlists.loading = false;
      });
    },
    // 查询歌单列表
    getPlaylist() {
      const id = this.playlists.active;
      this.playlist.loading = true;
      get_playlist(id).then(res => {
        this.playlist.tableData = res.playlist.tracks;
        this.playlist.loading = false;
      });
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
