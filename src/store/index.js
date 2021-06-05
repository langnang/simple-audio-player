import Vue from "vue";
import Vuex from "vuex";
import persistedState from "vuex-persistedstate";
import getters from "./getters";
import { get_song } from "@/api";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    playlist: [],
    song: {}
  },
  mutations: {
    SET_PLAY_LIST(state, list) {
      localStorage.setItem("playlist", JSON.stringify(list));
      state.playlist = list;
    },
    SET_SONG(state, song) {
      state.song = song;
    }
  },
  getters,
  actions: {
    pushPlaylist({ state, commit }, list) {
      commit("SET_PLAY_LIST", [
        ...(state.playlist.length ? state.playlist : []),
        ...list
      ]);
    },
    getSong({ commit }, song_id) {
      return get_song(song_id).then(res => {
        commit("SET_SONG", res);
        return Promise.resolve(res);
      });
    },
    playNext({ state, dispatch }) {
      let index = state.playlist.findIndex(item => item.id == state.song.id);
      if (index == state.playlist.length - 1) {
        index = 0;
      } else {
        index++;
      }

      return dispatch("getSong", state.playlist[index].id);
    },
    playPrev({ state, dispatch }) {
      let index = state.playlist.findIndex(item => item.id == state.song.id);
      if (index == 0) {
        index = state.playlist.length - 1;
      } else {
        index--;
      }

      return dispatch("getSong", state.playlist[index].id);
    }
  },
  plugins: [persistedState()]
});
