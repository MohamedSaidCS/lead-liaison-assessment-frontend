<template>
  <div class="text-center mt-5" v-if="loading">Loading...</div>
  <template v-else>
    <div class="mt-5 d-flex justify-content-between align-items-center">
      <h1>All Todos</h1>
      <router-link to="/todos/create" class="btn btn-primary">Create</router-link>
    </div>
    <table class="table text-center border" v-if="todos.length > 0">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Title</th>
        <th scope="col">Status</th>
        <th scope="col"></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="todo in todos" :key="todo.id" :class="todo.completed ? 'table-success' : 'table-light'">
        <th scope="row">{{todo.id}}</th>
        <td>{{todo.title}}</td>
        <td>{{todo.completed ? 'Finished' : 'Unfinished'}}</td>
        <td class="d-flex justify-content-end">
          <button class="btn btn-success ms-1" :disabled="todo.completed" @click="finishTodo(todo.id)">Mark Done</button>
          <router-link :to="`/todos/${todo.id}`" class="btn btn-primary ms-1">Details</router-link>
          <router-link :to="`/todos/${todo.id}/edit`" class="btn btn-dark ms-1">Edit</router-link>
          <button class="btn btn-danger ms-1" @click="deleteTodo(todo.id)">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>
    <div class="text-center mt-5" v-else>No Todos found.</div>
  </template>
</template>

<script setup>
import {ref} from "vue";
import axios from 'axios';

const todos = ref([]);
const loading = ref(false);

const fetchTodos = async () => {
  loading.value = true;
  const response = await axios.get(`${process.env.VUE_APP_BASE_URL}/api/todos`);
  todos.value = await response.data;
  loading.value = false;
}

const finishTodo = async (id) => {
  await axios.patch(`${process.env.VUE_APP_BASE_URL}/api/todos/${id}`);
  const index = todos.value.findIndex(todo => todo.id === id);
  todos.value[index].completed = true;
}

const deleteTodo = async (id) => {
  await axios.delete(`${process.env.VUE_APP_BASE_URL}/api/todos/${id}`);
  const index = todos.value.findIndex(todo => todo.id === id);
  todos.value.splice(index, 1);
}

fetchTodos();

</script>

<style scoped>

</style>