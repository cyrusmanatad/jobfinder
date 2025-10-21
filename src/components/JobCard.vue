<script setup>
import { ref } from 'vue';
import Modal from './Modal.vue';

const props = defineProps({
  job: Object,
});

const isModalOpen = ref(false);

const postedAgo = (date) => {
  const now = new Date();
  const postedDate = new Date(date);
  const diffTime = Math.abs(now - postedDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'today';
  if (diffDays === 1) return '1 day ago';
  return `${diffDays} days ago`;
};

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};
</script>

<template>
  <div
    class="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
  >
    <div class="flex flex-col sm:flex-row sm:justify-between">
      <div>
        <h3
          class="text-lg font-bold text-gray-900 hover:text-blue-600 cursor-pointer"
        >
          {{job.title}}
        </h3>
        <div
          class="mt-2 flex items-center flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500"
        >
          <span class="font-medium text-green-600">{{job.salary}}</span>
          <span class="hidden sm:inline">&bull;</span>
          <span>{{job.location}}</span>
          <span class="hidden sm:inline">&bull;</span>
          <span>{{ postedAgo(job.created_at) }}</span>
        </div>
      </div>
      <div class="mt-4 sm:mt-0 flex items-start space-x-2 shrink-0">
        <button class="p-2 cursor-pointer text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md">
          <i class="pi pi-share-alt"></i>
        </button>
        <button @click="openModal" class="px-4 cursor-pointer py-2 border border-gray-200 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          View
        </button>
        <button class="px-4 cursor-pointer py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Apply
        </button>
      </div>
    </div>
      <div class="mt-4 pt-4 border-t border-gray-200">
        <p class="text-sm text-gray-600">{{job.description || job.details}}</p>
      </div>
  </div>
  <Modal v-if="isModalOpen" :job="job" @close="closeModal" />
</template>
