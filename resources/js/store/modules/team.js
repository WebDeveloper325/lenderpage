import axios from 'axios';
import Cookies from 'js-cookie';
import * as types from '../mutation-types';

// state
export const state = {
  teams: [],
  loading: false,
  error: null,
};

// getters
export const getters = {
  teams: (state) => state.teams,
  loading: (state) => state.loading,
};

// mutations
export const mutations = {
  [types.FETCH_TEAMS](state) {
    state.loading = true;
    state.error = null;
  },

  [types.FETCH_TEAMS_SUCCESS](state, { teams }) {
    state.teams = teams;
    state.loading = false;
  },

  [types.FETCH_TEAMS_FAILURE](state, { error }) {
    state.loading = false;
    state.error = false;
  },
};

// actions
export const actions = {
  async fetchTeams({ commit }) {
    try {
      const { data } = await axios.get('/api/teams');

      commit(types.FETCH_TEAMS_SUCCESS, { teams: data });
    } catch (e) {
      commit(types.FETCH_TEAMS_FAILURE);
    }
  },
};
