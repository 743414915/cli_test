<template>
  <div class="tarbar">
    <h2>{{ msg }}</h2>
  </div>
</template>
<script setup lang="ts">
  import { ref } from "vue";

  const msg = ref("tarbar");
</script>
<style lang="less" scoped>
  .tarbar {
    
  }
</style>