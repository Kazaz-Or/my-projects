<template>
</template>

<script lang="ts">
export default {
  name: 'TodoList',
  inheritAttrs: false,
  customOptions: {}
}
</script>

<script setup lang="ts">
import {ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import axios from 'axios'

interface Todo {
    id?: number | string;
    title: string;
    completed: boolean;
}

const todos = ref([]);
onMounted(async () => {
    await loadTodos();
});

const loadTodos = async () => {
    const response = await axios.get('http://localhost:8000/todos');
    todos.value = response.data;
}

const createTodos = async () => {
    const response = await axios.post('http://localhost:8000/todos', {
        title: todo.title,
        completed: todo.completed
    });
    ElMessage({
        message: 'Todo Created',
        type: 'success'
    })

</script>