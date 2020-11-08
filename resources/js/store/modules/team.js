import axios from 'axios';
import * as types from '../mutation-types';

// state
export const state = {
  teams: [],
  currentTeam: {},
  loading: false,
  error: null,
};

// getters
export const getters = {
  teams: (state) => state.teams,
  error: (state) => state.error,
  currentTeam: (state) => state.currentTeam,
  loading: (state) => state.loading,
};

// mutations
export const mutations = {
  [types.FETCH_TEAMS](state) {
    state.loading = true;
    state.error = null;
  },

  [types.FETCH_TEAMS_SUCCESS](state, teams) {
    state.teams = teams;
    state.loading = false;
  },

  [types.FETCH_TEAMS_FAILURE](state, { error }) {
    state.loading = false;
    state.error = error;
  },

  [types.DELETE_TEAM_SUCCESS](state, teamId) {
    state.teams = [...state.teams.filter((team) => team.id !== teamId)];
  },

  [types.DELETE_TEAM_FAILURE](state, { error }) {
    state.error = error;
  },

  [types.FETCH_TEAM](state) {
    state.currentTeam = {};
    state.loading = false;
  },

  [types.FETCH_TEAM_SUCCESS](state, team) {
    state.currentTeam = team;
    state.loading = false;
  },

  [types.FETCH_TEAM_FAILURE](state, { error }) {
    state.loading = false;
    state.error = error;
  },
};

// actions
export const actions = {
  async fetchTeams({ commit }) {
    try {
      const { data } = await axios.get('/api/teams');
      commit(types.FETCH_TEAMS_SUCCESS, data);
    } catch (error) {
      commit(types.FETCH_TEAMS_FAILURE, error);
    }
  },

  async deleteTeam({ commit }, teamId) {
    try {
      await axios.delete(`/api/teams/${teamId}`);
      commit(types.DELETE_TEAM_SUCCESS, teamId);
    } catch (error) {
      commit(types.DELETE_TEAM_FAILURE, error);
    }
  },

  async fetchTeam({ commit }, teamId) {
    try {
      const { data } = await axios.get(`/api/teams/${teamId}`);
      commit(types.FETCH_TEAM_SUCCESS, data);
    } catch (error) {
      commit(types.FETCH_TEAM_FAILURE, error);
    }
  },
};
