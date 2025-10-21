<script setup>
import JobFilters from "../components/JobFilters.vue";
import JobListings from "../components/JobListings.vue";
</script>

<template>
  <div class="bg-gray-50">
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        <aside class="lg:col-span-1">
          <JobFilters />
        </aside>
        <main class="lg:col-span-3">
          <JobListings :showFilter="true" />
        </main>
      </div>
    </div>
  </div>
</template>
