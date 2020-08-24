<template>
  <div id="app">
    <h1>TodoList</h1>
    <Formulario />
  </div>
</template>

<script>
import Formulario from "@/components/Formulario.vue";
export default {
  name: "App",
  components: {
    Formulario,
  },
};
</script>

<style>
body,
h1,
p,
form,
input,
button,
div {
  padding: 0px;
  margin: 0px;
}
* {
  box-sizing: border-box;
}
h1 {
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
  font-size: 2.5rem;
  margin-top: 40px;
  margin-bottom: 40px;
}
</style>
