<template>
  <div class="card memori-card" style>
    <br />
    <h3 class="title is-3 word">{{card.pos.replace(/n\.(f|m)\./g, "n.?? ") + card.translation}}</h3>
    <div class="card-center">请根据中文拼写单词</div>
    <table width="100%" style="table-layout:fixed;flex: 0 1 40px;">
      <tr>
        <td colspan="2">
          <b-field style="padding-bottom: 1em">
            <b-input ref="spellInput" v-model="status.myAnswer" @keyup.native.enter="submit"></b-input>
          </b-field>
        </td>
      </tr>
      <tr>
        <td style="padding-right: .3em;">
          <b-button type="is-light" style="width: 100%" @click="forget()">想不起来</b-button>
        </td>
        <td style="padding-left: .3em;">
          <b-button type="is-success" style="width: 100%" @click="submit()">提交答案</b-button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    card: {},
    correctCallback: Function,
    wrongCallback: Function,
    forgetCallback: Function
  },
  created() {
    this.$nextTick(() => {
      this.$refs.spellInput.focus();
      console.log("focus");
    });
  },
   mounted() {
    window.addEventListener("keydown", this.shortcut);
  },
  destroyed() {
    window.removeEventListener("keydown", this.shortcut);
  },
  methods: {
    shortcut: function(e) {
      if (e.keyCode == 112) {
        this.forget();
        e.preventDefault()
      }
      if (e.keyCode == 113) {
        this.submit();
        e.preventDefault()
      }
      
    },
    forget() {
      this.forgetCallback();
      console.log("forget");
    },
    submit() {
      var filter = function(text){
        return text
          .replace(" ", "")
          .replace("-", "")
          .replace(')', "")          
          .replace("'", "")          
          .replace('(', "")
          .replace('œ', "oe")
          .trim().toLowerCase();
      };
      if (filter(this.status.myAnswer) == filter(this.card.spell)) {
        this.correctCallback();
      } else {
        this.wrongCallback();
      }
      console.log("emit");
    }
  },
  data() {
    return {
      status: {
        myAnswer: ""
      }
    };
  }
};
</script>

<style>
.word {
  margin-bottom: 2em;
  flex: 0 1 auto;
  text-align: center;
}
.card-center {
  flex: 1 1 auto;
}
.memori-card {
  padding: 1em;
  height: 100%;
  display: flex;
  flex-flow: column;
}
</style>