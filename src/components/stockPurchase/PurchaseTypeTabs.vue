<template>
  <div class="c-purchase-type-tabs">
    <div class="flex justify-between">
      <div
        class="w-full p-4"
        :class="getTabClass(purchaseTypes.INDIVIDUAL_ITEMS)"
      >
        <button
          class="text-center w-full font-medium text-xl"
          @click="onChangePurchaseType(purchaseTypes.INDIVIDUAL_ITEMS)"
        >
          Item Purchase
        </button>
      </div>
      <div class="w-full p-4" :class="getTabClass(purchaseTypes.BUNDLE_ITEMS)">
        <button
          class="text-center w-full font-medium text-xl"
          @click="onChangePurchaseType(purchaseTypes.BUNDLE_ITEMS)"
        >
          Bundle Purchase
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { appConstantService } from "../../services/appConstantsService";

export default {
  name: "c-purchase-type-tabs",
  data() {
    return {
      selectedPurchaseType: appConstantService.purchaseTypes.INDIVIDUAL_ITEMS,
      purchaseTypes: appConstantService.purchaseTypes,
    };
  },
  methods: {
    onChangePurchaseType(type) {
      const self = this;
      self.selectedPurchaseType = type;

      self.$emit("onChangePurchaseType", type);
    },
    getTabClass(type) {
      const self = this;
      return self.selectedPurchaseType === type
        ? "bg-primary text-white"
        : "bg-secondary text-black";
    },
  },
};
</script>
