<template>
  <div class="c-stock-purchase-view">
    <c-stock-purchase></c-stock-purchase>
  </div>
</template>
<script>
import StockPurchase from "../components/stockPurchase/StockPurchase.vue";
export default {
  name: "c-stock-purchase-view",
  components: {
    cStockPurchase: StockPurchase,
  },
};
</script>
