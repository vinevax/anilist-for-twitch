<script setup lang="ts">
import type {MediaListEntry} from "@/types";
import {computed} from "vue";

const props = withDefaults(
    defineProps<{
        anime: MediaListEntry;
    }>(),
    {
        anime: null!
    }
)

const title = computed(() => props.anime.media.title.english ?? props.anime.media.title.romaji ?? props.anime.media.title.native);
</script>

<template>
  <div v-if="anime" class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-full group">
    <a :href="anime.media.siteUrl">
      <div class="relative h-48 transition-all duration-200">
        <img class="rounded-t-lg absolute z-0 w-full h-full rounded-lg" :src="anime.media.coverImage.large" :alt="title" />
        <div class="p-5 absolute inset-0 items-center justify-center group-hover:bg-black/75 rounded-lg hidden group-hover:flex">
          <h5 class="mb-2 font-bold tracking-tight text-white p-2 text-shadow-md text-center">
            {{ title }}
          </h5>
        </div>
      </div>
    </a>
  </div>
</template>