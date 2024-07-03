<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  modelValue: String,
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
            @click="updateValue('current')"
            class="w-1/3 border-b-2 px-1 py-4 text-center text-sm font-medium"
            v-bind:class="classes('current')"
        >
          Current
        </button>
        <button
            @click="updateValue('planning')"
            class="w-1/3 border-b-2 px-1 py-4 text-center text-sm font-medium"
            v-bind:class="classes('planning')"
        >
          Planning
        </button>
        <button
            @click="updateValue('completed')"
            class="w-1/3 border-b-2 px-1 py-4 text-center text-sm font-medium"
            v-bind:class="classes('completed')"
        >
          Completed
        </button>
      </nav>
    </div>
  </div>
</template>