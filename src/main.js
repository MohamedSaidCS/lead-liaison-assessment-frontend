import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        path: '/',
        component: () => import('./components/HomeComponent'),
    },
    {
        path: '/todos',
        component: () => import('./components/TodosComponent'),
    },
    {
        path: '/todos/:id',
        component: () =>  import('./components/TodoComponent'),
    },
    {
        path: '/todos/create',
        component: () => import('./components/CreateTodoComponent'),
    },
    {
        path: '/todos/:id/edit',
        component: () => import('./components/EditTodoComponent'),
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

createApp(App).use(router).mount('#app')
