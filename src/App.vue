<template>
  <div id="app">
    <el-menu
      mode="horizontal"
      :router="true"
      :default-active="activeMenu"
      size="mini"
      background-color="#313237"
      text-color="#686f74"
      active-text-color="#c6c7cb"
    >
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item index="/toplist">排行榜</el-menu-item>
      <el-menu-item index="/playlist">歌单</el-menu-item>
      <el-menu-item index="/artist">歌手</el-menu-item>
    </el-menu>
    <keep-alive>
      <router-view
        :current-time="currentTime"
        @play="$refs['player'].onPlay(0)"
        :is-playing="isPlaying"
      ></router-view>
    </keep-alive>
    <AudioPlayer
      ref="player"
      :src-list="[song]"
      src-key="url"
      @playing="playing"
      @play="onPlay"
      @pause="onPause"
      @play-prev="onPlayPrev"
      @play-next="onPlayNext"
      @ended="onEnded"
      style="margin-top:12px"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "App",
  components: {},
  data() {
    return {
      activeMenu: this.$route.path,
      currentTime: null,
      isPlaying: false
    };
  },
  computed: {
    ...mapGetters(["song"])
  },
  created() {},
  methods: {
    playing(time) {
      this.currentTime = time;
    },
    onPlay() {
      this.isPlaying = true;
    },
    onPause() {
      this.isPlaying = false;
    },
    onPlayNext() {
      this.$store.dispatch("playNext");
    },
    onPlayPrev() {
      this.$store.dispatch("playPrev");
    },
    onEnded() {
      this.$store.dispatch("playNext").then(() => {
        this.$refs["player"].onPlay(0);
      });
    }
  }
};
</script>

<style lang="scss">
html,
body,
* {
  margin: 0;
  padding: 0;
}

body {
  background-color: #222327;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
