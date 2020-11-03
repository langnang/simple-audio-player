<template>
  <div class="audio-lyric">
    <!--音频信息：歌词 -->
    <div class="audio-info__lyric">
      <ul class="audio-info__lyric-group" style="list-style: none;">
        <li class="audio-info__lyric-item" v-for="(l,index) in split_lyric" :key="index"
            :class="{active:index==currentIndex}">
          {{l.lyric}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "AudioLyric",
  props: {
    currentTime: {
      type: Number,
      default: null,
    },
    lyric: {
      type: String,
      default: null,
    }
  },
  data() {
    return {}
  },
  computed: {
    split_lyric() {
      return this.lyric.split("\n").reduce((total, value) => {
        const item = {
          start: null,
          lyric: value,
          end: null,
        }
        if (value[0] == '[') {
          item.start = 0;
          item.start += parseInt(value.substr(1, 2)) * 60;
          item.start += parseInt(value.substr(4, 2));
          item.start += parseInt(value.substr(7, 2)) * 0.01;
          item.lyric = item.lyric.substr(10)
        }
        total.push(item)
        return total;
      }, [])
    },
    currentIndex() {
      return this.split_lyric.filter(v => v.start < this.currentTime).length;
    },
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
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

.audio-info__lyric-item {
  font: {
    size: 14px;
  }
  color: rgba(225, 225, 225, .8);
  padding: 3px 0;
}

.active {
  color: #31c27c;
}
</style>
