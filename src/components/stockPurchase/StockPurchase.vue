<template>
  <div class="c-stock-purchase">
    <c-page-header
      page-name="New Stock Purchase"
      :is-valid="isValid"
      @onSave="onSave"
      :is-loading="isLoading"
    ></c-page-header>
    <c-purchase-type-tabs @onChangePurchaseType="onChangePurchaseType"></c-purchase-type-tabs>
    <!-- form -->
    <div>
      <c-stock-purchase-form-for-individual-items
        v-if="selectedPurchaseType === purchaseTypes.INDIVIDUAL_ITEMS"
        @onUpdatePurchaseDetails="onUpdatePurchaseDetails"
      ></c-stock-purchase-form-for-individual-items>
      <c-stock-purchase-form-for-bundle-items
        v-else
        @onUpdatePurchaseDetails="onUpdatePurchaseDetails"
      ></c-stock-purchase-form-for-bundle-items>
    </div>
  </div>
</template>
<script>
import PageHeader from "../PageHeader.vue";
import PurchaseTypeTabs from "./PurchaseTypeTabs.vue";
import StockPurchaseFormForIndividualItems from "./StockPurchaseFormForIndividualItems.vue";
import StockPurchaseFormForBundleItems from "./StockPurchaseFormForBundleItems.vue";

import { appConstantService } from "../../services/appConstantsService";
import { apiUtilServices } from "../../services/apiUtilServices";

export default {
  name: "c-stock-purchase",
  components: {
    cPageHeader: PageHeader,
    cPurchaseTypeTabs: PurchaseTypeTabs,
    cStockPurchaseFormForIndividualItems: StockPurchaseFormForIndividualItems,
    cStockPurchaseFormForBundleItems: StockPurchaseFormForBundleItems,
  },
  data() {
    return {
      selectedPurchaseType: appConstantService.purchaseTypes.INDIVIDUAL_ITEMS,
      purchaseTypes: appConstantService.purchaseTypes,
      purchaseDetails: {},
      isValid: false,
      isLoading: false,
    };
  },
  methods: {
    onChangePurchaseType(type) {
      const self = this;
      self.selectedPurchaseType = type;
      self.isValid = false;
    },
    onUpdatePurchaseDetails({ purchaseDetails, isValid }) {
      const self = this;
      self.purchaseDetails = purchaseDetails;
      self.isValid = isValid;
    },
    async onSave() {
      const self = this;
      let documentUrls = [];
      self.isLoading = true;

      const { purchaseDate, paymentMethod, items, supportedDocuments, isBundle, totalBundleCostPrice } =
        self.purchaseDetails;

      const products = items.map((item) => {
        return {
          cost_price: item.costPrice,
          min_market_value: item.minMarketValue,
          name: item.name,
          quantity: item.quantity,
        };
      });
      if (supportedDocuments.length) {
        const promises = [];
        supportedDocuments.forEach((document) => {
          promises.push(apiUtilServices.uploadFileRequest(document));
        });

        documentUrls = await Promise.all(promises);
      }

      //   creating payload
      const payload = {
        purchase_date: purchaseDate,
        payment_method: paymentMethod,
        products: products,
        is_bundle: !!isBundle,
        total_bundle_cost: totalBundleCostPrice || null,
        supported_documents: documentUrls,
      };

      apiUtilServices
        .postRequest("/stocks", payload)
        .then((res) => {
          if (res.status === "success") {
            self.$toast.open({
              type: "success",
              message: res.message,
            });
            self.$router.push("/");
          }
        })
        .catch((err) => {
          self.$toast.open({
            type: "error",
            message: (err.response && err.response.data && err.response.data.message) || "Internal server error",
          });
        })
        .finally(() => {
          self.isLoading = false;
        });
    },
  },
};
</script>
