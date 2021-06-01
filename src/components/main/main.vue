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
    <b-card class="row">
    <h4>Há {{ list.length }} livros</h4>
      <b-row>
        <b-col cols="12" sm="6">
          <b-form-group label="Título:">
            <b-form-input
              type="text"
              size="lg"
              v-model="livros.title"
              placeholder="Informe o titulo"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="12" sm="6">
          <b-form-group label="Subtítulo:">
            <b-form-input
              type="text"
              size="lg"
              v-model="livros.subtitle"
              placeholder="Informe o subTitulo"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12" sm="6">
          <b-form-group label="Autor:">
            <b-form-input
              type="text"
              size="lg"
              v-model="livros.author"
              placeholder="Informe o autor"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="12" sm="6">
          <b-form-group label="Editora:">
            <b-form-input
              type="text"
              size="lg"
              v-model="livros.publisher"
              placeholder="Informe a editora"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12" sm="6">
          <b-form-group label="Número de páginas:">
            <b-form-input
              type="text"
              size="lg"
              v-model="livros.pages"
              placeholder="Informe o número de páginas"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="12" sm="6">
          <b-form-group label="Tema:">
            <b-form-input
              type="text"
              size="lg"
              v-model="livros.genre"
              placeholder="Informe o tema"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <hr />
      <b-row align-h="end" class="flex-row">
        <b-col
          ><b-button @click="salvar" size="lg" variant="primary"
            >Salvar</b-button
          ></b-col
        >
        <b-col
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
            <th>Tema</th>
            <th>Editora</th>
            <th>AÇÕES</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(livros, id) in list" :key="id">
            <td>{{ livros.title }}</td>
            <td>{{ livros.subtitle }}</td>
            <td>{{ livros.author }}</td>
            <td>{{ livros.pages }}</td>
            <td>{{ livros.genre }}</td>
            <td>{{ livros.publisher }}</td>
            <td>
              <button
                type="button"
                class="btn btn-warning"
                @click="carregar(livros.id)"
              >
                <strong>Editar</strong>
              </button>
            </td>
            <td>
              <button class="btn btn-danger" @click="excluir(livros.id)">
                Excluir
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
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
        case: "",
      },
    };
  },
  mounted() {
    this.$http.get("books").then((res) => {
      this.list = res.data;
      console.log(res.data)
    });
  },
  methods: {
    limpar() {
      this.livros.author = "";
      this.livros.publisher = "";
      this.livros.id = "";
      this.livros.pages = "";
      this.livros.genre = "";
      this.livros.title = "";
      this.livros.subtitle = "";
      this.id = null;
    },
    carregar(id) {
      this.id = id;
      this.livros = { ...this.list[id] };
    },
    cancel() {
      this.livros = [];
    },
    show(){
      this.$http.get("books").then((res) => {
        this.list = res.data;
        console.log(res.data);
      });
    },
    excluir(id) {
      this.$http.delete(`/books/${id}`).then((_) =>{
         this.limpar()
         this.show()
      }).catch((err) => {
          console.log(err)
          this.limpar();
          this.mensagens.push({
            texto: "Problema para excluir!",
            tipo: "danger",
          });
        });
    },
    salvar() {
      const metodo = this.livros.id ? "patch" : "post";
      const finalUrl = this.livros.id ? `/${this.livros.id}` : "";
      this.$http[metodo](`/books${finalUrl}`, this.livros)
        // eslint-disable-next-line
        .then((_) => {
          this.show()
          this.limpar();
          this.mensagens.push({
            texto: "Operação realizada com sucesso!",
            tipo: "success",
          });
        });
    },

  },
  beforeEnter: (to, from, next) => {

  }

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
