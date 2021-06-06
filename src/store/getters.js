export default {
  // _: (state, getters) => { }
  // audio_list: state => state.audio.list,
  // audio: state => state.audio.list[state.audio.index],
  // isPlaying: state => state.audio.isPlaying,
  app: state => state.app,
  playlist: state => (state.playlist.length ? state.playlist : []),
  song: state => state.song
};
