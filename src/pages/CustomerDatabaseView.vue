<template>
  <div class="c-customer-database-view">
    <c-customer-database></c-customer-database>
  </div>
</template>
<script>
import CustomerDatabase from "../components/customerDatabase/CustomerDatabase.vue";
export default {
  name: "c-customer-database-view",
  components: {
    cCustomerDatabase: CustomerDatabase,
  },
};
</script>
