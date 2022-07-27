<template>
  <div class="container">
    <section class="content">
      <p
        style="color:#58821a;font-size:1.5em;margin-top:8%;margin-bottom:4%;opacity:0.9; margin-left:32%;"
      >surveillance en directe de votre champ.</p>
      <div style="position:absolute;left:15%;top:20%; width:70%;">
        <vue-plyr>
          <video src="http://localhost:8081/api/video"></video>
        </vue-plyr>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Visualize",
  components: {},
  props: {
    user: {
      type: []
    }
  },
  computed: {
    ...mapState({
      isAuthenticated: "isAuthenticated"
    })
  }
};
</script>
