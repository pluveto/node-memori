<template>
  <div class="container">
    <br />
    <h4 class="title is-4">添加卡片到 {{collection.name}}</h4>
                <b-button type="is-link" @click="queryWord(card.spell,'fr')">法语查词</b-button>
            <b-button type="is-link" @click="queryWord(card.spell,'en')">英语查词</b-button>

    <article class="message is-success" v-if="success">
      <div class="message-body">
        <p>
          单词
          <b>{{success}}</b> 添加成功!
        </p>
      </div>
    </article>

    <div class="field">
      <label class="label">词性</label>
      <div class="control">
        <input v-model="card.pos" class="input" type="text" placeholder="Text input" />
      </div>
    </div>
    <div class="field">
      <label class="label">拼写</label>
      <div class="control">
        <input v-model="card.spell" class="input" type="text" placeholder="Text input" />
      </div>
    </div>
    <div class="field">
      <label class="label">释义</label>
      <div class="control">
        <textarea v-model="card.translation" class="textarea" placeholder="Textarea"></textarea>
      </div>
    </div>
    <div class="field">
      <label class="label">附加信息</label>
      <div class="control">
        <textarea v-model="card.addition" class="textarea" placeholder="Textarea"></textarea>
      </div>
    </div>
    <div class="field is-grouped">
      <div class="control">
        <button @click="submit" class="button is-link">提交</button>
      </div>
      <div class="control">
        <router-link :to="'/collections/'+ collection.id" ><button class="button is-text">取消 / 返回</button></router-link>
      </div>
    </div>
  </div>
</template>
<script>
import back from "../../plugins/backend";
export default {
  data() {
    return {
      updateMode: false,
      collection: {},
      card: {
        pos: "",
        spell: "",
        translation: "",
        addition: ""
      },
      success: ""
    };
  },
  created() {
    var vue = this;
    back.getCollection(this.$route.params.id, function(data) {
      vue.collection = data;
    });
  },
  methods: {
    queryWord(spell, lang){
      console.log("query " + spell)
      back.queryWord(spell, lang, (data)=>{
        this.card.pos = data.pos
        this.card.translation = data.translation
        this.card.spell = data.spell
        this.card.addition = data.addition
        console.log(data);
      })
    },
    submit() {
      // TODO: Check empty
      var vue = this;
      back.addCard(this.$route.params.id, this.card, function(data) {
        console.log(data);
        vue.success = data.spell;
        vue.card = {
          pos: "",
          spell: "",
          translation: "",
          addition: ""
        };
      });
    }
  }
};
</script>