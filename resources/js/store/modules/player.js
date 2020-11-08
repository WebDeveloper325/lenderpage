import axios from 'axios';
import * as types from '../mutation-types';
import { SUCCESS, FAILURE } from '../action-util';

// state
export const state = {
  players: [],
  currentPlayer: {},
  loading: false,
  error: null,
};

// getters
export const getters = {
  players: (state) => state.players,
  currentPlayer: (state) => state.currentPlayer,
  loading: (state) => state.loading,
  error: (state) => state.error,
};

// mutations
export const mutations = {
  [types.FETCH_PLAYERS](state) {
    state.loading = true;
    state.error = null;
  },

  [SUCCESS(types.FETCH_PLAYERS)](state, players) {
    state.players = players;
    state.loading = false;
  },

  [FAILURE(types.FETCH_PLAYERS)](state, error) {
    state.loading = false;
    state.error = error.response.data.message || error.message;
  },

  [SUCCESS(types.DELETE_PLAYER)](state, playerId) {
    state.players = [...state.players.filter((team) => team.id !== playerId)];
  },

  [FAILURE(types.DELETE_PLAYER)](state, error) {
    state.error = error.response.data.message || error.message;
  },

  [types.FETCH_PLAYER](state) {
    state.currentPlayer = {};
    state.loading = true;
    state.error = null;
  },

  [SUCCESS(types.FETCH_PLAYER)](state, player) {
    state.currentPlayer = player;
    state.loading = false;
  },

  [FAILURE(types.FETCH_PLAYER)](state, error) {
    state.error = error.response.data.message || error.message;
    state.loading = false;
  },
};

// actions
export const actions = {
  async fetchPlayers({ commit }) {
    try {
      const { data } = await axios.get('/api/players');
      commit(SUCCESS(types.FETCH_PLAYERS), data);
    } catch (error) {
      commit(FAILURE(types.FETCH_PLAYERS), error);
    }
  },

  async deletePlayer({ commit }, playerId) {
    try {
      await axios.delete(`/api/players/${playerId}`);
      commit(SUCCESS(types.DELETE_PLAYER), playerId);
    } catch (error) {
      commit(FAILURE(types.DELETE_PLAYER), error);
    }
  },

  async fetchPlayer({ commit }, playerId) {
    try {
      const { data } = await axios.get(`/api/players/${playerId}`);
      commit(SUCCESS(types.FETCH_PLAYER), data);
    } catch (error) {
      commit(FAILURE(types.FETCH_PLAYER), error);
    }
  },
};
