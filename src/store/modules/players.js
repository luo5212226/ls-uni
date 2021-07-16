export default {
  state: {
    players: []
  },
  mutations: {
    ADD_PLAYER (state, player) {
      let index = state.players.findIndex(item => item.name === player.name);
      if (index > -1) {
        state.players.splice(index, 1, player);
      } else {
        state.players.push(player);
      }
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