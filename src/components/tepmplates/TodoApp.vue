<script setup lang="ts">

interface Todo {
  id: string
  title: string
  completed: boolean
}

type FilterType = 'all' | 'completed' | 'progress'

import { ref, computed } from "vue";

const todo_list = ref<Todo[]>([])
const todoErrMsg = ref<string | null>(null)
const newTodoTitle = ref()
const filterType = ref<FilterType>('all')
let interval: number | undefined;

const addNewTodo = () => {

  clearTimeout(interval)

  if (newTodoTitle.value && !newTodoTitle.value.value.trim().length) {
    todoErrMsg.value = 'Please enter the new todo title buddy.'
    interval = setTimeout(() => {
      todoErrMsg.value = null
    }, 1500);
    return
  }

  todo_list.value.push(
    {
      id: todo_list.value.length.toString(),
      title: newTodoTitle.value.value,
      completed: false
    }
  )

  newTodoTitle.value.focus()
  newTodoTitle.value.value = ''

}

const filteredTodos = computed(() => {

  const filtered = [...todo_list.value].filter(todo => {

    if (
      (filterType.value === 'all')
      ||
      (filterType.value === 'completed' && todo.completed)
      ||
      (filterType.value === 'progress' && !todo.completed)
    ) return true

  })

  return filtered as Todo[];

})

</script>

<template>
  <section
    class="flex items-center w-full justify-center px-6 py-28 bg-gradient-to-r from-blue-500 to-purple-600 relative">
    <div
      :class='["bg-red-400 text-center text-xl py-3 m-auto rounded-xl transition-all w-[80%] duration-200 absolute my-2 text-white", !todoErrMsg && "opacity-0 hidden"]'>
      {{ todoErrMsg }}
    </div>
    <div class="max-w-[700px] w-full">
      <h1 class="todo_topic text-center text-2xl pb-8 text-white">Pro Todo List</h1>
      <div class="flex align-center justify-center gap-2 ch:h-12 ch:rounded-sm">
        <form @submit.prevent="addNewTodo" class="flex items-center justify-between basis-2/3 rouned-sm bg-white">
          <input ref="newTodoTitle" type="text" placeholder="Add Todo"
            class="outline-none py-2 basis-[82%] text-xl px-px ml-2 placeholder:text-black text-black bg-transparent">
          <svg @click="addNewTodo" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512"
            class="size-full basis-[12%] transition-colors duration-200  text-purple-950 px-2 hover:bg-purple-700"
            height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <title>add Todo</title>
            <path
              d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-32 252c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92H92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z">
            </path>
          </svg>
        </form><select @change="e => filterType = ((e.target as HTMLSelectElement).value as FilterType)"
          class="flex outline-none items-center justify-between basis-1/3 px-2 rounded-sm bg-white">
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="progress">In progress</option>
        </select>
      </div>
      <div v-if="filteredTodos.length">
        <div v-for="(todo, index) of filteredTodos" :key="index" :class="{ 'opacity-40': todo.completed }"
          class="flex items-center justify-between cont max-w-[50%] m-auto w-full h-12 bg-white mt-12">
          <p :class="{ 'line-through': todo.completed }" class="text-md px-2 max-w-full line-clamp-1">
            {{ todo.title }}
          </p>
          <div class="h-full flex shrink-0 flex-nowrap">
            <button @click="todo_list.some(td => {
              if (td.id == todo.id)
                td.completed = !td.completed
            })"
              class="h-full transition-colors duration-200 bg-blue-500 text-white px-2 hover:bg-blue-600 cursor-pointer"><svg
                stroke="currentColor" fill="currentColor" stroke-width="0" version="1.2" baseProfile="tiny"
                viewBox="0 0 24 24" class="size-5" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <title>complete</title>
                <path
                  d="M16.972 6.251c-.967-.538-2.185-.188-2.72.777l-3.713 6.682-2.125-2.125c-.781-.781-2.047-.781-2.828 0-.781.781-.781 2.047 0 2.828l4 4c.378.379.888.587 1.414.587l.277-.02c.621-.087 1.166-.46 1.471-1.009l5-9c.537-.966.189-2.183-.776-2.72z">
                </path>
              </svg></button>
            <button @click="todo_list = todo_list.filter(td => td.id !== todo.id)"
              class="h-full transition-colors duration-200  text-white bg-purple-500 px-2 hover:bg-purple-700"><svg
                stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="size-5"
                height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <title>remove todo</title>
                <path
                  d="M405 136.798L375.202 107 256 226.202 136.798 107 107 136.798 226.202 256 107 375.202 136.798 405 256 285.798 375.202 405 405 375.202 285.798 256z">
                </path>
              </svg></button>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-center text-center font-bold text-md mt-5" v-else>No todo
        available in
        {{ filterType }} filter btw.
      </div>

    </div>
  </section>
</template>
