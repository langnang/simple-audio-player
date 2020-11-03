import audioList from '@/data/audio';

export default {
  namespaced: true,
  state: {
    item: {
      id: null,
      album: "",
      cover: null,
      src: null,
      author: "",
      lyric: "",
    },
    index: 0,
    isPlaying: false,
    list: audioList
  },
  mutations: {
    SET_INDEX(state, index) {
      state.index = index;
    },
    SET_ITEM(state, item) {
      state.item = item;
    }
    // _(state, payload) { }
  },
  getters: {
    // _: (state, getters) => { }
  },
  actions: {
    // _(context, payload) { },
    // _({state,commit,getters},payload){}
  }
}
