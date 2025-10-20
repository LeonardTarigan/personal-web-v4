<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import formatRelativeTime from "../../../lib/utils/formatRelativeTime";

const props = defineProps<{
  date: Date;
}>();

const relativeTime = ref(formatRelativeTime(props.date));
let interval: number;

onMounted(() => {
  interval = window.setInterval(() => {
    relativeTime.value = formatRelativeTime(props.date);
  }, 300000);
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>

<template>
  <time :datetime="date.toISOString()">{{ relativeTime }}</time>
</template>
