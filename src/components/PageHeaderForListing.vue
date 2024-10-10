<template>
  <div
    class="c-page-header-for-listing flex justify-between px-8 h-20 items-center border-b-2"
  >
    <h1 class="text-2xl font-bold">{{ pageTitle }}</h1>
    <slot name="actions"></slot>
  </div>
</template>
<script>
export default {
  name: "c-page-header-for-listing",
  props: {
    pageTitle: String,
  },
};
</script>
