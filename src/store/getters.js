export default {
  // _: (state, getters) => { }
  audio_list: state => state.audio.list,
  audio: state => state.audio.item,
  isPlaying: state => state.audio.isPlaying,
}
