// src/stores/auth.js
import { defineStore } from "pinia";
import axios from "@/axios"; // axios.js file
import { useRouter } from "vue-router";
const router = useRouter();

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    loading: false,
  }),
  actions: {
    async fetchUser() {
      try {
        const { data } = await axios.get("/api/user");
        this.user = data;
      } catch {
        this.user = null;
      }
    },
    async logout() {
      await axios.post("/api/logout");
      this.user = null;
      return true;
    },
  },
});
