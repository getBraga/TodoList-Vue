<template>
  <div>
    <div class="btn-criar">
      <button v-if="loading" @click="criarFormulario">+</button>
    </div>
    <div v-if="loading" class="form-container">
      <form
        class="form"
        v-for="todo in todoList"
        :key="todo.id"
        :style="{background: todo.corFormulario}"
      >
        <div class="deletar">
          <button @click.prevent="deletar(todo.id)">X</button>
        </div>
        <select @click.prevent="mudarCorFormulario" :id="todo.id">
          <option
            v-for="todoCor in todoListCor"
            :key="todoCor.id"
            :value="todoCor.value"
          >{{todoCor.corNome }}</option>
        </select>
        <input type="text" placeholder="Titulo" v-model="todo.titulo" />
        <input type="number" placeholder="prioridade" value="prioridade" v-model="todo.prioridade" />
        <textarea placeholder="Descrição" v-model="todo.textarea"></textarea>
        <button class="button-enviar" :value="todo.id" @click.prevent="mudarFormulario">Enviar</button>
      </form>
    </div>
  </div>
</template>

<script>
import { api } from "@/services.js";
export default {
  name: "Formulario",
  data() {
    return {
      todoList: "",
      todoListCor: "",
      loading: true,
    };
  },
  methods: {
    async pegarFormulario() {
      const url = await api.get("todolist");
      this.todoList = await url.data;
    },
    async pegarCorDoFormulario() {
      const url = await api.get("coresTodoList");
      this.todoListCor = await url.data;
    },
    async criarFormulario() {
      this.loading = false;
      const url = await api.post("todolist", {
        id: 0,
        titulo: "",
        prioridade: "",
        textarea: "",
        corFormulario: "#37cc41",
      });

      this.todoList = await url.data;
      this.pegarFormulario();
      setTimeout(() => {
        this.loading = true;
      }, 100);
    },
    async mudarFormulario(id) {
      await api.put(`todolist/${id.currentTarget.value}`, {
        titulo: this.todoList[id.target.value - 1].titulo,
        prioridade: this.todoList[id.target.value - 1].prioridade,
        textarea: this.todoList[id.target.value - 1].textarea,
        corFormulario: id.path[1].style.background,
      });
    },
    async mudarCorFormulario(id) {
      const url = await api.get(`coresTodoList`);
      this.todoListCor = await url.data;
      id.path[1].style.background = id.target.value;
    },
    async deletar(id) {
      const confirmar = confirm("Deseja deletar?");
      if (confirmar) {
        api.delete(`todolist/${id}`).then(() => {
          this.pegarFormulario();
        });
      }
    },
  },

  created() {
    this.pegarFormulario();
    this.pegarCorDoFormulario();
  },
};
</script>

<style scoped >
.btn-criar {
  margin: 0 auto;
  text-align: center;
}
.btn-criar button {
  background: none;
  width: 50px;
  height: 50px;
  border: none;
  border: 1px solid #000;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  outline: none;
  cursor: pointer;
}
.btn-criar button:active {
  transform: scale(1.1);
}
.deletar {
  display: flex;
  justify-content: flex-end;
  position: relative;
  top: -20px;
  right: -20px;
}
.deletar button {
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #000;
  outline: none;
  border: 1px solid rgba(0, 0, 0, 0.3);
  color: #fff;
  cursor: pointer;
  z-index: 0;
}
.form-container {
  max-width: 960px;
  margin-top: 40px;
  border: 1px solid transparent;
  box-shadow: 3px 6px 9px rgba(0, 0, 0, 0.2);
  margin: 0 auto;
  display: flex;
  justify-content: initial;
  flex-wrap: wrap;
}
select {
  margin: 0 auto;
  text-align: center;
  display: flex;
  position: relative;
  top: 10px;
  outline: none;
}
.form-container form {
  display: block;
  max-width: 500px;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 20px;
  padding-left: 10px;
  padding-right: 10px;
  margin-left: 20px;
  margin-right: 20px;
}

.form-container form input,
.form-container form textarea {
  display: block;
  padding: 0.3rem;
  margin-top: 20px;
  width: 230px;
  outline: none;
}
textarea {
  height: 90px;
}
.button-enviar {
  background: none;
  border: none;
  color: white;
  margin-top: 5px;
  margin-bottom: 10px;
  border: 2px solid #fff;
  padding: 5px 10px;
  cursor: pointer;
  outline: none;
}
.button-enviar:active {
  transform: scale(1.1);
}
</style>
