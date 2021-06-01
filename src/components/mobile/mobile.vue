<template id="app" class="container">
  <div>
    <nav>
      <Nav />
      <h2>Biblioteca</h2>
    </nav>
    <template class='hero'>            
    <div class='wrapper'>
      <b-input-group class="mb-1">
        <template #append>
          <b-input-group-text><strong class="text" @click='clear'>x</strong></b-input-group-text>
        </template>
        <b-form-input placeholder="Search..." v-model="search"></b-form-input>
      </b-input-group>
    <b-input-group>

    <b-select v-model="sortBy" class="mb-1">
            <option value="id">Ordenar por id</option>
            <option value="title">Ordenar por título</option>
            <option value="subtitle">Ordenar por subtítulo</option>
            <option value="author">Ordenar por autor</option>
            <option value="genre">Ordenar por tema</option>
            <option value="publisher">Ordenar por editora</option>
            <option value="pages">Ordenar por página</option>
        </b-select>
        <template #append>
        
            
          
    <b-select v-model="sortDirection" class="mb-1">
            <option value="asc">asc</option>
            <option value="desc">desc</option>
        </b-select>
        </template>
    </b-input-group>
    <b-select v-model="search" class="mb-1">
        <option value="">Temas</option>
        <option v-for='(genre, id) in bookGenres' :key='id' :value="genre">{{genre}}</option>
    </b-select>
    </div>
    <h5>Total: {{ filteredBooks.length }} livros</h5>
    </template>
    <b-table v-if="windowSize > 760" striped hover :items="sortedBooks" :fields="fields"></b-table>
    <template v-else>
    <b-list-group v-for="(livros, id) in sortedBooks" :key="id">
      <b-list-group-item>
        <b-card-title>{{ livros.title }}</b-card-title>
        <strong>Subtítulo: </strong>{{ livros.subtitle }}<br />
        <strong>Autor: </strong>{{ livros.author }}<br />
        <strong>Número de páginas: </strong>{{ livros.pages }}<br />
        <strong>Tema: </strong>{{ livros.genre }}<br />
        <strong>Editora: </strong>{{ livros.publisher }}<br />
      </b-list-group-item>
    </b-list-group>
    </template>
  </div>
</template>
<script>
import Nav from "@/components/nav.vue"
export default {
  /* eslint-disable */
  components: {
    Nav,
  },
  data() {
    return {
      sortBy: "id",
      sortDirection: "asc",
      windowSize: window.innerWidth,
      search: "",
      selectSearch: "",
      mensagens: [],
      list: [],
      fields: ["title", "subtitle", "author", "publisher", "pages", "genre"],
      fields: [
          {
            key: 'title',
            sortable: true
          },
          {
            key: 'subtitle',
            sortable: true
          },
          {
            key: 'author',
            sortable: true
          },
          {
            key: 'publisher',
            sortable: true
          },
          {
            key: 'pages',
            sortable: true
          },
          {
            key: 'genre',
            sortable: true
          },
        ],
      livros: {
        id: "",
        title: "",
        subtitle: "",
        author: "",
        publisher: "",
        pages: "",
        genre: "",
      },
    }
  },
  mounted() {
    this.$http.get("books").then((res) => {
      this.list = res.data
    })
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })
  },
  computed: {
    array() {
      this.$http.get("books").then((res) => {
        this.list = res.data
      })
    },
    noDuplicatesList() {
      for (element in this.list)
        for (item in element) {
          return [...new Set()]
        }
    },
    filteredBooks() {
      return this.list.filter((livros) => {
        return (
          livros.title.toLowerCase().match(this.search.toLowerCase()) ||
          livros.genre.toLowerCase().match(this.search.toLowerCase()) ||
          livros.author.toLowerCase().match(this.search.toLowerCase())
        )
      })
    },
    sortedBooks() {
      return this.filteredBooks.sort((p1, p2) => {
        let modifier = 1
        if (this.sortDirection === "desc") modifier = -1
        if (p1[this.sortBy] < p2[this.sortBy]) return -1 * modifier
        if (p1[this.sortBy] > p2[this.sortBy]) return 1 * modifier
        return 0
      })
    },
    bookGenres() {
      return [...new Set(this.list.map(({ genre }) => genre))]
    },
  },
  methods: {
    clear() {
      this.search = ""
    },
    sort(s) {
      if (s === this.sortBy) {
        this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc"
      }
      this.sortBy = s
    },
    onResize() {
      this.windowSize = window.innerWidth
    }
  },
}
</script>
<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 1.5rem;
  margin: 0 auto;
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
button {
  border-left: none;
  border: 1px solid #ccc;
  padding: 5px;
  padding-right: 8px;
  padding-left: 8px;
  border-radius: 0px 5px 5px 0px;
}
/* input {
  margin: 20px 0px 20px 20px;
  border-radius: 5px 0 0 5px;
  border: 1px solid #ccc;
  border-right: none;
  padding: 5px;
  outline: none;
} */
h5 {
  color: #2c3e50;
  margin: 0 0 10px 20px;
}
.hero {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 70px;
}
.wrapper {
  margin: 5px 10px;
}
</style>
