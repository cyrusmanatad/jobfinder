<script setup>
import { onMounted, reactive, watch, computed } from "vue";
import SkeletonLoader from "./SkeletonLoader.vue";
import JobCard from "./JobCard.vue";
import axios from "axios";

defineProps({
  limit: Number, // optional prop, not required after pagination
  showButton: {
    type: Boolean,
    default: false,
  },
  showFilter: {
    type: Boolean,
    default: false,
  },
});

const state = reactive({
  initJobs: [],
  jobs: [],
  search: "",
  isLoading: true,
  currentPage: 1,
  lastPage: 1,
  perPage: 5,
  from: 0,
  to: 0,
  total: 0,
  links: [],
});

// Pagination logic
const paginatedJobs = computed(() => {
  const start = (state.currentPage - 1) * state.itemsPerPage;
  const end = start + state.itemsPerPage;
  return state.jobs.slice(start, end);
});

function goToPage(page) {
  if (page >= 1 && page <= state.total) {
    state.currentPage = page;
  }
}

async function updateJobs(data) {
  state.jobs = data.data;
  state.initJobs = data.data;
  state.currentPage = data.current_page || 1;
  state.lastPage = data.last_page || 1;
  state.perPage = data.per_page || 1;
  state.from = data.from || 0;
  state.to = data.to || 0;
  state.total = data.total || 0;
  state.links = data.links || [];
}

// Watch search and reset to page 1
watch(
  () => state.search,
  (newSearch) => {
    state.currentPage = 1;
    state.jobs = state.initJobs.filter((job) =>
      job.title.toLowerCase().includes(newSearch.toLowerCase()),
    );
  },
);

watch(
  () => state.currentPage,
  async (newPage) => {
    state.isLoading = true;
    const response = await axios.get("api/job-listings?page=" + newPage);
    const data = await response.data;
    await updateJobs(data);
    state.isLoading = false;
  },
);

onMounted(async () => {
  try {
    const response = await axios.get("api/job-listings");
    const data = await response.data;
    await updateJobs(data);
  } catch (error) {
    console.error("Failed to fetch jobs", error);
  } finally {
    state.isLoading = false;
  }
});
</script>

<template>
  <div class="space-y-6">
    <div
      v-if="showFilter"
      class="flex flex-col md:flex-row md:items-center md:justify-between"
    >
      <h2 class="mb-4 text-2xl font-bold text-gray-900 md:mb-0">
        Job Listings
      </h2>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <div
            className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
          >
            <i className="pi pi-search text-gray-400"></i>
          </div>
          <input
            id="search"
            name="search"
            v-model="state.search"
            className="block w-100 border bg-white border-gray-300 rounded-md shadow-sm py-2 px-7 text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Type a job title or role"
            type="search"
          />
        </div>
        <select
          id="sortOptions"
          className="border bg-white border-gray-300 rounded-md shadow-sm pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        >
          <option>Date Posted</option>
          <option>Salary</option>
          <option>Relevance</option>
        </select>
        <div
          class="flex items-center justify-center rounded-md text-base shadow-sm"
        >
          <button
            class="cursor-pointer rounded-l border-t border-b border-l border-gray-200 bg-white py-2 pr-3 pl-4 text-sm font-bold text-gray-500 uppercase transition-all duration-150 ease-linear"
            type="button"
          >
            <i class="pi pi-sort-alpha-down text-blue-500"></i></button
          ><button
            class="cursor-pointer rounded-r border-t border-r border-b border-solid border-gray-200 bg-white py-2 pr-4 pl-3 text-sm font-bold text-gray-500 uppercase transition-all duration-150 ease-linear"
            type="button"
          >
            <i class="pi pi-sort-alpha-up-alt"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- <Modal/> -->

    <SkeletonLoader v-if="state.isLoading" v-for="n in limit || 5" :key="n" />

    <div v-else class="space-y-4">
      <JobCard
        v-for="job in state.jobs.slice(0, limit || state.jobs.length)"
        :key="job.id"
        :job="job"
      />

      <!-- Pagination Controls -->
      <div v-if="state.total > 1" class="mt-6 flex justify-center space-x-2">
        <button
          @click="goToPage(1)"
          :disabled="state.currentPage === 1"
          :class="[
            state.currentPage === 1 ? 'text-gray-500' : 'cursor-pointer bg-white',
            'rounded border border-gray-200 px-2 py-1 text-sm',
          ]"
        >
          &lsaquo; First
        </button>

        <button
          v-for="(link, index) in state.links"
          :key="link.page"
          @click="goToPage(link.page)"
          
          :class="[
            index === 0 && state.currentPage === 1 ? 'text-gray-500' : 'cursor-pointer hover:bg-blue-500 hover:text-white',
            'rounded border border-gray-200 px-2 py-1 text-sm',
            link.page === state.currentPage
              ? 'bg-blue-500 text-white'
              : 'bg-white text-gray-700',
          ]"
          v-html="link.label"
        ></button>

        <button
          @click="goToPage(state.lastPage)"
          :disabled="state.currentPage === state.lastPage"
          :class="[
            state.currentPage === state.lastPage
              ? 'text-gray-500'
              : 'cursor-pointer bg-white hover:bg-blue-500 hover:text-white',
            'rounded border border-gray-200 px-2 py-1 text-sm',
          ]"
        >
          Last &rsaquo;
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
select#sortOptions {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='gray'%3E%3Cpath fill-rule='evenodd' d='M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z' clip-rule='evenodd'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  background-size: 1.5em;
}
</style>
