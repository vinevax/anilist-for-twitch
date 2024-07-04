<script setup lang="ts">
import {useTwitch} from "@/services/twitch";
import {computed, onMounted, ref, watch} from "vue";
import {ListStatus, ListType, type MediaListEntry} from "@/types";
import NavigationBar from "@/components/NavigationBar.vue";
import ListTypeNavigation from "@/components/ListTypeNavigation.vue";
import MediaCard from "@/components/MediaCard.vue";
import {useCachedList} from "@/services/cachedList";

const { getCachedList } = useCachedList();

const loading = ref(true);
const list = ref<MediaListEntry[]|null>(null);
const currentNavigation = ref(ListStatus.CURRENT);
const currentType = ref<ListType>();

const defaultType = computed(() => {
  const { config } = useTwitch();

  if (config.WatchlistEnabled) return ListType.ANIME;
  if (config.ReadingListEnabled) return ListType.MANGA;

  return ListType.ANIME;
});

const setList = async () => {
  const { config } = useTwitch();

  loading.value = true;
  list.value = await getCachedList(config.AniListUserId, currentNavigation.value, currentType.value);
  loading.value = false;
}

onMounted(async () => {
  currentType.value = defaultType.value;
  await setList();
})

watch(currentNavigation, async () => {
  await setList();
});

watch(currentType, async () => {
  await setList();
});
</script>

<template>
  <div>
    <list-type-navigation v-model="currentType" />
    <navigation-bar v-model="currentNavigation" />

    <div v-if="loading" class="flex flex-row justify-center items-center mt-8">
      <div class="flex flex-col">
        <p class="font-bolds text-2xl text-white">Loading</p>
        <div class="flex flex-row justify-center items-center">
          <div class="loader"></div>
        </div>
      </div>
    </div>

    <div v-else class="px-1.5">
      <div class="grid grid-cols-3 gap-4 mt-4">
        <div v-for="anime in list" v-bind:key="anime.media.id">
          <media-card :anime="anime" />
        </div>
      </div>
    </div>
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
  content:"..."
}
@keyframes l4 {to{clip-path: inset(0 -1ch 0 0)}}
</style>