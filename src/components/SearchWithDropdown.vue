<template>
  <div class="c-search-with-dropdown">
    <div>
      <div class="flex gap-x-4">
        <h2 class="font-medium my-2" v-if="label">{{ label }}:</h2>
        <div class="w-full relative">
          <!-- Input field for customer search -->
          <input
            type="text"
            v-model="inputValue"
            @input="handleInput"
            class="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
            :placeholder="placeholderText"
          />

          <!-- Dropdown menu for search results -->
          <div
            v-if="filteredListItems.length && showDropdown"
            class="absolute bg-white shadow-lg max-h-[180px] w-full overflow-y-auto rounded-md z-10"
          >
            <div
              v-for="(listItem, index) in filteredListItems"
              :key="index"
              class="p-2 hover:bg-slate-200 cursor-pointer"
              @click="selectItem(listItem)"
            >
              <span>{{ listItem.text }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "c-search-with-dropdown",
  props: {
    listItems: Array,
    label: String,
    placeholderText: {
      type: String,
      default: "Search",
    },
    itemText: String,
    itemValue: String,
  },
  data() {
    return {
      inputValue: "", // Bind to input field for user input
      searchText: "", // Track search input separately
      showDropdown: false, // Control the visibility of the dropdown
    };
  },
  computed: {
    // Filter customers based on the input search text
    filteredListItems() {
      const self = this;
      return self.listItems.filter((item) => item.text.toLowerCase().includes(self.searchText.toLowerCase()));
    },
  },
  methods: {
    // Handle input changes and show dropdown
    handleInput() {
      const self = this;
      self.searchText = self.inputValue; // Sync search text with input value
      self.showDropdown = self.searchText.length > 0; // Show dropdown if there’s input
    },
    // Handle customer selection
    selectItem(item) {
      const self = this;
      self.inputValue = item.text; // Set input value to the selected customer
      self.showDropdown = false; // Close dropdown after selection

      //  setting value
      self.$emit("onSelectItem", item.value);
    },
  },
};
</script>
