<template>
  <div>
    <b-button v-b-toggle.sidebar-backdrop>Toggle Sidebar</b-button>

    <b-sidebar
      id="sidebar-backdrop"
      title="Sidebar with backdrop"
      :backdrop-variant="dark"
      backdrop
      shadow
    >
      <div class="px-3 py-2">
        <div>
            <router-link to='/'>Home</router-link>
            <router-link to='/query'>Consulta</router-link>
        </div>
      </div>
    </b-sidebar>
  </div>
</template>
<script>
export default {};
</script>
<style lang="">
</style>