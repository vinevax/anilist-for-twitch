<script setup lang="ts">
import {computed, defineEmits, defineProps} from "vue";
import {ListType} from "@/types";
import {useTwitch} from "@/services/twitch";

const props = defineProps({
  modelValue: String as () => ListType | null,
});

const emit = defineEmits(['update:modelValue']);

const updateValue = (newValue: any) => {
  emit('update:modelValue', newValue);
};

const classes = (value: string) => {
  if (props.modelValue === value) {
    return 'border-white text-white';
  }

  return 'border-transparent text-gray-500 hover:border-gray-500 hover:text-gray-300';
}

const showNavigation = computed(() => {
  const { config } = useTwitch();

  return config.WatchlistEnabled && config.ReadingListEnabled;
});
</script>

<template>
  <div class="bg-indigo-950" v-if="showNavigation">
    <div class="border-b border-black">
      <nav class="-mb-px flex">
        <button
            @click="updateValue(ListType.ANIME)"
            class="w-1/2 border-b-2 px-1 py-4 text-center text-sm font-medium"
            v-bind:class="[classes(ListType.ANIME)]"
        >
          Anime
        </button>
        <button
            @click="updateValue(ListType.MANGA)"
            class="w-1/2 border-b-2 px-1 py-4 text-center text-sm font-medium"
            v-bind:class="classes(ListType.MANGA)"
        >
          Manga
        </button>
      </nav>
    </div>
  </div>
</template>