import axios from 'axios';
import * as types from '../mutation-types';
import { crudMutations } from '../utils/mutation';
import { SUCCESS, FAILURE } from '../utils/action';

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
  ...crudMutations({
    LIST_ACTION: types.FETCH_TEAMS,
    CREATE_ATION: types.CREATE_TEAM,
    READ_ACTION: types.FETCH_TEAM,
    UPDATE_ACTION: types.UPDATE_TEAM,
    DELETE_ACTION: types.DELETE_TEAM,
    all: 'teams',
    current: 'currentTeam',
  }),
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

  async createTeam({ commit }, team) {
    try {
      const { data } = await axios.post(`/api/teams`, team);
      commit(SUCCESS(types.CREATE_TEAM), data);
    } catch (error) {
      commit(FAILURE(types.CREATE_TEAM), error);
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

  async updateTeam({ commit }, team) {
    try {
      const { data } = await axios.put(`/api/teams/${team.id}`, team);
      commit(SUCCESS(types.UPDATE_TEAM), data);
    } catch (error) {
      commit(FAILURE(types.UPDATE_TEAM), error);
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
};
