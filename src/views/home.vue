<template>
  <div class="home-container">
    <el-row :gutter="20" style="margin: 0;">
      <el-col :span="14">
        <el-scrollbar style="height:calc(100vh - 65px)">
          <AudioPlayList :play-list="audio_list"/>
        </el-scrollbar>
      </el-col>
      <el-col :span="10">
        <div class="audio-info">
          <!--音频信息：封面 -->
          <div class="audio-info__cover" :class="{active:isPlaying}" v-if="audio.cover">
            <img :src="audio.cover"/>
          </div>
          <!--音频信息：专辑 -->
          <div class="audio-info__album" v-if="audio.album">
            {{ audio.album }}
          </div>
          <!--音频信息：作者 -->
          <div class="audio-info__author" v-if="audio.author">
            {{ audio.author }}
          </div>
          <!--音频信息：歌词 -->
          <el-scrollbar style="height:calc(100vh - 275px)">
            <AudioLyric :lyric="audio.lyric" :current-time="currentTime"/>
          </el-scrollbar>
        </div>
      </el-col>
      <el-col :span="24" class="audio-player-container">
        <AudioPlayer :audio-list="audioList" :before-play="onBeforePlay" @playing="playing" @play="play"/>
      </el-col>
    </el-row>
  </div>

</template>

<script>
import AudioPlayList from '@/components/AudioPlayList'
import AudioPlayer from '@/components/AudioPlayer'
import AudioLyric from '@/components/AudioLyric'
import {mapGetters} from 'vuex'

export default {
  components: {
    AudioPlayList,
    AudioLyric,
    AudioPlayer
  },
  data() {
    return {
      currentTime: null,
      // audioList: [
      //   'https://96.f.1ting.com/local_to_cube_202004121813/96kmp3/zzzzzmp3/2015kNov/20X/20m_MingX/01.mp3',
      //   'https://96.f.1ting.com/local_to_cube_202004121813/96kmp3/2020/08/25/25a_pyc/01.mp3',
      //   "https://96.f.1ting.com/local_to_cube_202004121813/96kmp3/2020/08/13/13d_jtq/01.mp3",
      //   "https://96.f.1ting.com/local_to_cube_202004121813/96kmp3/2020/08/13/13s_ylf/01.mp3",
      //   "https://96.f.1ting.com/local_to_cube_202004121813/96kmp3/2020/08/13/13r_ylf/01.mp3"
      // ]
    }
  },
  computed: {
    ...mapGetters(["audio_list", "audio", "isPlaying"]),
    audioList() {
      return this.audio_list.reduce((total, value) => {
        total.push(value.src);
        return total
      }, []);
    },

  },
  methods: {
    onBeforePlay(next) {
      console.log("onBeforePlay");
      next();
    },
    playing(time) {
      this.currentTime = time;
    },
    play(index) {
      console.log(index);
      this.$store.commit('audio/SET_ITEM', this.audio_list[index]);
    }
  }
}
</script>
<style lang="scss" scoped>

::v-deep .el-scrollbar__wrap {
  overflow-x: hidden;
}

.audio-player-container {
  height: 60px;

  &:hover .audio-player {
    height: 60px;
  }

  .audio-player {
    /*height: 0;*/
    /*overflow: hidden;*/
    /*transition: height 2s;*/
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
</style>
