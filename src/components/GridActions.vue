<template>
  <div class="c-grid-actions">
    <button
      id="dropdownDefaultButton"
      @click="showDropDownMenu = !showDropDownMenu"
      data-dropdown-toggle="dropdown"
      class="font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      type="button"
    >
      <i class="fa-solid fa-ellipsis-vertical text-white"></i>
    </button>

    <!-- Dropdown menu -->
    <div
      id="dropdown"
      :class="{ block: showDropDownMenu, hidden: !showDropDownMenu }"
      class="z-10 absolute shadow right-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-40 dark:bg-gray-700"
    >
      <ul class="text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
        <li v-for="(action, index) in actions" :key="index">
          <button @click="action.handler" class="text-left w-full px-4 py-2 hover:bg-gray-200">
            {{ action.text }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "c-grid-actions",
  props: {
    actions: Array,
  },
  data() {
    return {
      showDropDownMenu: false,
    };
  },
};
</script>
