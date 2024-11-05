<template>
  <div class="c-view-invoice-view">
    <c-view-invoice></c-view-invoice>
  </div>
</template>
<script>
import ViewInvoice from "../components/invoice/ViewInvoice.vue";

export default {
  name: "c-view-invoice-view",
  components: {
    cViewInvoice: ViewInvoice,
  },
};
</script>
