<script setup>
import { useAuthStore } from '@/stores/auth';

const auth =  useAuthStore();
</script>

<template>
  <header class="bg-white shadow-sm sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="shrink-0">
          <a href="/" class="text-2xl font-bold text-blue-600">
            JobFinder
          </a>
        </div>
        <nav class="hidden md:flex md:space-x-8">
          <a
            href="/"
            class="text-gray-500 hover:text-gray-700 font-medium px-3 py-2 text-sm"
          >
            Home
          </a>
          <a
            href="/careers"
            class="text-gray-500 hover:text-gray-700 font-medium px-3 py-2 text-sm"
          >
            Careers
          </a>
          <!-- <a
            href="#"
            class="text-gray-500 hover:text-gray-700 font-medium px-3 py-2 rounded-md text-sm"
          >
            About Us
          </a>
          <a
            href="#"
            class="text-gray-500 hover:text-gray-700 font-medium px-3 py-2 rounded-md text-sm"
          >
            Contact
          </a> -->
        </nav>
        <div class="flex items-center">
          <a
            href="#"
            v-if="auth.user === null"
            class="ml-8 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Sign In
          </a>
          <a
            href="#"
            v-else
            @click="auth.logout()"
            class="ml-8 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
          >
            Logout
          </a>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped></style>
