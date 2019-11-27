<template>
  <div class="container">
    <br />
    <h4 class="title is-4">编辑变位卡片</h4>
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
        <router-link to="/">
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
  created() {
    var vue = this;
    back.getDisplacements(this.$route.params.id, (data)=>{
        console.log("get displacements: ", data);
        this.displacement = data;

    });
  },
  methods: {
    submit() {
      this.displacement.displacements = this.displacement.displacements.filter(
        disp => disp.aux != ""
      );
      if (this.displacement.displacements.length == 0) {
        this.$buefy.toast.open("没有要提交的内容");
        return;
      }
      back.updateDisplacements(this.$route.params.id, this.displacement, () => {
        this.$buefy.toast.open({
          message: "变位卡片更新成功!",
          type: "is-success"
        });
        console.log("updateDisplacements")
      });
    },
    appendDisplacement() {
      this.displacement.displacements.push(getEmptyDisplacement());
    },
    removeLastDisplacement() {
      var item = this.displacement.displacements.pop();
      if(item.id!=undefined){
          back.removeDisplacementItem(item.id)
      }
    }
  }
};
</script>