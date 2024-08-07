<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useTwitch} from "@/services/twitch";
import {useAniList} from "@/services/aniList";
import type {Language} from "@/types";

const { config, saveConfig } = useTwitch();
const { getUserId } = useAniList();

const username = ref<string>(config.AniListUsername);
const preferredLanguage = ref<Language>(config.PreferredLanguage)
const watchlistEnabled = ref<boolean>(config.WatchlistEnabled);
const readingListEnabled = ref<boolean>(config.ReadingListEnabled);

const userId = ref<number | null>(null);
const success = ref<boolean>(false);

onMounted(() => {
  username.value = config.AniListUsername;
  preferredLanguage.value = config.PreferredLanguage;
})

const onSubmit = async () => {
  if (!username.value) return;

  userId.value = await getUserId(username.value);

  if (!userId.value) return;

  saveConfig({
    AniListUsername: username.value,
    AniListUserId: userId.value,
    PreferredLanguage: preferredLanguage.value,
    WatchlistEnabled: watchlistEnabled.value,
    ReadingListEnabled: readingListEnabled.value
  });

  success.value = true;
}

const toggleSuccess = () => {
  success.value = !success.value;
}
</script>

<template>
  <div class="p-4">
    <div class="bg-green-800 text-white rounded py-2 px-4 cursor-pointer" @click="toggleSuccess" v-if="success">
      Success (User ID: {{ userId }})
    </div>
    <form @submit.prevent="onSubmit">
      <label for="username" class="text-white text-lg">AniList Username</label>
      <input type="text" class="w-full mb-2 rounded" v-model="username">

      <div>
        <label for="preferredLanguage" class="text-white text-lg">Preferred Language</label>
        <select class="w-full rounded" v-model="preferredLanguage">
          <option value="english">English</option>
          <option value="romaji">Romaji</option>
          <option value="native">Native</option>
        </select>
      </div>

      <div>
        <div class="my-3">
          <input id="watchlistEnabled" type="checkbox" class="rounded" v-model="watchlistEnabled">
          <label for="watchlistEnabled" class="px-3 text-white">Enable watchlist?</label>
        </div>
        <div>
          <input id="readingListEnabled" type="checkbox" class="rounded" v-model="readingListEnabled">
          <label for="readingListEnabled" class="px-3 text-white">Enable reading list?</label>
        </div>
      </div>

      <button type="submit" class="bg-indigo-800 hover:bg-indigo-900 text-white font-semibold py-2 px-8 mt-4 rounded">Save</button>
    </form>
  </div>
</template>