import Vue from 'vue';
import Vuex from 'vuex';
import audio from './modules/audio';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    audio
  },
  actions,
  getters,
  mutations
})
