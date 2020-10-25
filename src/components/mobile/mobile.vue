<template id="app" class="container">
  <div>
    <nav>
      <Nav />
      <h2>Biblioteca</h2>
    </nav>
    <input
      id="sidebar-search"
      type="text"
      placeholder="Search..."
      v-model="search"
    />
    <button @click='clear'>X</button>
    <b-list-group v-for="(livros, id) in filteredBooks" :key="id">
      <b-list-group-item>
        <b-card-title>{{ livros.titulo }}</b-card-title>
        <strong>Subtitulo: </strong>{{ livros.subtitulo }}<br />
        <strong>Autor: </strong>{{ livros.autor }}<br />
        <strong>Número de páginas: </strong>{{ livros.numpag }}<br />
        <strong>Tema: </strong>{{ livros.tema }}<br />
        <strong>Editora: </strong>{{ livros.editor }}<br />
      </b-list-group-item>
    </b-list-group>
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
      search: "",
      mensagens: [],
      list: [],
      id: 0,
      livros: {
        id: "",
        titulo: "",
        subtitulo: "",
        autor: "",
        editor: "",
        numpag: "",
        tema: "",
      },
    };
  },
  mounted() {
    this.$http.get("livros.json").then((res) => {
      this.list = res.data;
      // console.log(res.data)
    });
  },
  computed: {
    list() {
      this.$http.get("livros.json").then((res) => {
        this.list = res.data;
        // console.log(res.data)
      });
    },
    filteredBooks() {
      // if ()
      return this.list.filter((livros) => {
        return (
          livros.titulo.toLowerCase().match(this.search.toLowerCase()) ||
          livros.tema.toLowerCase().match(this.search.toLowerCase()) ||
          livros.autor.toLowerCase().match(this.search.toLowerCase())
        );
      });
    },
  },
  methods: {
      clear() {
          this.search = ''
      }
  }
};
</script>
<style lang="css" scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 1.5rem;
}

#app h1 {
  text-align: center;
  margin: 50px;
}
nav {
  margin: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 70px;
}
button{
    border-left: none;
    border: 1px solid #ccc;
    padding: 5px;
}
input{
    margin: 20px 0px 20px 20px;
    border-radius: 5px 0 0 5px;
    border: 1px solid #ccc;
    border-right: none;
    padding: 5px;
    outline: none;
}
</style>