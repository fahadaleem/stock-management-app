<template>
  <div class="c-file-upload mx-auto">
    <!-- File Upload Button -->
    <label
      class="flex justify-center h-12 items-center bg-blue-500 text-white p-2 rounded cursor-pointer hover:bg-blue-600"
      for="file-upload"
    >
      Upload
      <input
        id="file-upload"
        type="file"
        class="hidden"
        @change="handleFileUpload"
      />
    </label>

    <!-- Display uploaded file details -->
    <div v-if="files.length" class="mt-4">
      <div
        v-for="(file, index) in files"
        :key="index"
        class="flex items-center mt-2 bg-gray-100 p-3 rounded"
      >
        <!-- File icon -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-gray-500 mr-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>

        <!-- File name (with truncation) -->
        <span class="flex-grow text-gray-700 truncate" :title="file.name">
          {{ file.name }}
        </span>

        <!-- Remove file button -->
        <button
          class="text-red-500 hover:text-red-700"
          @click="removeFile(index)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "c-file-upload",
  data() {
    return {
      files: [],
    };
  },
  methods: {
    handleFileUpload(event) {
      const self = this;
      const selectedFiles = Array.from(event.target.files);
      self.files.push(...selectedFiles); // Add multiple files

      self.$emit("onChangeSupportedDocs", self.files);
    },
    removeFile(index) {
      const self = this;
      self.files.splice(index, 1); // Remove a specific file by index
    },
  },
};
</script>

<style scoped>
/* Additional custom styles can go here */
</style>
