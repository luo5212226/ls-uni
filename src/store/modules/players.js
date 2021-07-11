export default {
  state: {
    players: []
  },
  mutations: {
    ADD_PLAYER (state, player) {
      state.players.push(player);
    },
    DELETE_PLAYER (state, player) {
      state.players.splice(state.players.findIndex(item => item.name === player.name), 1);
    }
  },
  actions: {
    addPlayer ({ commit }, player) {
      commit('ADD_PLAYER', player);
    },
    deletePlayer ({ commit }, player) {
      commit('DELETE_PLAYER', player);
    }
  },
  getters: {
    players: state => state.players
  }
};