<script setup lang="ts">
import {useTwitch} from "@/services/twitch";
import {useAniList} from "@/services/aniList";
import {ref} from "vue";
import AnimeCard from "@/components/AnimeCard.vue";
import type {MediaListEntry} from "@/types";
import NavigationBar from "@/components/NavigationBar.vue";

const { getCurrentWatching } = useAniList();

window.Twitch.ext.configuration.onChanged(async () => {
  const { config } = useTwitch();

  list.value = await getCurrentWatching(config.AniListUserId);
});

const list = ref<MediaListEntry[]|null>(null);

const currentNavigation = ref('current');
</script>

<template>
  <div v-if="list" class="bg-indigo-950/50">
    <navigation-bar v-model="currentNavigation" />
    <div class="px-1.5">
      <div class="grid grid-cols-3 gap-4 mt-4">
        <div v-for="anime in list" v-bind:key="anime.media.id">
          <anime-card :anime="anime" />
        </div>
      </div>
    </div>
  </div>
  <div v-else class="flex flex-row min-h-screen justify-center items-center">
    <div class="loader"></div>
  </div>
</template>

<style scoped>
/** shamelessly stolen from https://css-loaders.com/classic/ */
.loader {
  color: #ffffff;
  width: fit-content;
  font-weight: bold;
  font-family: monospace;
  font-size: 30px;
  clip-path: inset(0 3ch 0 0);
  animation: l4 1s steps(4) infinite;
}
.loader:before {
  content:"Loading..."
}
@keyframes l4 {to{clip-path: inset(0 -1ch 0 0)}}
</style>