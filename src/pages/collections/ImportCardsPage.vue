<template>
  <div>
    <h1>批量导入</h1>
    <b-input type="textarea"></b-input>
  </div>
</template>

<script>
var Dictionary = require("oxford-dictionary");

var config = {
  app_id: "70c0b880",
  app_key: "c6a1dc956014b2d59d0bbfd11747d9e6",
  source_lang: "en"
};
var dict = new Dictionary(config);
export default {
  created(){
this.onImport()
  },
  methods: {
    onImport() {
      var lookup = dict.find("awesome");

      lookup.then(
        function(res) {
          // stringify JSON object to see full structure in console log
          console.log(JSON.stringify(res, null, 4));
        },
        function(err) {
          console.log(err);
        }
      );
    }
  }
};
</script>

<style>
</style>