<template>
  <div class="container">
    <div class="columns">
      <div class="column is-one-quarter">
        <MainMenu :index="9"></MainMenu>
      </div>
      <div class="column">
        <br />
        <h3 class="title is-3">学习设置</h3>
        <section>
          <b-field label="每组学习量">
            <b-numberinput min="1" max="50" v-model="perGroupAmount"></b-numberinput>
          </b-field>

          <b-field label="Age">
            <b-numberinput min="18"></b-numberinput>
          </b-field>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
import MainMenu from "../components/MainMenu"
export default {
  data() {
    return {
      perGroupAmount: 10
    };
  },
  components:{
    MainMenu
  },
  created() {
    this.perGroupAmount = parseInt(localStorage.getItem("perGroupAmount")) || 10;
  },
  watch: {
    perGroupAmount(newVal) {
      localStorage.setItem("perGroupAmount", newVal);
      console.log("saved")
    }
  },
  methods: {
    toHomePage() {
      this.$router.push("/");
    }
  }
};
</script>