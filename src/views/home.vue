<template>
  <el-row :gutter="20" style="margin: 0">
    <el-col :span="14">
      <el-scrollbar style="height: calc(100vh - 125px)">
        <el-table
          :data="playlist"
          :show-header="false"
          style="width: 100%"
          :row-class-name="tableRowClassName"
        >
          <el-table-column type="index" width="50"> </el-table-column>
          <el-table-column>
            <template v-slot="scope">
              <label>{{ scope.row.name }}</label>
              <span class="audio-play__button-group">
                <el-button
                  size="mini"
                  type="info"
                  icon="el-icon-video-play"
                  circle
                  @click="onRowPlay(scope.row)"
                >
                </el-button>
              </span>
            </template>
          </el-table-column>
          <el-table-column label="时长" show-overflow-tooltip width="80px">
            <template slot-scope="$scope">
              {{ parseInt($scope.row.dt / 1000 / 60) }}
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip width="120px">
            <template v-slot="scope">
              <span v-for="artist in scope.row.ar" :key="artist.id">{{
                artist.name
              }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-scrollbar>
    </el-col>
    <el-col :span="10">
      <div class="audio-info">
        <!--音频信息：封面 -->
        <div
          v-if="song.cover"
          class="audio-info__cover"
          :class="{ active: isPlaying }"
        >
          <img :src="audio.cover" />
        </div>
        <!--音频信息：专辑 -->
        <div v-if="song.album" class="audio-info__album">
          {{ audio.album }}
        </div>
        <!--音频信息：作者 -->
        <div v-if="song.author" class="audio-info__author">
          {{ audio.singer }}
        </div>
        <!--音频信息：歌词 -->
        <AudioLyric :lyric="song.lyric" :current-time="currentTime" />
      </div>
    </el-col>
  </el-row>
</template>

<script>
import AudioLyric from "@/components/AudioLyric";
import { mapGetters } from "vuex";

export default {
  props: {
    currentTime: {}
  },
  components: {
    AudioLyric
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["playlist", "song"])
    // audioList() {
    //   return this.audio_list.reduce((total, value) => {
    //     total.push(value.src);
    //     return total;
    //   }, []);
    // }
  },
  created() {},
  methods: {
    tableRowClassName(data) {
      return data.row.id === this.song.id ? "active" : "";
    },
    onTableRowClick(row) {
      const _index = this.audio_list.findIndex(value => value == row);
      this.$store.commit("audio/SET_ITEM", row);
      this.$refs.player.currentIndex = _index;
    },
    onRowPlay(row) {
      this.$store.dispatch("getSong", row.id).then(() => {
        this.$emit("play");
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./../styles";

::v-deep .el-scrollbar__wrap {
  overflow-x: hidden;
}

.audio-player-container {
  height: 60px;

  &:hover .audio-player {
    height: 60px;
  }
}

.audio-info {
  text-align: center;

  .audio-info__cover {
    width: 160px;
    height: 160px;
    margin: 0 auto;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
}

.audio-play__button-group {
  float: right;
  display: none;
}

::v-deep .el-table__row:hover .audio-play__button-group {
  display: block;

  .el-button--mini.is-circle {
    padding: 4px;
  }
}
</style>
