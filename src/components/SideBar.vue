<template>
  <div class="hidden">
    <vs-navbar
      style="height:9%;display:flex;"
      class="navb"
      shadow
      square
      center-collapsed
      v-model="active"
    >
      <template #left>
        <vs-button
          style="color:black; background-color:#fff;"
          @click="activeSidebar = !activeSidebar"
          flat
          icon
        >
          <i class="bx bx-menu bx-sm"></i>
        </vs-button>
      </template>
      <img style=" transform:scale(0.5);" src="@/assets/logo.png" />
      <span
        style="font-size:1.5em; color:#000; font-family:Arial Narrow, sans-serif;"
      >Cultura : plateforme de surveillance pour les agriculteurs</span>
      <template #right>
        <div class="user-infos">
          <vs-button flat color="#ffd75c" :active="active == 5" @click="active = 5">
            <span style="color:#58821a;">{{username}}</span>
          </vs-button>
          <vs-button style="background-color:#fff;" class="user-avatar">
            <i style="color:#000;" class="bx bx-user bx-sm"></i>
          </vs-button>
        </div>

        <vs-button class="logoutBtn" @click="logout()" flat color="#ffd75c">
          <span style="color:#58821a;">Deconnexion</span>
        </vs-button>
        <vs-button style="background-color:#fff;">
          <i style="color:#000;" class="bx bx-bell bx-sm"></i>
        </vs-button>
        <vs-button style="background-color:#fff;">
          <i style="color:#000;" class="bx bx-envelope bx-sm"></i>
        </vs-button>
      </template>
    </vs-navbar>
    <vs-sidebar absolute v-model="active" :open.sync="activeSidebar">
      <template #logo>
        <img src="@/assets/logo.png" />
      </template>
      <vs-sidebar-item to="/accueil" class="home" id="home">
        <template #icon>
          <i class="bx bx-stats"></i>
        </template>
        Etat globale du champ
      </vs-sidebar-item>
      <vs-sidebar-item to="/visualize" class="visualize" id="Visualize">
        <template #icon>
          <i class="bx bx-slideshow"></i>
        </template>
        Visionner mon champ
      </vs-sidebar-item>
      <vs-sidebar-item to="/defending" class="defending" id="Defending">
        <template #icon>
          <i class="bx bx-shield-alt-2"></i>
        </template>
        Mesures de d??fense
      </vs-sidebar-item>
      <vs-sidebar-item to="/messaging" class="messaging" id="Messaging">
        <template #icon>
          <i class="bx bx-envelope"></i>
        </template>
        Services forestiers
      </vs-sidebar-item>
      <template #footer>
        <vs-row justify="space-between"></vs-row>
      </template>
    </vs-sidebar>
  </div>
</template>

  <script>
import { mapState } from "vuex";

export default {
  data: () => ({
    active: "home",
    activeSidebar: false
  }),
  methods: {
    logout() {
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("username");
      this.$store.commit("setIsAuthenticated", false);
      window.location.href = "http://localhost:8080/login";
    }
  },
  computed: {
    ...mapState({
      username: "username"
    })
  }
};
</script>


<style>
.messaging:focus,
.messaging:active {
  color: #58821a !important;
}

.home:focus,
.home:active {
  color: #58821a !important;
}

.home {
  color: #000;
}
.visualize:focus,
.visualize:active {
  color: #58821a !important;
}
.defending:focus,
.defending:active {
  color: #58821a !important;
}

.sideBar-link {
  text-decoration: none;
  color: black;
}

.user-infos {
  margin-top: 1%;
  display: flex;
  flex-direction: row;
  margin-right: 5%;
}

.user-avatar {
  transform: scale(0.8);
}

.vs-sidebar__item:after {
  background-color: #58821a !important;
}

.bx-home,
.bxs-calendar,
.bx-detail,
.bx-envelope1,
.bx-code-block {
  color: #000;
}

.logoutBtn:active {
  transform: scale(0.95);
  background-color: #58821a;
}
</style>