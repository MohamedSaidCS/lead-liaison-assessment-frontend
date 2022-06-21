<template>
  <div class="text-center mt-5" v-if="loading">Loading...</div>
  <template v-else>
    <div class="text-center mt-5" v-if="notFound">Todo not found.</div>
    <template v-else>
      <div class="mt-5 d-flex justify-content-between align-items-center">
        <h1>Todo #{{id}}</h1>
        <router-link to="/todos" class="btn btn-primary">Back</router-link>
      </div>
      <div class="card text-center">
        <div class="card-header">
          Todo #{{todo.id}} - Details
        </div>
        <div class="card-body">
          <h5 class="card-title">{{todo.title}}</h5>
          <p class="card-text">{{todo.description}}</p>
          <router-link :to="`/todos/${todo.id}/edit`" class="btn btn-primary">Edit</router-link>
        </div>
        <div class="card-footer text-muted">
          {{todo.completed ? 'Finished' : 'Unfinished'}}
        </div>
      </div>
    </template>
  </template>
</template>

<script setup>
import {ref} from "vue";
import {useRoute} from 'vue-router';
import axios from "axios";

const route = useRoute();
const id = ref(route.params.id);
const todo = ref({});
const loading = ref(false);
const notFound = ref(false);

const fetchTodo = async (id) => {
  loading.value = true
  try {
    const response = await axios.get(`${process.env.VUE_APP_BASE_URL}/api/todos/${id}`);
    todo.value = await response.data;
  } catch (e) {
    if(e.response.status === 404)
      notFound.value = true;
  }
  loading.value = false;
}

fetchTodo(id.value);


</script>

<style scoped>

</style>