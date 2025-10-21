<script setup>
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import JobListings from "./JobListings.vue";
</script>

<template>
  <div class="bg-white py-12">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h2 class="text-3xl font-extrabold text-gray-900">Featured Jobs</h2>
        <p class="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
          Check out some of the most popular job openings right now.
        </p>
      </div>

      <div class="mt-10 space-y-4">
        <JobListings :limit="3" :showButton="false" />
      </div>
      <div class="mt-10 text-center">
        <a
          href="/careers"
          class="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-5 py-3 text-base font-medium text-white hover:bg-blue-700"
        >
          View All Jobs
        </a>
      </div>
    </div>
  </div>
</template>
