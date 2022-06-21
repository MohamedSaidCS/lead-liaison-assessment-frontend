<template>
  <div class="text-center mt-5" v-if="loading">Loading...</div>
  <template v-else>
    <div class="mt-5 d-flex justify-content-between align-items-center">
      <h1>Edit Todo #{{id}}</h1>
      <router-link to="/todos" class="btn btn-primary">Back</router-link>
    </div>
    <form class="mt-1" @submit.prevent="editTodo">
      <div class="mb-3">
        <label for="title" class="form-label">Title</label>
        <input type="text" class="form-control" id="title" v-model="todo.title" required>
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea class="form-control" id="description" rows="3" v-model="todo.description" required></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Save</button>
    </form>
    <div class="mt-3">
      <p class="alert alert-success" v-if="success">{{success}}</p>
      <p style="white-space: pre-wrap" class="alert alert-danger" v-if="error">{{error}}</p>
    </div>
  </template>
</template>

<script setup>
import {useRoute} from "vue-router";
import {ref} from "vue";
import axios from "axios";

const route = useRoute();
const id = ref(route.params.id);
const todo = ref({});
const loading = ref(false);
const success = ref('');
const error = ref('');

const fetchTodo = async (id) => {
  loading.value = true
  const response = await axios.get(`http://127.0.0.1:8000/api/todos/${id}`);
  todo.value = await response.data;
  loading.value = false;
}

const editTodo = async () => {
  success.value = '';
  error.value = '';
  try {
    const response = await axios.put(`http://127.0.0.1:8000/api/todos/${id.value}`, todo.value);
    const result = response.status
    if(result === 200)
      success.value = 'Todo Edited Successfully!';
  } catch (e) {
    if(e.response.data.errors) {
      let errors = '';
      for (const err in e.response.data.errors) {
        errors += `${err}: `;
        errors += e.response.data.errors[err].join(', ') + '\n';
      }
      error.value = errors;
    }
  }
}

fetchTodo(id.value);
</script>

<style scoped>

</style>