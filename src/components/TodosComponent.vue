<template>
  <div class="mt-5 d-flex justify-content-between align-items-center">
    <h1>All Todos</h1>
    <router-link to="/todos/create" class="btn btn-primary">Create</router-link>
  </div>
  <table class="table text-center border">
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
        <button class="btn btn-success ms-1" :disabled="todo.completed">Mark Done</button>
        <router-link :to="`/todos/${todo.id}`" class="btn btn-primary ms-1">Details</router-link>
        <router-link :to="`/todos/${todo.id}/edit`" class="btn btn-dark ms-1">Edit</router-link>
        <button class="btn btn-danger ms-1">Delete</button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script setup>
import {ref} from "vue";
import axios from 'axios';

const todos = ref([]);

const fetchTodos = async () => {
  const response = await axios.get('http://127.0.0.1:8000/api/todos');
  todos.value = await response.data;
}

fetchTodos();

</script>

<style scoped>

</style>