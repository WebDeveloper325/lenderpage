import axios from 'axios';
import * as types from '../mutation-types';

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

  [types.FETCH_PLAYERS_SUCCESS](state, players) {
    state.players = players;
    state.loading = false;
  },

  [types.FETCH_PLAYERS_FAILURE](state, error) {
    state.loading = false;
    state.error = error;
  },

  [types.DELETE_PLAYER_SUCCESS](state, playerId) {
    state.players = [...state.players.filter((team) => team.id !== playerId)];
  },

  [types.DELETE_PLAYER_FAILURE](state, error) {
    state.error = error;
  },

  [types.FETCH_PLAYER](state) {
    state.loading = true;
  },

  [types.FETCH_PLAYER_SUCCESS](state, player) {
    state.currentPlayer = player;
    state.loading = false;
  },

  [types.FETCH_PLAYER_FAILURE](state, error) {
    state.error = error;
    state.loading = false;
  },
};

// actions
export const actions = {
  async fetchPlayers({ commit }) {
    try {
      const { data } = await axios.get('/api/players');

      commit(types.FETCH_PLAYERS_SUCCESS, data);
    } catch (error) {
      commit(types.FETCH_PLAYERS_FAILURE, error);
    }
  },

  async deletePlayer({ commit }, playerId) {
    try {
      await axios.delete(`/api/players/${playerId}`);
      commit(types.DELETE_PLAYER_SUCCESS, playerId);
    } catch (error) {
      commit(types.DELETE_PLAYER_FAILURE, error);
    }
  },

  async fetchPlayer({ commit }, playerId) {
    try {
      const { data } = await axios.get(`/api/players/${playerId}`);
      commit(types.FETCH_PLAYER_SUCCESS, data);
    } catch (error) {
      commit(types.FETCH_PLAYER_FAILURE, error);
    }
  },
};
