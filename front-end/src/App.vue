<template>
  <div id="app">
    <header id="header">
      <h1>Event Scheduler</h1>
      <nav>
        <router-link to="/"><i class="fas fa-home"></i>Home</router-link>
        <router-link to="/dashboard"><i class="fas fa-user"></i>My Events</router-link>
      </nav>
    </header>
    <router-view id="content" />
    <div id="footer">
      <p>Link to the private repository for this project can be found at <a href="https://github.com/ryanhblack/creative_project_4">https://github.com/ryanhblack/creative_project_4</a></p>
    </div>
  </div>
</template>

<style>
body {
  font-family: 'Work Sans', sans-serif;
  font-weight: 300;
  font-size: 13pt;
  margin: 0px 10%;
}

#header {
  padding: 10px 40px;
  height: 38px;
  width: 100%;
  /* Fixed position */
  position: fixed;
  z-index: 10000;
  left: 50%;
  transform: translate(-50%, 0);
  background: #00f;
  text-align: center;
  box-shadow: 0 0 0 1em #FFF;
}

nav {
  display: box;
  float: right;
  max-width: 70%;
  padding: 5px 20px;
}

nav a {
  font-weight: 500;
  color: #fff;
  text-decoration: none;
}

h1 {
  color: #fff;
  font-size: 28px;
  float: left;
  max-width: 30%;
  margin: 0px;
  padding-left: 20px;
}

h2 {
  font-size: 12px;
}

#header .fas {
  font-size: 25px;
  color: #fff;
  width: 50px;
}

#content {
  padding-top: 78px;
}

.pure-button-primary {
  background-color: #277E8E;
}

#footer {
  margin-top: 20px;
  padding: 10px;
  clear: both;
}

#footer p {
  width: 50%;
  margin: 0px 25%;
  text-align: center;
}
</style>