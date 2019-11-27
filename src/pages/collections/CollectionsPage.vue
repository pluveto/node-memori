<style>
.center {
  text-align: center;
}
</style>
<template>
  <div class="container">
    <br />
    <h3 class="title is-3">{{collection.name}}</h3>
    <div class="control">
      <router-link class="button is-primary" :to="'/collections/'+collection.id+'/learn'">临时学习此卡组</router-link>
    </div>
    <br />
    
    <div class="control" style="float:right">
      <b-button @click="randomlyActivate()">随机激活十张卡片</b-button>
      <router-link
        :to="'/collections/'+collection.id+'/add'"
        class="button is-primary is-small"
        style="border-radius: 0"
      >添加卡片</router-link>
      <a class="button is-danger is-small" style="border-radius: 0" @click="deleteThis()">删除此集合</a>
    </div>
    <h4 class="title is-4">普通卡片</h4>
      <b-pagination
      :total="pagination.total"
      :current.sync="pagination.current"
      range-before="3"
      range-after="1"
      order="is-right"
      size="is-small"
      icon-pack="fa"
      :simple="true"
      :rounded="true"
      :per-page="pagination.pagesize"
      icon-prev="chevron-left"
      icon-next="chevron-right"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
    ></b-pagination>
    <table class="table" style="width: 100%">
      <tr>
        <th style="width: 20px">状态</th>
        <th style="width: 200px">拼写</th>
        <th>释义</th>
        <th style="width: 100px">熟练度</th>
        <th style="width: 100px">操作</th>
      </tr>

      <tr v-for="card in cards" v-bind:data="card" v-bind:key="card.id">
        <td>
          <b-checkbox
            :value="card.is_activated"
            v-model="card.is_activated"
            :true-value="1"
            :false-value="0"
            @input="(value)=>{updateActivate(value, card.id)}"
          ></b-checkbox>
        </td>
        <td>{{card.spell}}</td>
        <td>{{'('+card.pos+') ' + card.translation}}</td>
        <td>{{card.mastery}}</td>
        <td>
          <router-link
            :to="'/cards/' + card.id + '/edit'"
            class="button is-info is-small"
            style="border-radius: 0"
            @click="removeCard(card.id)"
          >E</router-link>
          <a
            class="button is-danger is-small"
            style="border-radius: 0"
            @click="removeCard(card.id)"
          >D</a>
        </td>
      </tr>
    </table>
    <div class="center">
      <p v-if="cards==null || cards.length == 0">集合里没有任何卡片.</p>
    </div>

  

    <h4 class="title is-4">未激活的卡片</h4>
    <b-button @click="activateThisPage()">激活本页卡片</b-button>
    <table class="table" style="width: 100%">
      <tr>
        <th style="width: 20px">状态</th>
        <th style="width: 200px">拼写</th>
        <th>释义</th>
        <th style="width: 100px">熟练度</th>
        <th style="width: 100px">操作</th>
      </tr>

      <tr v-for="card in cardsInactivated" v-bind:data="card" v-bind:key="card.id">
        <td>
          <b-checkbox
            :value="card.is_activated"
            v-model="card.is_activated"
            :true-value="1"
            :false-value="0"
            @input="(value)=>{updateActivate(value, card.id)}"
          ></b-checkbox>
        </td>
        <td>{{card.spell}}</td>
        <td>{{'('+card.pos+') ' + card.translation}}</td>
        <td>{{card.mastery}}</td>
        <td>
          <router-link
            :to="'/cards/' + card.id + '/edit'"
            class="button is-info is-small"
            style="border-radius: 0"
            @click="removeCard(card.id)"
          >E</router-link>
          <a
            class="button is-danger is-small"
            style="border-radius: 0"
            @click="removeCard(card.id)"
          >D</a>
        </td>
      </tr>
    </table>
    <div class="center">
      <p v-if="cards==null || cards.length == 0">集合里没有任何卡片.</p>
    </div>
    <section>
      <hr />
      <b-pagination
        :total="paginationForInactivated.total"
        :current.sync="paginationForInactivated.current"
        range-before="3"
        range-after="1"
        order="is-right"
        size="is-small"
        icon-pack="fa"
        :simple="true"
        :rounded="true"
        :per-page="paginationForInactivated.pagesize"
        icon-prev="chevron-left"
        icon-next="chevron-right"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
      ></b-pagination>
    </section>
    <br />
    <div class="control" style="float:right">
      <router-link
        :to="'/collections/'+collection.id+'/displacements/add'"
        class="button is-primary is-small"
        style="border-radius: 0"
      >添加变位卡片</router-link>
    </div>
    <h4 class="title is-4">变位卡片</h4>
    <table class="table" style="width: 100%">
      <tr>
        <th style="width: 200px">原型 / 提示词</th>
        <th>释义</th>
        <th style="width: 100px">操作</th>
      </tr>

      <tr
        v-for="displacement in displacements"
        v-bind:data="displacement"
        v-bind:key="displacement.id"
      >
        <td>{{displacement.hint}}</td>
        <td>{{displacement.translation}}</td>
        <td>
          <router-link
            :to="'/displacements/' + displacement.id + '/edit'"
            class="button is-info is-small"
            style="border-radius: 0"
          >E</router-link>
          <a
            class="button is-danger is-small"
            style="border-radius: 0"
            @click="removeDisplacement(displacement.id)"
          >D</a>
        </td>
      </tr>
    </table>
    <div class="center">
      <p v-if="displacements==null || displacements.length == 0">集合里没有任何卡片.</p>
    </div>
  </div>
</template>
<script>
import back from "../../plugins/backend";
export default {
  data: function() {
    return {
      collection: {},
      cards: [],
      cardsInactivated: [],
      displacements: [],
      pagination: {
        current: 1,
        total: 200,
        pagesize: 10
      },
      paginationForInactivated: {
        current: 1,
        total: 200,
        pagesize: 10
      },
      paginationForDisplacements: {
        current: 1,
        total: 200,
        pagesize: 10
      }
    };
  },
  created() {
    var vue = this;
    back.getCollection(this.$route.params.id, function(data) {
      vue.collection = data;
    });
    this.refetchCards();
    this.refetchCardsInactivated();
    this.refetchDisplacementRels();
  },
  methods: {
    refetchCards() {
      back.getCards(
        this.$route.params.id,
        this.pagination.current,
        this.pagination.pagesize,
        data => {
          console.log("cards got: ", data);
          this.cards = data.data;
          this.pagination.total = data.total;
        }
      );
    },
    randomlyActivate(){
      back.randomlyActivate(this.$route.params.id, (data)=>{
        this.$buefy.toast.open(`随机激活了十张卡片！`);
        console.log(data)
      })
    },
    activateThisPage(){
      for(var i = 0; i < this.cardsInactivated.length; i++){
        var current = this.cardsInactivated[i];
        this.updateActivate(1,current.id);
      }
    },
    refetchCardsInactivated() {
      back.getCardsByActivation(
        this.$route.params.id,
        this.paginationForInactivated.current,
        this.paginationForInactivated.pagesize,
        0,
        data => {
          console.log("cards got: ", data);
          this.cardsInactivated = data.data;
          this.paginationForInactivated.total = data.total;
        }
      );
    },
    refetchDisplacementRels() {
      back.getDisplacementRels(
        this.$route.params.id,
        this.paginationForDisplacements.current,
        this.paginationForDisplacements.pagesize,
        data => {
          console.log("disps got: ", data);
          this.displacements = data.data;
          this.paginationForDisplacements.total = data.total;
        }
      );
    },
    deleteThis() {
      var vue = this;
      this.$buefy.dialog.confirm({
        title: "删除集合",
        message: `你真的要删除这个卡片集合吗？无法反悔。`,
        confirmText: "删掉",
        cancelText: "别！",
        type: "is-danger",
        hasIcon: true,
        onConfirm: value => {
          back.removeCollection(vue.collection.id);
          this.$buefy.toast.open(`删除了卡册`);
          vue.$root.$store.commit("updateCollections", function() {
            vue.$router.push("/");
            console.log("back");
          });
        }
      });
    },
    removeCard(id) {
      var vue = this;
      this.$buefy.dialog.confirm({
        title: "删除卡片",
        message: `你真的要删除吗`,
        confirmText: "删掉",
        cancelText: "别！",
        type: "is-danger",
        hasIcon: true,
        onConfirm: value => {
          back.removeCard(id);
          vue.cards = vue.cards.filter(c => c.id != id);
          this.$buefy.toast.open(`删除了一张卡片`);
          //this.refetchCards();
          this.pagination.total--;
        }
      });
    },
    removeDisplacement(relId) {
      var vue = this;
      this.$buefy.dialog.confirm({
        title: "删除一套变位卡片",
        message: `你真的要删除吗，其下的所有变位都将被删除`,
        confirmText: "删掉",
        cancelText: "别！",
        type: "is-danger",
        hasIcon: true,
        onConfirm: value => {
          back.removeDisplacementRel(relId);
          vue.displacements = vue.displacements.filter(c => c.id != relId);
          this.$buefy.toast.open(`删了，真的。`);
          //this.refetchDisplacementRels();
          this.paginationForDisplacements.total--;
        }
      });
    },
    updateActivate(is_activated, id) {
      console.log("update active", id)
      if (this.cards && undefined!=this.cards.find(x => x.id == id))
        this.cards.find(x => x.id == id).is_activated = is_activated;
      if (this.cardsInactivated && undefined!=this.cardsInactivated.find(x => x.id == id))
        this.cardsInactivated.find(x => x.id == id).is_activated = is_activated;
      back.setCardActivation(id, is_activated);
      console.log(is_activated, " ", id);
    }
  },
  watch: {
    "pagination.current": function() {
      this.refetchCards();
    },
    "paginationForInactivated.current": function() {
      this.refetchCardsInactivated();
    }
  }
};
</script>
