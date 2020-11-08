import axios from 'axios';
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
    state.error = error;
  },

  [types.DELETE_TEAM_SUCCESS](state, { teamId }) {
    state.teams = [...state.teams.filter((team) => team.id !== teamId)];
  },

  [types.DELETE_TEAM_FAILURE](state, { error }) {
    state.error = error;
  },
};

// actions
export const actions = {
  async fetchTeams({ commit }) {
    try {
      const { data } = await axios.get('/api/teams');
      commit(types.FETCH_TEAMS_SUCCESS, { teams: data });
    } catch (error) {
      commit(types.FETCH_TEAMS_FAILURE, { error });
    }
  },

  async deleteTeam({ commit }, teamId) {
    try {
      const { data } = await axios.delete(`/api/teams/${teamId}`);
      commit(types.DELETE_TEAM_SUCCESS, { teamId });
    } catch (error) {
      commit(types.DELETE_TEAM_FAILURE, { error });
    }
  },
};
