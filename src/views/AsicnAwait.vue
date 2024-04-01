<script setup>
import { defineAsyncComponent } from 'vue'

const AsyncAwait = defineAsyncComponent(() =>
  import('./components/AsyncAwait.vue')
)
</script>

<template>
  <AsyncAwait />
</template>