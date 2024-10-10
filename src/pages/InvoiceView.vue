<template>
  <div class="c-invoice-view">
    <c-create-invoice></c-create-invoice>
  </div>
</template>
<script>
import CreateInvoice from "../components/invoice/CreateInvoice.vue";
export default {
  name: "c-invoice-view",
  components: {
    cCreateInvoice: CreateInvoice,
  },
};
</script>
