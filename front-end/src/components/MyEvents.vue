<template>
<div class="main">
  <div class="menu">
    <p><b>My Events</b> <a class="add-event" @click="toggleEventAdder"><i class="far fa-calendar-plus"></i> Add Event</a></p>
    <h2>{{user.firstName}} {{user.lastName}} <a class="logout" @click="logout"><i class="fas fa-sign-out-alt"></i> Logout</a></h2>
    <eventAdder :show="show" @close="close" @eventAddFinished="eventAddFinished" />
  </div>
  <calendar :events="events" />
  <p v-if="error">{{error}}</p>
</div>
</template>

<script>
import axios from 'axios';
import EventAdder from '@/components/EventAdder.vue';
import Calendar from '@/components/Calendar.vue';
export default {
  name: 'MyEvents',
  components: {
    EventAdder,
    Calendar
  },
  data() {
    return {
      show: false,
      events: [],
      error: '',
    }
  },
  computed: {
    user() {
      return this.$root.$data.user;
    },
  },
  created() {
    this.getEvents();
  },
  methods: {
    async logout() {
      try {
        await axios.delete("/api/users");
        this.$root.$data.user = null;
      } catch (error) {
        this.$root.$data.user = null;
      }
    },
    async getEvents() {
      try {
        this.response = await axios.get("/api/events");
        this.events = this.response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    close() {
      this.show = false;
    },
    toggleEventAdder() {
      this.show = true;
    },
    async eventAddFinished() {
      this.show = false;
      this.getEvents();
    },
  }
}
</script>

<style scoped>
.menu {
  display: flex;
  justify-content: space-between;
}

.menu h2 {
  font-size: 14px;
}

.add-event {
  margin-left: 20px;
  cursor: pointer;
}

.logout {
  margin-left: 10px;
  cursor: pointer;
}
</style>