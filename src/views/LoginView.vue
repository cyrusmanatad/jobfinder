<script setup>
import axios from "@/axios"; // axios.js file
import { useAuthStore } from "@/stores/auth";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'


const credentials = reactive({
  authMessage: "",
  email: {
    value: "",
    valid: true,
  },
  password: {
    value: "",
    valid: true,
  },
});

const router = useRouter();

const authenticating = ref(false);

const handleLogin = async () => {
  const auth = useAuthStore();

  authenticating.value = !authenticating.value;

  try {
    await axios.get("/sanctum/csrf-cookie");

    await axios.post("/api/login", {
      email: credentials.email.value,
      password: credentials.password.value,
    });

    const { data: user } = await axios.get("/api/user");
    auth.user = user;

    router.push({ name: "home" });
  } catch (error) {
    credentials.authMessage = error.response.data.message;

    credentials.email.valid = false;
    credentials.password.valid = false;
  } finally {
    authenticating.value = !authenticating.value;
  }
};
</script>

<template>
  <div
    class="flex h-[850px] flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Sign in to your account
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Or
        <a
          href="#/register"
          class="font-medium text-blue-600 hover:text-blue-500"
        >
          create a new account
        </a>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" v-on:submit.prevent="handleLogin">
          <div>
            <label
              htmlFor="email"
              class="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <div class="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                v-model="credentials.email.value"
                required
                class="block w-full appearance-none rounded-md border px-3 py-2 placeholder-gray-400 shadow-sm focus:outline-none sm:text-sm"
                :class="[
                  credentials.email.valid
                    ? 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                    : 'border-2 border-red-400',
                ]"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              class="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div class="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                v-model="credentials.password.value"
                required
                class="block w-full appearance-none rounded-md border px-3 py-2 placeholder-gray-400 shadow-sm focus:outline-none sm:text-sm"
                :class="[
                  credentials.email.valid
                    ? 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                    : 'border-2 border-red-400',
                ]"
              />
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor="remember-me"
                class="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div class="text-sm">
              <a href="#" class="font-medium text-blue-600 hover:text-blue-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <label
            htmlFor="email"
            v-show="
              credentials.email.valid === false ||
              credentials.password.valid === false
            "
            class="block text-sm font-medium text-red-700"
          >
            {{ credentials.authMessage }}
          </label>

          <div>
            <button
              type="submit"
              :disabled="authenticating"
              class="flex w-full cursor-pointer justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-default disabled:bg-gray-400"
            >
              {{authenticating ? "Please wait" : "Sign In"}}
              <PulseLoader v-show="authenticating" class="ml-2" size="8px" color="white" />
              <!-- <i
                v-show="authenticating"
                class="pi pi-spinner animate-spin"
              ></i> -->
            </button>
          </div>
        </form>

        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300" />
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="bg-white px-2 text-gray-500">Or continue with</span>
            </div>
          </div>

          <div class="mt-6">
            <button
              type="button"
              class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
            >
              <span class="sr-only">Sign in with Google</span>
              <svg
                class="h-5 w-5"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                />
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                />
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C42.022,35.245,44,30.038,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                />
              </svg>
              <span class="ml-2">Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
