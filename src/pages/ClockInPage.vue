<template>
  <div class="container">
    <div class="columns">
      <div class="column is-one-quarter">
        <MainMenu :index="1"></MainMenu>
      </div>
      <div class="column">
        <br />
        <h3 class="title is-3">打卡 & 统计</h3>
        <div class="tile">
          <div class="tile is-parent is-vertical">
            <article class="tile is-child notification is-primary">
              <p class="title">学习</p>
              <p class="subtitle">{{status.touched_words}} 张卡片</p>
            </article>
            <article class="tile is-child notification is-warning">
              <p class="title">熟悉</p>
              <p class="subtitle">{{status.passed_words}} 张卡片</p>
            </article>
          </div>
          <div class="tile is-parent">
            <article class="tile is-child notification is-info">
              <p class="title">学习时长</p>
              <p class="subtitle">{{Math.ceil(status.learning_time / 60)}} 分钟</p>
              <figure class="image is-4by3">
                <img src="https://bulma.io/images/placeholders/640x480.png" />
              </figure>
            </article>
          </div>
        </div>
        <br />
        <section>
          <b-button type="is-dark" @click="clockIn()">打卡</b-button>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
import MainMenu from "../components/MainMenu";
import back from "../plugins/backend";
export default {
  data() {
    return {
      status: {},
      perGroupAmount: 10
    };
  },
  components: {
    MainMenu
  },
  created() {
    this.perGroupAmount =
      parseInt(localStorage.getItem("perGroupAmount")) || 10;
    back.getStatusToday(data => {
      this.status = data;
    });
  },
  watch: {
    perGroupAmount(newVal) {
      localStorage.setItem("perGroupAmount", newVal);
      console.log("saved");
    }
  },
  methods: {
    clockIn() {
      back.clockIn(() => {
        window.open(back.clockInImageUrl, "_blank");
      });
    },
    toHomePage() {
      this.$router.push("/");
    },
    getStatusToday() {
      back.getStatusToday(data => (this.status = data));
    }
  }
};
</script>