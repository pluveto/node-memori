<template>
  <div class="container">
    <br />
    <h4 class="title is-4">编辑卡片</h4>
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
        <button @click="submit" class="button is-link">更新</button>
      </div>
      <div class="control">
        <button @click="back()" class="button is-text">取消 / 返回</button>
      </div>
    </div>
  </div>
</template>
<script>
import back from "../../plugins/backend";
export default {
  data() {
    return {
      card: {
        collection_id: 0,
        pos: "",
        spell: "",
        translation: "",
        addition: ""
      }
    };
  },
  created() {
    var vue = this;
    back.getCard(this.$route.params.id, function(data) {
      vue.card = data;
    });
  },
  methods: {
    submit() {
      // TODO: Check empty
      var vue = this;
      back.updateCard(this.card, (data) => {
        console.log(data);
         this.$buefy.toast.open(`编辑成功`);
         this.$router.go(-1)
      });
    },
    back(){
      this.$router.go(-1)
    }
  }
};
</script>