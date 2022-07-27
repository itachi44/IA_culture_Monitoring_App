<template>
  <div class="container">
    <section class="home_content">
      <div style="position:absolute;top:45%;" class="center">
        <b-alert :show="dismissCountDown" variant="danger" @dismiss-count-down="countDownChanged">
          <p>Des animaux rodent près de votre champ.</p>
          <b-progress variant="danger" :max="dismissSecs" :value="dismissCountDown" height="4px"></b-progress>
        </b-alert>
      </div>

      <div ref="target" id="target" class="center"></div>
      <p
        :style="{'color':this.alert_color,'font-size':'1.5em','margin-top':'8%','margin-bottom':'4%','opacity':'0.9'}"
      >{{controlCenterMessage}}</p>
      <div class="home_elts">
        <div class="left_side">
          <p
            style="font-size:1em; color:#000; margin-bottom:2%; opacity:0.8;"
          >Dernière image capturée :</p>
          <div class="current_state_img">
            <b-img
              v-bind="mainProps"
              rounded
              :src="current_state_image"
              fluid
              alt="dernière image capturée"
            ></b-img>
          </div>
        </div>
        <div class="right_side">
          <p style="font-size:1em; color:#000; margin-bottom:2%; opacity:0.8;">Vos statistiques :</p>
          <div class="center">
            <vs-table>
              <template #thead>
                <vs-tr>
                  <vs-th>Date</vs-th>
                  <vs-th>Etat du champ</vs-th>
                </vs-tr>
              </template>
              <template #tbody>
                <vs-tr :key="i" v-for="(tr, i) in $vs.getPage(data, page, max)" :data="tr">
                  <vs-td>{{ tr.date }}</vs-td>
                  <vs-td>{{ tr.etat }}</vs-td>
                </vs-tr>
              </template>
              <template #footer>
                <vs-pagination v-model="page" :length="$vs.getLength(data, max)" />
              </template>
            </vs-table>
          </div>
        </div>
      </div>
    </section>
    <div>
      <b-button
        ref="target"
        id="target"
        style="color:#fff; height:2.2em; font-size:1.2em; text-decoration:none; transform:scale(0.8); "
        class="btn btn-unique center"
        @click="refreshData"
      >
        rafraichir les données
        <b-icon icon="arrow-counterclockwise"></b-icon>
      </b-button>
    </div>
  </div>
</template>



<script>
import { mapState } from "vuex";

export default {
  name: "Home",
  components: {},

  data() {
    return {
      mainProps: {
        width: 600,
        height: 400
      },
      dismissSecs: 10,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      page: 1,
      max: 5
    };
  },

  methods: {
    refreshData() {
      const loading = this.$vs.loading({
        text: "Chargement..."
      });
      setTimeout(() => {
        loading.close();
      }, 1000);
      this.$store.commit(
        "setCurrentStateImage",
        "http://localhost:8081/static/get_current_status_image" +
          "?cache=" +
          Math.random()
      );
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    }
  },
  mounted() {
    const thisInstance = this;
    this.$root.$on("showAlertEvent", function() {
      thisInstance.showAlert();
    });
  },
  computed: {
    ...mapState({
      isAuthenticated: "isAuthenticated",
      controlCenterMessage: "controlCenterMessage",
      current_state_image: "current_state_image",
      domainStatus: "domainStatus",
      alert_color: "alert_color",
      data: "data"
    })
  }
};
</script>

<style>
.home_content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.home_elts {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
}

.left_side {
  margin-right: 5%;
}
.right_side {
  margin-left: 5%;
}

.btn-unique {
  background-color: #195bff !important;
  margin-bottom: 5%;
  transition: all 0.5s ease-out;
  margin-left: 39%;
  margin-top: 4%;
  opacity: 0.9;
}
.btn-unique:hover {
  box-shadow: 1px 1px 1px #7f8fa6;
  background-color: #195bff !important;
  opacity: 0.85;
}
.btn-unique:active {
  transform: scale(0.6);
  border: none;
  background-color: #195bff !important;
  opacity: 0.9;
}
</style>