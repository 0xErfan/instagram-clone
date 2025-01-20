<script setup lang="ts">

type Book = {
  title: string
  author: string
  year: string | number
}

interface Todo {
  id: string
  title: string
  completed: boolean
}

type FilterType = 'all' | 'completed' | 'progress'

import { ref, computed } from "vue";

const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: ["Berlin", "Madrid", "Paris", "Rome"],
    correctAnswer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: ["Earth", "Mars", "Jupiter", "Venus"],
    correctAnswer: "Mars",
  },
  {
    question: "Who wrote the play 'Romeo and Juliet'?",
    answers: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Leo Tolstoy"],
    correctAnswer: "William Shakespeare",
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: ["Indian Ocean", "Atlantic Ocean", "Arctic Ocean", "Pacific Ocean"],
    correctAnswer: "Pacific Ocean",
  },
  {
    question: "What is the chemical symbol for water?",
    answers: ["O2", "H2O", "CO2", "NaCl"],
    correctAnswer: "H2O",
  },
];


const counter = ref(0)
const temperature = ref(0)
const countDownValue = ref(0)
const formattedCountDown = ref('00:00:00')
const loginData = ref<Record<string, unknown>>({})
const rightAnswers = ref(0)
const currentQuestionIndex = ref(0)
const timer = ref<number | undefined>(undefined)
const newBookData = ref<Book>({ author: '', title: "", year: '' })
const added_books = ref<Book[]>([])
const first_book_form_input = ref<HTMLInputElement | null>(null)
const errMessage = ref<string | null>(null)
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

const add_book = () => {

  clearTimeout(interval)

  const is_book_data_incomplete = Object.entries(newBookData.value).some(([key, value]) => {
    if (!Boolean(value.toString().trim())) {
      errMessage.value = `The ${key} value is required to create a book buddy.`
      interval = setTimeout(() => {
        errMessage.value = ''
      }, 2000);
      return true
    }
  })

  if (is_book_data_incomplete) return;

  added_books.value.push(newBookData.value as Book)
  newBookData.value = { author: '', title: "", year: '' }
  if (first_book_form_input.value) {
    first_book_form_input.value.focus()
  }
}

const update_book_form = <T extends keyof Book>(val: Book[T], key: T) => {
  newBookData.value = { ...newBookData.value, [key]: val } as Book
}

const checkAnswer = (question: string, answer: string) => {

  if (timer.value) return
  clearTimeout(timer.value)

  const quizItem = quizQuestions.find(item => item.question === question)

  if (!quizItem) return alert('quiz not found')

  if (quizItem.correctAnswer === answer) rightAnswers.value++

  timer.value = setTimeout(() => {
    if (currentQuestionIndex.value + 1 == quizQuestions.length) {
      alert(`your shitty score is: ${rightAnswers.value}`)
      currentQuestionIndex.value = 0
    } else currentQuestionIndex.value++
    timer.value = undefined
  }, 2000);

}

const update_form = (e: Event, key: string) => {
  const target = e.target as HTMLInputElement
  loginData.value = { ...loginData.value, [key]: target.value }
}

const submit_login_form = () => {
  console.log(loginData)
  alert(JSON.stringify(loginData.value))
}

const stopCountDown = () => {
  clearInterval(interval)
  interval = undefined;
}

const startCountDown = () => {
  if (interval) return;
  clearInterval(interval)
  formatCountDownValue(countDownValue.value)
  interval = setInterval(() => {
    formatCountDownValue(++countDownValue.value)
  }, 1000)
}

const formatCountDownValue = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
  const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  formattedCountDown.value = `${hours}:${minutes}:${seconds}`;
}

const resetCountDown = () => {
  clearInterval(interval)
  interval = undefined;
  countDownValue.value = 0
  formatCountDownValue(countDownValue.value)
}

const temperature_color = computed(() => {
  return temperature.value < 0 ? 'bg-blue-400' : (temperature.value > 0 && temperature.value < 5) ? 'bg-green-300' : 'bg-red-400'
})

</script>

<template>
  <main>
    <!-- ___________________________ -->
    <section class="w-full h-[500px] bg-sky-500/75 flex items-center justify-center">
      <div class="border border-black/30 bg-blue-400 text-center space-y-6 p-12 rounded-xl">
        <p class="text-2xl text-black">Counter</p>
        <p class="text-white text-2xl">{{ counter }}</p>
        <div class="flex items-center justify-between gap-4">
          <button @click="counter++"
            class="flex items-center justify-center p-4 cursor-pointer transition-all duration-300 hover:bg-gray-600 bg-gray-500 text-white text-xl rounded-xl">Inc</button>
          <button @click="counter--"
            class="flex items-center justify-center p-4 cursor-pointer transition-all duration-300 hover:bg-gray-600 bg-gray-500 text-white text-xl rounded-xl">Dec</button>
          <button @click="counter = 0"
            class="flex items-center justify-center p-4 cursor-pointer transition-all duration-300 hover:bg-gray-600 bg-gray-500 text-white text-xl rounded-xl">Reset</button>
        </div>
      </div>
    </section>
    <!-- ___________________________ -->
    <section class="flex items-center justify-center w-full h-[500px] bg-pink-200">
      <div
        class="flex flex-col w-52 h-[300px] p-4 space-y-4 rounded-md bg-blue-950 *:flex *:items-center *:justify-center text-center shadow-black shadow-xl">
        <div
          :class='["border border-white duration-200 transition-all w-full h-[176px] rounded-full", temperature_color]'>
          <p class="text-white shadow-xl p-1 bg-inherit text-xl">{{ temperature }} °C</p>
        </div>
        <div class="gap-8 *:flex *:items-center *:justify-center">
          <button @click="temperature++"
            class="size-14 border border-white rounded-full duration-300 transition-all hover:bg-gray-600 p-px bg-gray-500">+</button>
          <button @click="temperature--"
            class="size-14 border border-white rounded-full duration-300 transition-all hover:bg-gray-400 p-px bg-gray-300">-</button>
        </div>
      </div>
    </section>
    <!-- ___________________________ -->
    <section class="bg-gray-200 py-36">
      <div class="max-w-[500px] m-auto w-full space-y-4 shadow-sm rounded-md shadow-black p-4">
        <div class="relative w-5/6 m-auto">
          <div class="circle">
            <p class="flex items-center size-full justify-center rounded-md text-4xl font-semibold p-2"><span
                class=" p-2 rounded-md bg-white tracking-wide">{{ formattedCountDown }}</span></p>
          </div>
          <div class="flex items-center justify-evenly *:cursor-pointer *:duration-200 mt-20">
            <div @click="startCountDown"
              class="flex items-center justify-center hover:bg-purple-800  hover:text-white text-purple-800 rounded-full p-2 border border-purple-500">
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16"
                class="*:size-6 rounded-md" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M4.25 3l1.166-.624 8 5.333v1.248l-8 5.334-1.166-.624V3zm1.5 1.401v7.864l5.898-3.932L5.75 4.401z">
                </path>
              </svg>
            </div>
            <div @click="stopCountDown"
              class="flex items-center justify-center rounded-full bg-purple-800 gap-3 text-white py-2 px-4 border border-purple-500">
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24"
                class="*:size-6 rounded-md" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <g id="Stop_1">
                  <path
                    d="M18.437,20.937H5.563a2.5,2.5,0,0,1-2.5-2.5V5.563a2.5,2.5,0,0,1,2.5-2.5H18.437a2.5,2.5,0,0,1,2.5,2.5V18.437A2.5,2.5,0,0,1,18.437,20.937ZM5.563,4.063a1.5,1.5,0,0,0-1.5,1.5V18.437a1.5,1.5,0,0,0,1.5,1.5H18.437a1.5,1.5,0,0,0,1.5-1.5V5.563a1.5,1.5,0,0,0-1.5-1.5Z">
                  </path>
                </g>
              </svg>
              <p>stop</p>
            </div>
            <div @click="resetCountDown"
              class="flex items-center justify-center hover:bg-purple-800  hover:text-white rounded-full text-purple-800 p-2 border border-purple-500">
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="*:size-6"
                height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path fill="none" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32"
                  d="m400 148-21.12-24.57A191.43 191.43 0 0 0 240 64C134 64 48 150 48 256s86 192 192 192a192.09 192.09 0 0 0 181.07-128">
                </path>
                <path
                  d="M464 97.42V208a16 16 0 0 1-16 16H337.42c-14.26 0-21.4-17.23-11.32-27.31L436.69 86.1C446.77 76 464 83.16 464 97.42z">
                </path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- ___________________________ -->
    <section class="sign-form flex items-center justify-center w-full h-[600px] *:text-white/80">
      <div class="max-w-[520px] w-full p-4 bg-transparent backdrop-blur-md border rounded-md border-white/50">
        <p class="text-2xl text-center pb-6">Sign-In</p>
        <form @submit.prevent="submit_login_form" class="flex flex-col gap-4">
          <input :value="loginData.name ?? ''" @change="e => update_form(e, 'name')"
            class="bg-transparent border-b-2 outline-none pb-2 border-red-600" placeholder="Enter your name"
            type="text">
          <input :value="loginData.password ?? ''" @change="e => update_form(e, 'password')"
            class="bg-transparent border-b-2 outline-none pb-2 border-red-600" placeholder="Enter your password"
            type="text">
          <input :value="loginData.email ?? ''" @change="e => update_form(e, 'email')"
            class="bg-transparent border-b-2 outline-none pb-2 border-red-600" placeholder="Enter your email"
            type="text">
          <div class="flex xs:flex-row justify-between flex-col text-center"><label
              class="flex gap-2 xs:justify-start justify-center">Remember me<input type="checkbox"></label>
            <p>Forgot password?</p>
          </div><input class="bg-white/80 text-black w-full py-2 rounded-md duration-300 hover:bg-white/50"
            type="submit" value="Sign In">
        </form>
      </div>
    </section>
    <!-- ___________________________ -->
    <section class="flex items-center justify-center py-28 w-full bg-gray-400">
      <div
        class="flex p-4 justify-center ch:basis-1/2 max-w-[500px] w-full text-white/80 bg-black/40 rounded-xl shadow-white shadow-regular">
        <div class="text-2xl">{{ quizQuestions[currentQuestionIndex].question }}</div>
        <ul
          class="flex flex-col w-full gap-3 ch:w-full ch:text-xl ch:cursor-pointer ch:border-2  ch:duration-100 ch:transition-all  ch:rounded-xl ch:p-2">
          <li @click="checkAnswer(quizQuestions[currentQuestionIndex].question, answer)"
            v-for="(answer, index) of quizQuestions[currentQuestionIndex].answers" :key="index"
            :class="['border-sky-600 border', timer && (quizQuestions[currentQuestionIndex].correctAnswer === answer ? '!border-green-400' : '!border-red-400')]">
            {{ answer }}
          </li>
        </ul>
      </div>
    </section>
    <!-- ___________________________ -->
    <section class="flex items-center justify-center w-full m-auto p-8 h-auto py-28 bg-gray-200 text-black relative">
      <div
        :class='["flex justify-center w-[60%] m-auto absolute right-0 left-0 py-4 rounded-xl bg-red-500 transition-all duration-300 text-xl text-white text-center", !errMessage && "opacity-0"]'>
        {{ errMessage ?? '' }}
      </div>
      <div class="max-w-[900px] w-full">
        <div class="flex items-center gap-2 justify-center text-center w-full m-auto pb-4"><svg stroke="currentColor"
            fill="currentColor" stroke-width="0" viewBox="0 0 576 512" class="size-8 text-orange-400" height="1em"
            width="1em" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M542.22 32.05c-54.8 3.11-163.72 14.43-230.96 55.59-4.64 2.84-7.27 7.89-7.27 13.17v363.87c0 11.55 12.63 18.85 23.28 13.49 69.18-34.82 169.23-44.32 218.7-46.92 16.89-.89 30.02-14.43 30.02-30.66V62.75c.01-17.71-15.35-31.74-33.77-30.7zM264.73 87.64C197.5 46.48 88.58 35.17 33.78 32.05 15.36 31.01 0 45.04 0 62.75V400.6c0 16.24 13.13 29.78 30.02 30.66 49.49 2.6 149.59 12.11 218.77 46.95 10.62 5.35 23.21-1.94 23.21-13.46V100.63c0-5.29-2.62-10.14-7.27-12.99z">
            </path>
          </svg>
          <h2 class="text-2xl">A Simple <span class="text-orange-400">Book</span> List App</h2>
        </div>
        <form @submit.prevent="add_book" class="flex flex-col space-y-3">

          <label>
            Title
            <input ref="first_book_form_input"
              @change="e => update_book_form((e.target as HTMLInputElement).value, 'title')"
              :value="newBookData?.title ?? ''" class="w-full py-2 px-3 rounded-md border border-gray-800" type="text"
              placeholder="Book title">
          </label>

          <label>
            Author
            <input @change="e => update_book_form((e.target as HTMLInputElement).value, 'author')"
              :value="newBookData?.author ?? ''" class="w-full py-2 px-3 rounded-md border border-gray-800" type="text"
              placeholder="Book Author">
          </label>

          <label>
            Year
            <input @change="e => update_book_form((e.target as HTMLInputElement).value, 'year')"
              :value="newBookData?.year ?? ''" class="w-full py-2 px-3 rounded-md border border-gray-800" type="text"
              placeholder="Year of Book foundation">
          </label>

          <input
            class="w-full py-2 px-3 rounded-md border border-gray-800 hover:bg-orange-600 duration-200 transition-all text-white bg-orange-500"
            type="submit" value="Add Book">

        </form>
        <table class="w-full text-center mt-12">
          <tbody>
            <tr class="ch:border ch:border-gray-500 mt-10">
              <th>Title</th>
              <th>Author</th>
              <th>Year</th>
            </tr>
            <tr @click="added_books = added_books.filter(bk => bk.title !== book.title)"
              v-for="(book, index) of added_books" :key="index"
              class="even:bg-gray-400 ch:border ch:border-gray-500 overflow-auto">
              <td>{{ book.title }}</td>
              <td>{{ book.author }}</td>
              <td>{{ book.year }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
    <!-- ___________________________ -->
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
            class="flex outline-none items-center justify-between basis-1/3 px-2 rouned-sm bg-white">
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="progress">In progress</option>
          </select>
        </div>
        <div v-if="filteredTodos.length">
          <div v-for="(todo, index) of filteredTodos" :key="index" :class="{ 'opacity-40': todo.completed }"
            class="flex items-center justify-between cont max-w-[50%] m-auto w-full h-12 bg-white mt-12">
            <p :class="{ 'line-through': todo.completed }" class="text-md px-2 max-w-full line-clamp-1">{{ todo.title }}
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
        <div class="flex items-center justify-center text-center font-bold text-md mt-5" v-else>No todo available in
          {{ filterType }} filter btw.
        </div>

      </div>
    </section>
    <!-- ___________________________ -->
  </main>
</template>
