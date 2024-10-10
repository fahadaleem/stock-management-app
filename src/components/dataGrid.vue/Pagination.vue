<template>
  <!-- Pagination Controls -->
  <div class="c-pagination flex m-4">
    <button class="px-4 py-2 bg-gray-300 rounded disabled:opacity-50" :disabled="currentPage === 1" @click="prevPage">
      <i class="fa-solid fa-chevron-left"></i>
    </button>
    <button
      class="px-4 py-2 bg-gray-300 rounded ml-2 disabled:opacity-50"
      :disabled="currentPage === totalPages"
      @click="nextPage"
    >
      <i class="fa-solid fa-chevron-right"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: "c-pagination",
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
  },
  methods: {
    prevPage() {
      const self = this;
      if (self.currentPage > 1) {
        self.$emit("onUpdatePage", self.currentPage - 1); // Emit event with updated page number
      }
    },
    nextPage() {
      const self = this;
      if (self.currentPage < self.totalPages) {
        self.$emit("onUpdatePage", self.currentPage + 1); // Emit event with updated page number
      }
    },
  },
};
</script>
