<template>
  <div>
    <b-button v-b-toggle.sidebar-backdrop>Barra de Navegação</b-button>

    <b-sidebar
      id="sidebar-backdrop"
      title="Barra de Navegação"
      :backdrop-variant="dark"
      backdrop
      shadow
    >
      <div class="px-3 py-2">
        <div>
          <hr />
          <router-link to="/">Home</router-link>
          <br />
          <hr />
          <router-link to="/query">Consulta</router-link>
          <hr />
        </div>
      </div>
    </b-sidebar>
  </div>
</template>
<script>
export default {};
</script>
<style lang="css">
a {
  color: #555;
}
</style>