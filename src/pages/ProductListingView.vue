<template>
  <div class="c-product-listing-view">
    <c-product-listing></c-product-listing>
  </div>
</template>
<script>
import ProductListing from "../components/products/ProductListing.vue";

export default {
  name: "c-product-listing-view",
  components: {
    cProductListing: ProductListing,
  },
};
</script>
