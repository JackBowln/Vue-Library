<template>
  <div id="app" class="container">
    <br />
    <nav>
      <Nav />
      <h2>Biblioteca</h2>
    </nav>
    <b-alert
      show
      dismissible
      v-for="mensagem in mensagens"
      :key="mensagem.texto"
      :variant="mensagem.tipo"
      >{{ mensagem.texto }}</b-alert
    >
    <h4>Há {{ this.list.length }} livros</h4>
    <hr />
    <vue-good-table
      :columns="columns"
      :rows="list"
      :search-options="{
        enabled: true,
      }"
      :pagination-options="{
        enabled: true,
        mode: 'records',
        perPage: 100,
        position: 'top',
        perPageDropdown: [10, 20, 30, 40, 50, 60, 80, 100, 200],
        setCurrentPage: 1,
        nextLabel: 'next',
        prevLabel: 'prev',
        rowsPerPageLabel: 'Colunas por página',
        ofLabel: 'of',
        pageLabel: 'page', // for 'pages' mode
        allLabel: 'All',
      }"
    >
    </vue-good-table>
  </div>
</template>

<script>
import Nav from "@/components/nav.vue";
export default {
  /* eslint-disable */
  components: {
    Nav,
  },
  data() {
    return {
      columns: [
        {
          label: "Título",
          field: "title",
        },
        {
          label: "Sub-Título",
          field: "subtitle",
        },
        {
          label: "Autor",
          field: "author",
        },
        {
          label: "Editora",
          field: "publisher",
        },
        {
          label: "Nº páginas",
          field: "pages",
          type: "number",
        },
        {
          label: "Tema",
          field: "genre",
        },
      ],
      search: "",
      mensagens: [],
      list: [],
      id: 0,
      livros: {
        id: "",
        title: "",
        subtitle: "",
        author: "",
        publisher: "",
        pages: "",
        genre: "",
      },
    };
  },
  mounted() {
    this.$http.get("books").then((res) => {
      this.list = res.data;
      // console.log(res.data)
    });
  },
  computed: {
    list() {
      this.$http.get("books").then((res) => {
        this.list = res.data;
        // console.log(res.data)
      });
    },
    filteredBooks() {
      return this.list.filter(
        (livros) =>
          livros.title.toLowerCase().includes(this.search.toLowerCase()) ||
          livros.author.toLowerCase().includes(this.search.toLowerCase())  ||
          livros.genre.toLowerCase().includes(this.search.toLowerCase()) 
      );
    },
  },
};
</script>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 1.2rem;
  margin: 0 auto;
}
nav {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 70px;
}
h1 {
  text-align: center;
}
#app h1 {
  text-align: center;
  margin: 50px;
}
</style>
