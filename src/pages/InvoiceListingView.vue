<template>
  <c-invoice-listing></c-invoice-listing>
</template>
<script>
import InvoiceListing from "../components/invoice/InvoiceListing.vue";

export default {
  name: "c-invoice-listing-view",
  components: {
    cInvoiceListing: InvoiceListing,
  },
};
</script>
