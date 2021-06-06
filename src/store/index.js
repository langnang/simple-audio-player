import Vue from "vue";
import Vuex from "vuex";
import persistedState from "vuex-persistedstate";
import getters from "./getters";
import { get_lyric, get_song_url } from "@/api";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    playlist: [],
    song: {},
    app: {
      mainBgColor: "#222327",
      mainHoverColor: "",
      mainActiveColor: "",
      cardBgColor: "#313237"
    }
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
    getSong({ state, commit }, song_id) {
      let song = state.playlist.find(s => s.id == song_id);
      return Promise.all([
        new Promise(resolve => get_song_url(song_id).then(resolve)),
        new Promise(resolve => get_lyric(song_id).then(resolve))
      ]).then(res => {
        commit("SET_SONG", {
          ...song,
          url: res[0].data[0].url,
          lyric: res[1].lrc.lyric
        });
        return Promise.resolve({ ...res[0].data[0], lyric: res[1].lrc.lyric });
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
