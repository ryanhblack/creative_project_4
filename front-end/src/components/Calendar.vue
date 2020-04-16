<template>
<div>
  <section class="calendar">
    <div class="event" v-for="event in events" v-bind:key="event._id">
      <router-link class="styled-link" :to="{ name: 'event', params: { id: event._id }}">
      <div :class="event.category">
        <p class="eventDate">{{ formatDate(event.dateTime) }}</p>
        <p class="eventTitle">{{ event.user.firstName }} {{ event.user.lastName }} - {{ event.title }}</p>
        <p class="eventCreated">Created {{ formatDate(event.created) }}</p>
      </div>
      </router-link>
    </div>
  </section>
</div>
</template>

<script>
import moment from 'moment';
export default {
  name: 'Calendar',
  props: {
    events: Array
  },
  methods: {
    formatDate(date) {
      return moment(date).format('LLLL');
    },
  }
}
</script>

<style scoped>
.event {
  display: flex;
  justify-content: space-between;
  font-size: 0.8em;
}

.event p {
  margin: 0px;
}

.event .eventDate {
  font-size: 1.8em;
  font-weight: 700;
  margin-bottom: 10px;
  text-decoration: underline;
}

.eventTitle {
  font-size: 1.2em;
  font-weight: 600;
}

.eventCreated {
  font-size: 0.7em;
  font-weight: normal;
}

p {
  margin: 0px;
}

/* Masonry */
*,
*:before,
*:after {
  box-sizing: inherit;
}

.calendar {
  column-gap: 1em;
}

.event {
  margin: 0 0 1.5em;
  display: inline-block;
  width: 100%;
}

/* Masonry on large screens */
@media only screen and (min-width: 1024px) {
  .image-gallery {
    column-count: 4;
  }
}

/* Masonry on medium-sized screens */
@media only screen and (max-width: 1023px) and (min-width: 768px) {
  .image-gallery {
    column-count: 3;
  }
}

/* Masonry on small screens */
@media only screen and (max-width: 767px) and (min-width: 540px) {
  .image-gallery {
    column-count: 2;
  }
}

/* color events by category */
.event div {
  background-color: #ccc;
  padding: 12px;
  border-radius: 18px;
  border: 3px solid #666;
  box-shadow: 0px 5px 8px 2px #666;
}

.event .past {
  background-color: #666;
  color: #fff;
  border: 3px solid #333;
}

.event .work {
  background-color: #fcc;
  border: 3px solid #f00;
}

.event .school {
  background-color: #eec;
  border: 3px solid #ff0;
}

.event .social {
  background-color: #abe;
  border: 3px solid #00f;
}

.event .family {
  background-color: #9e9;
  border: 3px solid #090;
}

.styled-link {
  text-decoration: none;
  color: inherit;
}
</style>