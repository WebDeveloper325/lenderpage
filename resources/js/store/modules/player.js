import axios from 'axios';
import * as types from '../mutation-types';

// state
export const state = {
  players: [],
  loading: false,
  error: null,
};

// getters
export const getters = {
  players: (state) => state.players,
  loading: (state) => state.loading,
};

// mutations
export const mutations = {
  [types.FETCH_PLAYERS](state) {
    state.loading = true;
    state.error = null;
  },

  [types.FETCH_PLAYERS_SUCCESS](state, { players }) {
    state.players = players;
    state.loading = false;
  },

  [types.FETCH_PLAYERS_FAILURE](state, { error }) {
    state.loading = false;
    state.error = false;
  },
};

// actions
export const actions = {
  async fetchPlayers({ commit }) {
    try {
      const { data } = await axios.get('/api/players');

      commit(types.FETCH_PLAYERS_SUCCESS, { players: data });
    } catch (e) {
      commit(types.FETCH_PLAYERS_FAILURE);
    }
  },
};
