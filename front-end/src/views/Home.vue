<template>
  <div class="home">
    <h1>All Events</h1>
    <calendar :events="events" />
    <p v-if="error">{{error}}</p>
  </div>
</template>

<script>
import axios from 'axios';
import Calendar from '@/components/Calendar.vue';
export default {
  name: 'Home',
  components: {
    Calendar,
  },
  data() {
    return {
      events: [],
      error: '',
    }
  },
  created() {
    this.getEvents();
  },
  methods: {
    async getEvents() {
      try {
        let response = await axios.get("/api/events/all");
        this.events = response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
  }
}
</script>

<style scoped>
  h1 {
    color: #000;
    text-decoration: underline;
    margin-bottom: 30px;
  }
  
  .home {
    padding-top: 60px;
  }
</style>