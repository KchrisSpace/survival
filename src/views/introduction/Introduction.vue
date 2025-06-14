<template>
  <div class="introduction">
    <div class="bg">
      <Rules/>

    </div>


  </div>
</template>

<script setup >
import { ref, computed, watch } from 'vue'
import Rules from './components/rules.vue'

</script>

<style  scoped>
.bg{
  width: 100vw;
  height: 100vh;
  /* background-color: #fff; */
  background-image: url(/public/png/bg-introduction.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: attachment; 
}
</style>
