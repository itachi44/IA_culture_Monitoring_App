<template>
  <div id="app">
    <section v-show="isAuthenticated === false">
      <Login />
    </section>
    <section v-show="isAuthenticated === true">
      <SideBar />
      <div class="footer">
        <Footer />
      </div>
    </section>
    <router-view></router-view>
  </div>
</template>


<script>
import SideBar from "@/components/SideBar.vue";
import Login from "@/views/Login.vue";
import Footer from "@/components/Footer.vue";

import { mapState } from "vuex";

export default {
  name: "App",
  components: {
    SideBar,
    Login,
    Footer
  },
  data() {
    return {
      timer: null
    };
  },

  beforeCreate() {
    //récupérer les données du local storage avant la création de l'applicaton
    this.$store.commit("initializeStore");
  },
  mounted() {
    document.title = "Cultura";
    this.fetchStatus();
    this.fetchStats();
    //verifier le champ chaque 2s
    this.timer = window.setInterval(() => {
      this.fetchStatus();
      this.fetchStats();
    }, 10000);
  },
  computed: {
    ...mapState({
      isAuthenticated: "isAuthenticated",
      domainStatus: "domainStatus",
      controlCenterMessage: "controlCenterMessage",
      current_state_image: "current_state_image"
    })
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    async fetchStats() {
      //récupération des statistiques

      await this.axios
        .get("/api/get_stats?how=weekly")
        .then(response => {
          this.$store.commit("setData", response.data.stats);
        })
        .catch(error => {
          console.log(JSON.stringify(error));
        });
    },
    async fetchStatus() {
      await this.axios
        .get("/api/get_status?q=status")
        .then(response => {
          this.$store.commit("setDomainStatus", response.data.status);
          this.$store.commit("setcontrolCenterMessage", response.data.message);

          if (response.data.status == "alerte invasion") {
            this.$store.commit("setAlertColor", "#e74c3c;");
            this.$root.$emit("showAlertEvent");
          }
        })
        .catch(error => {
          console.log(JSON.stringify(error));
        });
    }
  }
};
</script>
<style>
.footer {
  border-top: 1px solid gray;
  border-radius: 3px;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  max-height: 50px;
  text-align: center;
  box-shadow: 0px 0px 3px 0px #888888;
}
</style>
