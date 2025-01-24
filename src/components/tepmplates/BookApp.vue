<script setup lang="ts">

type Book = {
  title: string
  author: string
  year: string | number
}

import { ref } from 'vue'

const newBookData = ref<Book>({ author: '', title: "", year: '' })
const added_books = ref<Book[]>([])
const first_book_form_input = ref<HTMLInputElement | null>(null)
const errMessage = ref<string | null>(null)

let interval: number | undefined = undefined

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

</script>

<template>
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
</template>
