<template>
  <div class="mt-5">
    <div class="mt-5 d-flex justify-content-between align-items-center">
      <h1>Create Todo</h1>
      <router-link to="/todos" class="btn btn-primary">Back</router-link>
    </div>
    <form class="mt-1" @submit.prevent="createTodo">
      <div class="mb-3">
        <label for="title" class="form-label">Title</label>
        <input type="text" class="form-control" id="title" v-model="data.title" required>
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea class="form-control" id="description" rows="3" v-model="data.description" required></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Create</button>
    </form>
    <div class="mt-3">
      <p class="alert alert-success" v-if="success">{{success}}</p>
      <p style="white-space: pre-wrap" class="alert alert-danger" v-if="error">{{error}}</p>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import axios from "axios";

const data = ref({
  title: '',
  description: '',
});
const success = ref('');
const error = ref('');

const createTodo = async () => {
  success.value = '';
  error.value = '';
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/todos', data.value);
    const result = response.status;
    if(result === 201)
      success.value = 'Todo Created successfully!';
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

</script>

<style scoped>

</style>