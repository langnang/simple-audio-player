<template>
  <div class="home-container">
    <el-row :gutter="20" style="margin: 0;">
      <el-col :span="14">
        <el-scrollbar style="height:calc(100vh - 65px)">
          <el-table
            :data="audio_list"
            :show-header="false"
            style="width: 100%"
            :row-class-name="tableRowClassName"
          >
            <el-table-column type="index" width="50"> </el-table-column>
            <el-table-column>
              <template v-slot="scope">
                <label>{{ scope.row.song }}</label>
                <span class="audio-play__button-group">
                  <el-button
                    size="mini"
                    type="info"
                    icon="el-icon-video-play"
                    circle
                    @click="onRowPlay(scope.$index)"
                  >
                  </el-button>
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="singer" width="160px"> </el-table-column>
            <el-table-column prop="album" width="200px"> </el-table-column>
          </el-table>
        </el-scrollbar>
      </el-col>
      <el-col :span="10">
        <div class="audio-info">
          <!--音频信息：封面 -->
          <div
            class="audio-info__cover"
            :class="{ active: isPlaying }"
            v-if="audio.cover"
          >
            <img :src="audio.cover" />
          </div>
          <!--音频信息：专辑 -->
          <div class="audio-info__album" v-if="audio.album">
            {{ audio.album }}
          </div>
          <!--音频信息：作者 -->
          <div class="audio-info__author" v-if="audio.author">
            {{ audio.singer }}
          </div>
          <!--音频信息：歌词 -->
          <AudioLyric :lyric="audio.lyric" :current-time="currentTime" />
        </div>
      </el-col>
      <el-col :span="24" class="audio-player-container">
        <AudioPlayer
          ref="player"
          :src-list="audio_list"
          src-key="source"
          :show-mode="true"
          @playing="playing"
          @play-next="onPlayNext"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import AudioLyric from "@/components/AudioLyric";
import { mapGetters } from "vuex";

export default {
  components: {
    AudioLyric,
  },
  data() {
    return {
      currentTime: null,
    };
  },
  computed: {
    ...mapGetters(["audio_list", "audio", "isPlaying"]),
    audioList() {
      return this.audio_list.reduce((total, value) => {
        total.push(value.src);
        return total;
      }, []);
    },
  },
  methods: {
    tableRowClassName(data) {
      return data.rowIndex === this.$store.state.audio.index ? "active" : "";
    },
    onTableRowClick(row) {
      const _index = this.audio_list.findIndex((value) => value == row);
      this.$store.commit("audio/SET_ITEM", row);
      this.$refs.player.currentIndex = _index;
    },
    playing(time) {
      this.currentTime = time;
    },
    onPlayNext(index) {
      this.$store.commit("audio/SET_INDEX", index);
    },
    onRowPlay(index) {
      this.$store.commit("audio/SET_INDEX", index);
      this.$refs.player.onPlay(index);
    },
  },
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
