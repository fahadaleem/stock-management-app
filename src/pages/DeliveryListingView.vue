<template>
  <div class="c-delivery-listing-view">
    <c-delivery-listing></c-delivery-listing>
  </div>
</template>
<script>
import DeliveryListing from "../components/delivery/deliveryListing.vue";

export default {
  name: "c-delivery-listing-view",
  components: {
    cDeliveryListing: DeliveryListing,
  },
};
</script>
