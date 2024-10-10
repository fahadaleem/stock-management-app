<template>
  <div class="c-create-delivery-note">
    <c-create-delivery></c-create-delivery>
  </div>
</template>
<script>
import CreateDelivery from "../components/delivery/CreateDelivery.vue";
export default {
  name: "c-create-delivery-view",
  components: {
    cCreateDelivery: CreateDelivery,
  },
};
</script>
