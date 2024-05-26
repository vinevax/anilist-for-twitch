<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useTwitch} from "@/services/twitch";
import {useAniList} from "@/services/aniList";

const { config, saveConfig } = useTwitch();
const { getUserId } = useAniList();

const username = ref<string>('');
const userId = ref<number | null>(null);
const success = ref<boolean>(false);

onMounted(() => {
  username.value = config.AniListUsername;
})

const onSubmit = async () => {
  if (!username.value) return;

  userId.value = await getUserId(username.value);

  if (!userId.value) return;

  saveConfig({ AniListUsername: username.value, AniListUserId: userId.value});
  toggleSuccess();
}

const toggleSuccess = () => {
  success.value = !success.value;
}
</script>

<template>
  <div>
    <div class="bg-green-800 text-white rounded py-2 px-4 cursor-pointer" @click="toggleSuccess" v-if="success">
      Success (User ID: {{ userId }})
    </div>
    <form @submit.prevent="onSubmit">
      <label for="username" class="text-white text-lg">AniList Username</label>
      <input type="text" class="w-full mb-2 rounded" v-model="username">
      <button type="submit" class="bg-indigo-800 hover:bg-indigo-900 text-white font-semibold py-2 px-8 rounded">Save</button>
    </form>
  </div>
</template>