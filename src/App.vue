<script setup lang="ts">
import { RouterView } from 'vue-router'
import {ref} from "vue";

const isTwitchReady = ref(false);

window.Twitch.ext.configuration.onChanged(async () => {
  isTwitchReady.value = true;
});
</script>

<template>
  <div class="bg-indigo-950/35 min-h-screen" v-if="isTwitchReady">
    <RouterView />
  </div>
</template>
