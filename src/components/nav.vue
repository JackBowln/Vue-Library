<template id="app">
  <div>
    <a v-b-toggle.sidebar-no-header @click="toggleClass()">
      <div
        id="burger-container"
        v-bind:class="[isActive ? 'on' : 'open off']"
        
      >
        <div id="burger">
          <span> &nbsp;</span>
          <span> &nbsp;</span>
          <span> &nbsp;</span>
          <span> &nbsp;</span>
        </div>
      </div>
    </a>
    <b-sidebar
      id="sidebar-no-header"
      aria-labelledby="sidebar-no-header-title"
      no-header
      shadow
    >
      <template #default="{ hide }">
        <a v-b-toggle.sidebar-no-header @click="toggleClass()">
          <div
            id="burger-container"
            v-bind:class="[isActive ? 'closed' : 'closed open']"
          >
            <div id="burger">
              <span> &nbsp;</span>
              <span> &nbsp;</span>
              <span> &nbsp;</span>
              <span> &nbsp;</span>
            </div>
          </div>
        </a>
        <div class="px-3 py-2">
          <hr />
          <router-link to="/">
            <div class="button">
              Home
              <br />
            </div>
          </router-link>
          <hr />
          <router-link to="/query">
            <div class="button">Consulta</div>
          </router-link>
          <hr />
          <router-link to="/mobile">
            <div class="button">Mobile</div>
          </router-link>
          <hr />
        </div>
      </template>
    </b-sidebar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isActive: true,
    };
  },
  methods: {
    toggleClass() {
      this.isActive = !this.isActive;
    },
  },
};
</script>
<style lang="css">
#app{
  margin: 10px;
}
a {
  color: #555;
  outline: none;
  text-decoration: none;
  transition: 200ms;
  width: auto;
  height: 20px;
}
a:hover {
  text-decoration: none;
  color: rgba(85, 85, 85, 0.699);
  /* opacity: 0.8; */
}

#burger-container {
  position: relative;
  margin: 5px 10px;
  width: 20px;
}

#burger {
  cursor: pointer;
  display: block;
}

#burger span {
  background: #2194ff;
  display: block;
  width: 35px;
  height: 5px;
  margin-bottom: 5px;
  position: relative;
  top: 0;
  transition: all ease-in-out 0.2s;
}

#burger-container.open span:nth-child(2),
#burger-container.open span:nth-child(3) {
  width: 0;
  opacity: 0;
}

#burger-container.open span:nth-child(1) {
  transform: rotate(-45deg);
  top: 14px;
}

#burger-container.open span:nth-child(4) {
  transform: rotate(45deg);
  top: -16px;
}
.on span{
  opacity: 1;
  transition: all ease-in-out 0.8s;
}
.off span{
  opacity: 0;
  /* position: relative;
  margin-left: 1000px; */
}
.closed {
  padding-top: 20px;
}
</style>
