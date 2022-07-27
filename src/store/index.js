import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuthenticated: false,
    isLoading: false,
    username: "",
    domainStatus: 'alert',
    controlCenterMessage:"Surveillance de votre champ en cours. Il n'y a actuellement rien à signaler sur votre champ.",
    current_state_image:
    "http://localhost:8081/static/get_current_status_image",
    dismissSecs: 10,
    dismissCountDown: 0,
    alert_color:'#000;',
    data:[]
  },

  mutations: {
    //initialisation du local storage
    initializeStore(state) {
      if (localStorage.getItem("username")) {
        state.username = localStorage.getItem("username");
        state.isAuthenticated = true;
      } else {
        state.isAuthenticated = false;
        state.username = "";
      }

    },
    setIsLoading(state, status) {
      state.isLoading = status;
    },
    setIsAuthenticated(state, status) {
      state.isAuthenticated = status;
    },
    setUsername(state, username) {
      state.username = username;
    },
    removeUsername(state) {
      state.username = '';
    },
    setCurrentStateImage(state,image) {
      state.current_state_image = image;
    },
    setDomainStatus(state,value) {
      state.domainStatus = value;
    },
    setcontrolCenterMessage(state,value) {
      state.controlCenterMessage = value;
    },
    setDismissSecs(state,value) {
      state.dismissSecs = value;
    },
    setDismissCountDown(state,value) {
      state.dismissCountDown = value;
    },
    setAlertColor(state,value) {
      state.alert_color = value;
    },
    setData(state, value) {
      state.data = value;
    }
  },
  actions: {

  },
  modules: {
  }
})
