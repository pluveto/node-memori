<template>
  <div class="container">
    <div class="columns">
      <div class="column is-one-quarter">
        <MainMenu :index="0"></MainMenu>
      </div>
      <div class="column">
        <br />
        <h4 class="title is-4">今日记忆任务</h4>
        <nav class="panel">
          <a class="panel-block is-active">
            <span class="panel-icon">
              <i class="fa fa-book" aria-hidden="true"></i>
            </span>
            法语 - 未完成
          </a>
        </nav>

        <h4 class="title is-4">卡片集合</h4>
        <nav class="panel">
          <router-link
            :to="'/collections/'+item.id"
            class="panel-block is-active"
            v-for="item in collections"
            v-bind:data="item"
            v-bind:key="item.id"
          >
            <span class="panel-icon">
              <i class="fa fa-book" aria-hidden="true"></i>
            </span>
            {{item.name}}
          </router-link>
        </nav>

        <div class="field has-addons">
          <p class="control is-expanded">
            <input class="input" type="text" placeholder="新增一个卡片集合" v-model="newCollectionName" />
          </p>
          <p class="control">
            <a class="button is-primary" @click.prevent="onNewCollectionClicked()">新增</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

  <script>
import back from "../plugins/backend";
import MainMenu from "../components/MainMenu"
export default {
  data: function() {
    return {
      message: "Hello",
      newCollectionName: ""
    };
  },
  components:{
    MainMenu
  },
  created: function() {
    console.log("HomePage Created");
    this.$root.$store.commit("updateCollections");
  },
  computed: {
    collections() {
      return this.$root.$store.state.collections;
    }
  },
  methods: {
    onNewCollectionClicked() {
      var vue = this;
      if (this.newCollectionName == "") {
        alert("无效的名称!");
        return;
      }
      /*this.$root.$router.go({
        path: '/1',
        force: true
      })*/
      let c = vue.$root.$store.state.collections;
      c.push({
        id: c[c.length - 1].id + 1,
        name: this.newCollectionName
      });
      back.addCollection(this.newCollectionName, function() {
        console.log("add collection: " + vue.newCollectionName);
      });
      this.newCollectionName = "";
    },
    toSettingsPage(){
      
      this.$router.push('/settings')
    }
  }
};
</script>