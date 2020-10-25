<template>
  <div id="app" class="container">
    <h1>Biblioteca com Vue</h1>
    <h4>Há {{ this.list.length }} livros</h4>
    <b-alert
      show
      dismissible
      v-for="mensagem in mensagens"
      :key="mensagem.texto"
      :variant="mensagem.tipo"
      >{{ mensagem.texto }}</b-alert
    >
	<Nav/>
    <b-card class="row">
      <b-row>
        <b-col cols="12" sm="12">
          <b-form-group label="Título:">
            <b-form-input
              type="text"
              size="lg"
              v-model="search"
              placeholder="Pesquise aqui"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <hr />
      <b-row  align-h="end">
        <b-col md="2"
          ><b-button @click="salvar" size="lg" variant="primary"
            >Salvar</b-button
          ></b-col
        >
        <b-col md="2"
          ><b-button @click="cancel" size="lg" variant="danger"
            >Cancelar</b-button
          ></b-col
        >
      </b-row>
    </b-card>
    <hr />

    <div>
      <table class="table">
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Subtitulo</th>
            <th>Autor</th>
            <th>Nº Páginas</th>
            <th>AÇÕES</th>
          </tr>
        </thead>
        <tbody v-if="filteredBooks.length > 0">
          <tr  v-for="(livros, id) in filteredBooks" :key="id">
            <td>{{ livros.titulo }}</td>
            <td>{{ livros.subtitulo }}</td>
            <td>{{ livros.autor }}</td>
            <td>{{ livros.numpag }}</td>
            <td>{{ livros.tema }}</td>
            <td>{{ livros.editor }}</td>
            <td>
              <button
                type="button"
                class="btn btn-warning"
                @click="carregar(id)"
              >
                <strong>Editar</strong>
              </button>
            </td>
            <td>
              <button class="btn btn-danger" @click="excluir(id)">
                Excluir
              </button>
            </td>
          </tr>
        </tbody>
        <div v-else>Não há resultados sobre o que você está pesquisando</div>
      </table>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/nav.vue'
export default {
	/* eslint-disable */
	components: {
		Nav
	},
  data() {
	  return {
      search: '',
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
      filteredBooks() {
          return this.list.filter( livros => livros.titulo.toLowerCase().includes(this.search.toLowerCase()) ||
          livros.subtitulo.toLowerCase().includes(this.search.toLowerCase()) ||
          livros.autor.includes(this.search.toLowerCase()) ||
          livros.editor.includes(this.search.toLowerCase()) ||
           livros.numpag.includes(this.search.toLowerCase()) ||
           livros.tema.includes(this.search.toLowerCase()))
      }
  },

};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 1.2rem;
}

#app h1 {
  text-align: center;
  margin: 50px;
}
</style>
