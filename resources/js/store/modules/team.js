import axios from 'axios';
import * as types from '../mutation-types';
import { SUCCESS, FAILURE } from '../action-util';

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

  [SUCCESS(types.FETCH_TEAMS)](state, teams) {
    state.teams = teams;
    state.loading = false;
  },

  [FAILURE(types.FETCH_TEAMS)](state, error) {
    state.loading = false;
    state.error = error.response.data.message || error.message;
  },

  [SUCCESS(types.DELETE_TEAM)](state, teamId) {
    state.teams = [...state.teams.filter((team) => team.id !== teamId)];
  },

  [FAILURE(types.DELETE_TEAM)](state, error) {
    state.error = error.response.data.message || error.message;
  },

  [types.FETCH_TEAM](state) {
    state.currentTeam = {};
    state.loading = false;
    state.error = null;
  },

  [SUCCESS(types.FETCH_TEAM)](state, team) {
    state.currentTeam = team;
    state.loading = false;
  },

  [FAILURE(types.FETCH_TEAM)](state, error) {
    state.loading = false;
    state.error = error.response.data.message || error.message;
  },
};

// actions
export const actions = {
  async fetchTeams({ commit }) {
    try {
      const { data } = await axios.get('/api/teams');
      commit(SUCCESS(types.FETCH_TEAMS), data);
    } catch (error) {
      commit(FAILURE(types.FETCH_TEAMS), error);
    }
  },

  async deleteTeam({ commit }, teamId) {
    try {
      await axios.delete(`/api/teams/${teamId}`);
      commit(SUCCESS(types.DELETE_TEAM), teamId);
    } catch (error) {
      commit(FAILURE(types.DELETE_TEAM), error);
    }
  },

  async fetchTeam({ commit }, teamId) {
    try {
      const { data } = await axios.get(`/api/teams/${teamId}`);
      commit(SUCCESS(types.FETCH_TEAM), data);
    } catch (error) {
      commit(FAILURE(types.FETCH_TEAM), error);
    }
  },
};
