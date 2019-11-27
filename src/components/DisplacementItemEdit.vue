<template>
  <div class="columns">
    <div class="column">
      <label class="label">词性</label>
      <div class="control">
        <input v-model="pos" @keyup="$emit('update:pos', pos);" class="input" type="text" placeholder="Text input" />
      </div>
    </div>
    <div class="column">
      <label class="label">辅助文本</label>
      <div class="control">
        <input v-model="aux" @keyup="$emit('update:aux', aux);" class="input" type="text" placeholder="Text input" />
      </div>
    </div>
    <div class="column">
      <label class="label">答案</label>
      <div class="control">
        <input v-model="answer" @keyup="$emit('update:answer', answer);" class="input" type="text" placeholder="Text input" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DisplacementItemEdit",  
  props: {
    pos: String,
    aux: String,
    answer: String
  }
};
</script>

<style>
</style>