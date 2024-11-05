<template>
  <div class="c-page-header-for-listing bg-primary flex justify-between px-8 h-20 items-center">
    <div class="flex justify-between items-center">
      <button class="mx-2 text-xl hover:bg-slate-200 h-12 w-12 rounded-full" @click="onNavigateToDashboard">
        <i class="fa-solid fa-arrow-left"></i>
      </button>
      <h1 class="text-2xl font-bold">{{ pageTitle }}</h1>
    </div>
    <slot name="actions"></slot>
  </div>
</template>
<script>
export default {
  name: "c-page-header-for-listing",
  props: {
    pageTitle: String,
  },
  methods: {
    onNavigateToDashboard() {
      const self = this;
      self.$router.push("/");
    },
  },
};
</script>
