<template>
  <div class="container">
    <br />
    <h4 class="title is-4">添加变位卡片到 {{collection.name}}</h4>

    <article class="message is-success" v-if="success">
      <div class="message-body">
        <p>
          单词
          <b>{{success}}</b> 添加成功!
        </p>
      </div>
    </article>

    <h4 class="title is-5">基本</h4>
    <div class="field">
      <label class="label">原型 / 提示词</label>
      <div class="control">
        <input v-model="displacement.hint" class="input" type="text" placeholder="Text input" />
      </div>
    </div>
    <div class="field">
      <label class="label">释义</label>
      <div class="control">
        <input
          v-model="displacement.translation"
          class="input"
          type="text"
          placeholder="Text input"
        />
      </div>
    </div>
    <br />

    <div class="control" style="float:right">
      <a
        class="button is-info is-small"
        style="border-radius: 0"
        @click="autoFillIndicatifPrésent()"
      >自动填写法语直陈式现在时变位</a>
      <a
        class="button is-primary is-small"
        style="border-radius: 0"
        @click="appendDisplacement()"
      >添加变位</a>
      <a
        class="button is-danger is-small"
        style="border-radius: 0"
        @click="removeLastDisplacement()"
      >删除最末</a>
    </div>
    <h4 class="title is-5">变位列表</h4>
    <div>
      <div v-for="disp in displacement.displacements" :key="disp.key">
        <div class="columns">
          <div class="column">
            <label class="label">词性</label>
            <div class="control">
              <input v-model="disp.pos" class="input" type="text" placeholder="Text input" />
            </div>
          </div>
          <div class="column">
            <label class="label">辅助文本</label>
            <div class="control">
              <input v-model="disp.aux" class="input" type="text" placeholder="Text input" />
            </div>
          </div>
          <div class="column">
            <label class="label">答案</label>
            <div class="control">
              <input v-model="disp.answer" class="input" type="text" placeholder="Text input" />
            </div>
          </div>
        </div>
        <hr />
      </div>
    </div>
    <br />
    <div class="field is-grouped">
      <div class="control">
        <button @click="submit()" class="button is-link">提交</button>
      </div>
      <div class="control">
        <router-link :to="'/collections/'+ collection.id">
          <button class="button is-text">取消 / 返回</button>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import back from "../../plugins/backend";
var getEmptyDisplacement = () => {
  return {
    key: Math.random() * 100,
    pos: "",
    aux: "",
    answer: ""
  };
};
export default {
  data() {
    return {
      collection: {},
      displacement: {
        hint: "",
        translation: "",
        displacements: []
      },
      success: ""
    };
  },
  components: {
    DisplacementItemEdit: () => import("../../components/DisplacementItemEdit")
  },
  created() {
    var vue = this;
    back.getCollection(this.$route.params.id, function(data) {
      vue.collection = data;
    });
    this.displacement.displacements.push(getEmptyDisplacement());
  },
  methods: {
    submit() {
      this.displacement.displacements = this.displacement.displacements.filter(
        disp => disp.aux != ""
      );
      if (this.displacement.displacements.length == 0) {
        this.$buefy.toast.open("没有要提交的内容");
        this.reset();
        return;
      }
      back.addDisplacements(this.$route.params.id, this.displacement, () => {
        this.$buefy.toast.open({
          message: "变位卡片添加成功!",
          type: "is-success"
        });
        this.reset();
      });
    },
    reset() {
      this.displacement = {
        hint: "",
        translation: "",
        displacements: [getEmptyDisplacement()]
      };
    },
    autoFillIndicatifPrésent() {
      var vue = this;
      if (this.displacement.hint == "") {
        this.$buefy.toast.open({
          message: "请提供动词原形!",
          type: "is-warning"
        });
        return;
      }
      back.getFrenchConjungation(this.displacement.hint, data => {
        if (data.detail != undefined) {
          this.$buefy.toast.open({
            message: "变位错误!",
            type: "is-danger"
          });
          return;
        }
        var result = data.value.moods.indicatif.présent;
        vue.displacement.translation = data.value.verb.translation_en;
        vue.displacement.displacements = vue.displacement.displacements.filter((c)=>{
          return c.pos != '' || c.aux != '' || c.answer!=''
        })
        result.forEach(word => {
          var spl = word.split(" ");
          vue.displacement.displacements.push({
            key: Math.random() * 100,
            pos: "v. indicatif présent",
            aux: spl[0],
            answer: spl[1]
          });
        });
        vue.submit()
      });
    },
    appendDisplacement() {
      this.displacement.displacements.push(getEmptyDisplacement());
    },
    removeLastDisplacement() {
      this.displacement.displacements.pop();
    }
  }
};
</script>