<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import {ListType} from "@/types";

const props = defineProps({
  modelValue: String as () => ListType,
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
</script>

<template>
  <div class="bg-indigo-950">
    <div class="border-b border-black">
      <nav class="-mb-px flex">
        <button
            @click="updateValue(ListType.CURRENT)"
            class="w-1/3 border-b-2 px-1 py-4 text-center text-sm font-medium"
            v-bind:class="classes(ListType.CURRENT)"
        >
          Current
        </button>
        <button
            @click="updateValue(ListType.PLANNING)"
            class="w-1/3 border-b-2 px-1 py-4 text-center text-sm font-medium"
            v-bind:class="classes(ListType.PLANNING)"
        >
          Planning
        </button>
        <button
            @click="updateValue(ListType.COMPLETED)"
            class="w-1/3 border-b-2 px-1 py-4 text-center text-sm font-medium"
            v-bind:class="classes(ListType.COMPLETED)"
        >
          Completed
        </button>
      </nav>
    </div>
  </div>
</template>