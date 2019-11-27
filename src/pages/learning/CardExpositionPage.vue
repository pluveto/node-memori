<template>
  <div class="card memori-card" @keyup.68="continueClick()" style>
    <br />
    <h3
      class="title is-2"
      style="font-family: 'Merriweather', serif; text-align: center;"
    >{{card.spell}}</h3>
    <br />
    <b-message title="释义" type="is-info" :closable="false">
      <p>{{card.pos}}</p>
      <p style="text-indent: 2em;">{{card.translation}}</p>
      <router-link :to="'/cards/'+card.id +'/edit'" class="button">编辑卡片</router-link>
      <b-button @click="deactivateThis()">禁用此卡片</b-button>
    </b-message>
    <b-message title="笔记" :closable="false" class="card-center">
      <div v-show="editMode">
        <b-field label>
          <b-input v-model="card.addition" maxlength="20000" type="textarea"></b-input>
        </b-field>
        <b-button rounded class="is-pulled-right" @click="onSaveNotes()">保存</b-button>
      </div>
      <div style="min-height: 20px" v-show="!editMode" @click="editMode=true" id="notes">
        <div v-show="card.addition!=''" id="note-content"></div>
        <div v-show="card.addition==''">暂无内容</div>
        <hr />
        <div id="etymology"></div>
      </div>
    </b-message>
    <b-button type="is-primary" style="width: 100%" @click="continueClick()">继续</b-button>
  </div>
</template>

<script>
import back from "../../plugins/backend.js";
export default {
  data() {
    return {
      editMode: false
    };
  },
  props: {
    card: {},
    etymology: "",
    editAdditionCallback: Function,
    continueClickCallback: Function,
    skipCallback: Function
  },
  watch: {},
  mounted() {
    this.renderAddition();
    window.addEventListener("keydown", this.shortcut);
    console.log("etymology:");
    if (this.card.collection_id != 55) {
      back.getEtymology(this.card.spell, data => {
        var ele = this.$el.querySelector("#etymology");
        ele.innerHTML = data;
      });
    }
  },
  destroyed() {
    window.removeEventListener("keydown", this.shortcut);
    console.log("removed");
  },
  methods: {
    deactivateThis() {
      back.setCardActivation(this.card.id, 0, () => {
        console.log("卡片禁用");
        this.skipCallback();
      });
    },
    shortcut: function(e) {
      if (e.keyCode == 68) {
        this.continueClickCallback();
      }
    },
    continueClick() {
      this.continueClickCallback();
    },
    renderAddition() {
      this.editMode = false;
      var ele = this.$el.querySelector("#note-content");
      var showdown = require("showdown");
      var converter = new showdown.Converter();
      var html = converter.makeHtml(this.card.addition);
      ele.innerHTML = html;
      console.log("addition rendered");
    },
    onSaveNotes() {
      this.renderAddition();
      this.editAdditionCallback(this.card.addition);
    }
  }
};
</script>

<style>
.memori-card {
  padding: 1em;
  height: 100%;
  display: flex;
  flex-flow: column;
}
.card-center {
  flex: 1 1 auto;
}
#notes h1 {
  font-size: 2em;
}
#notes h2 {
  font-size: 1.8em;
}
#notes h3 {
  font-size: 1.6em;
}
#notes h4 {
  font-size: 1.4em;
}
#notes h5 {
  font-size: 1.2em;
}
#notes ul {
  display: block;
  list-style-type: disc;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 40px;
}
#notes blockquote {
  padding: 10px 20px;
  margin: 0 0 20px;
  font-size: 17.5px;
  border-left: 5px solid #cdd;
}
#notes hr {
  margin-top: 20px;
  margin-bottom: 20px;
  border: 0;
  border-top: 1px solid #eee;
}

#notes ol {
  display: block;
  list-style-type: decimal;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 40px;
}
body .poetry {
  margin: 0;
}

body .poetry + .poetry {
  padding-top: 0;
}

body .crossreference {
  cursor: pointer;
  color: #83001d;
  font-weight: 700;
}

body .crossreference:hover {
  -webkit-text-decoration: underline solid #83001d;
  text-decoration: underline solid #83001d;
}

body .foreign {
  font-style: italic;
}
b,
strong {
  font-weight: inherit;
  font-weight: bolder;
}
</style>