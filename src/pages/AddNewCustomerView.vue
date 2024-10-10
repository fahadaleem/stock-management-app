<template>
  <div class="c-add-new-customer-view">
    <c-add-new-customer></c-add-new-customer>
  </div>
</template>
<script>
import AddNewCustomer from "../components/customerDatabase/AddNewCustomer.vue";
export default {
  name: "c-add-new-customer-view",
  components: {
    cAddNewCustomer: AddNewCustomer,
  },
};
</script>
