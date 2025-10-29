// src/stores/auth.js
import { defineStore } from "pinia";
import axios from "@/axios"; // axios.js file

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    loading: false,
    status: null,
  }),
  actions: {
    async fetchUser() {
      try {
        const { data, status } = await axios.get("/api/user");
        this.user = data;
        this.status = status
      } catch(error) {
        this.status = error.response.status
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
