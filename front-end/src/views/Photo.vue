<template>
<div>
  <div class="photo" v-if="photo._id">
    <p class="title">{{ photo.title }}</p>
    <p class="author">{{ photo.user.firstName }} {{ photo.user.lastName }}</p>
    <img :src="this.photo.path" />
    <p class="description">{{ photo.description }}</p>
    <p class="photoDate">{{ formatDate(photo.created) }}</p>
  </div>
  <div class="comments">
    <p class="error" v-if="error">{{ error }}</p>
    <form v-if="user" class="pure-form">
      <textarea placeholder="Comment on this Photo" v-model="comment"></textarea>
      <button type="submit" class="pure-button pure-button-primary" @click.prevent="addComment">Add Comment</button>
    </form>
    <div class="comment" v-for="comment in comments" v-bind:key="comment._id">
      <p class="commentText">{{ comment.comment }}</p>
      <p class="author">by {{ comment.user.firstName }} {{ comment.user.lastName }}</p>
      <p class="commentDate">{{ formatDate(comment.created) }}</p>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
export default {
  name: 'Photo',
  data () {
    return {
      photo: '',
      comment: '',
      error: '',
      comments: []
    }
  },
  async created() {
    try {
      let response = await axios.get('/api/users');
      this.$root.$data.user = response.data.user;
    } catch (error) {
      this.$root.$data.user = null;
    }
    this.getPhoto();
    this.getComments();
    this.error = '';
  },
  computed: {
    user() {
      return this.$root.$data.user;
    }
  },
  methods: {
    formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
    },
    async getPhoto() {
      try {
        this.response = await axios.get("/api/photos/" + this.$route.params.id);
        this.photo = this.response.data[0];
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    async addComment() {
      if (!this.comment)
        return;
      try {
        await axios.post('/api/comments/' + this.$route.params.id, {
          comment: this.comment,
          user: this.user._id,
        });
        this.getComments();
      } catch (error) {
        this.error = 'Unable to add Comment';
      }
      this.comment = '';
    },
    async getComments() {
      try {
        var response = await axios.get('/api/comments/' + this.$route.params.id);
        this.comments = response.data;
      } catch (error) {
        this.error = 'Unable to get comments';
      }
    },
  }
}
</script>

<style scoped>
  .photo {
    width: 100%;
    padding-top: 100px;
  }
  
  .photo img {
    width: 100%;
  }
  
  .photo .title {
    text-align: center;
    font-size: 120%;
    font-weight: 700;
  }
  
  .photo .author {
    text-align: center;
    font-size: 80%;
    color: #66;
  }
  
  .photo .description {
    width: 80%;
    float: left;
  }
  
  .photo .photoDate {
    text-align: right;
    width: 20%;
    float: right;
  }
  
  .comments .error {
    padding: 10px 15px;
    clear: both;
    background-color: #f00;
    color: #fff;
    font-weight: 700;
    border-radius: 8px;
    border: 1px solid #fff;
  }
  
  .comments form textarea {
    width: 100%;
    margin-bottom: 10px;
  }
  
  .comments form button {
    float: right;
    margin-bottom: 10px;
  }
  
  .comment .commentText {
    padding-top: 10px;
    margin-bottom: 0px;
    border-top: 1px solid #666;
    font-size: 120%;
    font-weight: 500;
    clear: both;
  }
  
  .comment .author {
    width: 50%;
    font-size: 80%;
    float: left;
  }
  
  .comment .commentDate {
    text-align: right;
    width: 50%;
    font-size: 80%;
    float: right;
  }
</style>