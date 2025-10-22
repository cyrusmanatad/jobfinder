<script setup>
import { ref } from 'vue';
import CheckboxFilter from './CheckboxFilter.vue';
import FilterCard from './FilterCard.vue';

const props = defineProps({
  job: Object,
});

const activeDate = ref('All Time');

const dateFilterDefaultClass = [
  'w-full',
  'text-center',
  'px-2',
  'py-1.5',
  'text-xs',
  'font-medium',
  'rounded-md',
  'transition-colors',
  'duration-200',
  'cursor-pointer',
];

const dateFilters = ['All Time', 'Today', 'This Week', 'This Month'];

</script>

<template>
  <div className="space-y-6">
    <FilterCard/>

    <div className="bg-white border border-gray-200 rounded-lg">
      <div
        className="p-6 border-b border-gray-200 flex justify-between items-center"
      >
        <h3 className="text-lg font-semibold text-gray-900">Job Filters</h3>
        <button
          className="cursor-pointer text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          Reset Filters
        </button>
      </div>

      <div className="p-6 space-y-6">
        <!-- {/* Date Posted Filter */} -->
        <div>
          <h4 className="font-medium text-gray-700 mb-3">Date Posted</h4>
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-md">
            <button v-for="date in dateFilters" 
            :key="date" 
            @click="() => { activeDate = date}" 
            :class="[...dateFilterDefaultClass, activeDate === date ? 'bg-blue-600 text-white shadow' : 'text-gray-600 hover:bg-gray-200']"
            >{{ date }}</button>
          </div>
        </div>

        <!-- {/* Salary Range Filter */} -->
        <div>
          <h4 className="font-medium text-gray-700 mb-3">Salary Range</h4>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              placeholder="10000"
              className="w-full bg-white border border-gray-200 rounded-md shadow-sm text-sm placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none py-2 px-3"
            />
            <span className="text-gray-500">&rarr;</span>
            <input
              type="number"
              placeholder="50000"
              className="w-full bg-white border border-gray-200 rounded-md shadow-sm text-sm placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none py-2 px-3"
            />
          </div>
          <!-- <div className="mt-4">
            <input
              type="range"
              min="10000"
              max="100000"
              defaultValue="50000"
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div> -->
        </div>

        <!-- {/* Recruitment Type Filter */} -->
        <div>
          <h4 className="font-medium text-gray-700 mb-3">Job Type</h4>
          <div className="space-y-2">
            <CheckboxFilter label="Full-Time" tooltip />
            <CheckboxFilter label="Part-Time" tooltip />
          </div>
        </div>

        <!-- {/* Work Setup Filter */} -->
        <div>
          <h4 className="font-medium text-gray-700 mb-3">Work Setup</h4>
          <div className="space-y-2">
            <CheckboxFilter label="Office" />
            <CheckboxFilter label="Work from Home" />
            <CheckboxFilter label="Hybrid" />
          </div>
        </div>

        <!-- {/* Shift Schedule Filter */} -->
        <div>
          <h4 className="font-medium text-gray-700 mb-3">Shift Schedule</h4>
          <div className="space-y-2">
            <CheckboxFilter label="Day Shift" />
            <CheckboxFilter label="Mid Shift" />
            <CheckboxFilter label="Night Shift" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
