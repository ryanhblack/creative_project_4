<template>
<div>
  <div class="event" v-if="event._id">
    <p class="title">{{ event.title }}</p>
    <p class="author">{{ event.user.firstName }} {{ event.user.lastName }}</p>
    <img :src="this.event.path" />
    <p class="description">{{ event.description }}</p>
    <p class="date">{{ formatDate(event.dateTime) }}</p>
  </div>
</div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
export default {
  name: 'Event',
  data () {
    return {
      event: '',
      error: '',
    }
  },
  async created() {
    try {
      let response = await axios.get('/api/users');
      this.$root.$data.user = response.data.user;
    } catch (error) {
      this.$root.$data.user = null;
    }
    this.getEvent();
    this.error = '';
  },
  computed: {
    user() {
      return this.$root.$data.user;
    }
  },
  methods: {
    formatDate(date) {
      return moment(date).format('LLLL');
    },
    async getEvent() {
      try {
        this.response = await axios.get("/api/events/" + this.$route.params.id);
        this.photo = this.response.data[0];
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
  }
}
</script>

<style scoped>
  .event {
    width: 100%;
    padding-top: 100px;
  }
  
  .event .title {
    text-align: center;
    font-size: 120%;
    font-weight: 700;
  }
  
  .event .author {
    text-align: center;
    font-size: 80%;
    color: #66;
  }
  
  .event .description {
    width: 80%;
    float: left;
  }
  
  .event .date {
    text-align: right;
    width: 20%;
    float: right;
  }
</style>