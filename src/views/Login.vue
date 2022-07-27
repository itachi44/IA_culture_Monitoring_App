<template>
  <div class="content">
    <div class="loginForm">
      <div class="header">
        <img src="@/assets/logo.png" />
      </div>
      <p class="headerText">Commencer à surveiller votre champ.</p>
      <br />

      <form @submit.prevent="logIn" class="inputs">
        <vs-input
          size="large"
          class="formInput"
          color="#F0DBBA"
          v-model="username"
          placeholder="exemple@gmail.com"
        />
        <br />
        <br />
        <vs-input
          size="large"
          class="formInput"
          color="#F0DBBA"
          type="password"
          placeholder="Password"
          v-model="password"
        />
        <br />
        <br />
        <div class="stuffs">
          <span
            style="text-decoration:none; color:#000; margin-top:2%; margin-left:10%; font-size:0.9em;"
          >Mot de passe oublié ?</span>
        </div>
        <br />
        <br />
        <vs-button
          button="submit"
          ref="button"
          style="margin-left:15%; color:#ffd75c; background-color:#58821a; width:65%; border-radius:4%; transform:scale(1.2);"
          color="#58821a"
          flat
        >
          <span style="color:#fff;">Connexion</span>
        </vs-button>
        <br />
        <!-- gestion des erreurs -->
        <div ref="errors" id="errors" class="alert alert-danger" v-if="errors.length">
          <span v-for="(error,i) in errors" v-bind:key="i">{{ error }}</span>
        </div>

        <div
          ref="messages"
          style="margin-top:2%;"
          class="alert alert-success"
          v-if="messages.length"
        >
          <span v-for="(msg,i) in messages" v-bind:key="i">{{ msg }}</span>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  components: {},
  data: () => ({
    modalShow: false,

    password: "",
    username: "",
    errors: [],
    recovery_email: "",
    messages: []
  }),
  watch: {
    errors: {
      handler(errors) {
        if (errors) {
          setTimeout(
            () => (document.getElementById("errors").style.display = "none"),
            3000
          );
        }
      },
      deep: true
    },
    messages: {
      handler(messages) {
        if (messages) {
          setTimeout(
            () => (this.$refs["messages"].style.display = "none"),
            3000
          );
        }
      },
      deep: true
    }
  },
  methods: {
    async logIn() {
      this.openLoadingButton();
      this.errors = [];
      this.$store.commit("setIsLoading", true);

      const formData = {
        username: this.username,
        password: this.password
      };

      await this.axios
        .post("/api/login", formData)
        .then(response => {
          console.log(response.data);

          let username = response.data.username;
          let message = "Bienvenue " + username;

          //enregistrement de l'utilisateur
          localStorage.setItem("username", response.data.username);
          this.$store.commit("setUsername", response.data.username);
          this.$store.commit("setIsAuthenticated", true);
          localStorage.setItem("isAuthenticated", true);

          //redirection vers la page accueil
          const toPath = this.$route.query.to || "/accueil";
          this.$router.push(toPath).catch(() => {});

          //affichage d'un message de bienvenue
          this.$vs.notification({
            color: "success",
            position: "bottom-left",
            title: message,
            text: "",
            buttonClose: false
          });
        })
        .catch(error => {
          if (error.response) {
            for (const property in error.response.data) {
              this.errors.push(`${property}: ${error.response.data[property]}`);
            }
          } else {
            this.errors.push(
              "Quelque chose ne marche pas. Veuillez réessayer encore."
            );

            console.log(JSON.stringify(error));
          }
        });

      //enlever la barre de chargement
      this.$store.commit("setIsLoading", false);
    },
    openLoadingButton() {
      const loading = this.$vs.loading({
        target: this.$refs.button,
        scale: "0.6",
        background: "#35520a",
        opacity: 1,
        color: "#fff"
      });
      setTimeout(() => {
        loading.close();
      }, 1500);
    }

    // async passwordReset() {

    // }
  }
};
</script>

<style scoped>
body,
html {
  padding: 0;
  margin: 0;
}

.content {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  background-image: url("../assets/onboarding.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
}

.inputs {
  width: 80%;
}
.loginForm {
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  margin-right: 27%;
  margin-bottom: 10%;
}

.header {
  transform: scale(0.8);
  margin-top: 10%;
}

.headerText {
  margin-right: 3%;
  font-size: 1.3em;
  color: #35520a;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
}

.stuffs {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.formInput {
  transform: scale(1.4);
  font-size: 0.7em;
  margin-left: 28%;
}
</style>
