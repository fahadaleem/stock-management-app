<template>
  <div class="c-stock-purchase-form-for-bundle-items">
    <div class="w-[50%] mx-auto my-16">
      <form @submit.prevent="handleSubmit" class="flex flex-col gap-y-4">
        <div>
          <h2 class="text-xl mb-2 text-white">Date of Purchase</h2>
          <input
            type="date"
            v-model="purchaseDate"
            @change="onChangePurchasDetails"
            class="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
          />
        </div>
        <div>
          <h2 class="text-xl mb-2 text-white">Method of Payment</h2>
          <select
            @change="onChangePurchasDetails"
            class="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
          >
            <option value="cash">Cash</option>
            <option value="card">Card</option>
            <option value="cheque">Cheque</option>
            <option value="credit">Credit</option>
          </select>
        </div>
        <div>
          <h2 class="text-xl mb-2 text-white">Total Bundle Cost</h2>
          <input
            type="number"
            @change="onChangePurchasDetails"
            v-model="totalBundleCostPrice"
            class="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
          />
        </div>
        <div>
          <h2 class="text-xl mb-2 text-white">Items</h2>
          <div
            class="bg-primary rounded py-8 p-4 relative"
            :class="{ 'mb-4': items.length !== index - 1 }"
            v-for="(item, index) in items"
            :key="index"
          >
            <!-- Close button to remove an item -->
            <button
              v-if="items.length > 1"
              @click.prevent="removeItem(index)"
              class="absolute top-2 right-2 bg-slate-500 text-white w-6 h-6 rounded-full hover:bg-slate-600 focus:outline-none"
            >
              <i class="fa-solid fa-trash text-xs"></i>
            </button>
            <table class="w-full table-auto">
              <tbody>
                <tr>
                  <td class="px-4 py-2 font-medium">Item Name</td>
                  <td class="px-4 py-2">
                    <input
                      type="text"
                      v-model="item.name"
                      @change="onChangePurchasDetails"
                      placeholder="Enter item name"
                      class="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                    />
                  </td>
                </tr>
                <tr>
                  <td class="px-4 py-2 font-medium">Quantity</td>
                  <td class="px-4 py-2">
                    <input
                      type="number"
                      placeholder="0"
                      v-model="item.quantity"
                      @change="onChangePurchasDetails"
                      class="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                    />
                  </td>
                </tr>
                <tr>
                  <td class="px-4 py-2 font-medium">Min Market Value</td>
                  <td class="px-4 py-2">
                    <input
                      type="number"
                      placeholder="0"
                      v-model="item.minMarketValue"
                      @change="onChangePurchasDetails"
                      class="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                    />
                  </td>
                </tr>
                <tr>
                  <td class="px-4 py-2 font-medium">Estimated Cost Price</td>
                  <td class="px-4 py-2 flex gap-x-2">
                    <input
                      type="number"
                      placeholder="0"
                      :value="item.costPrice"
                      disabled
                      @change="onChangePurchasDetails"
                      class="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                    />
                    <button
                      class="p-2 font-medium border-2 border-slate-400 rounded"
                      @click="calculateEstimatedCostPrice(item)"
                      :disabled="!totalBundleCostPrice || !item.minMarketValue || !item.quantity"
                    >
                      Calculate
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <button type="button" class="border rounded border-slate-600 p-2 font-medium w-full" @click="addNewItem">
            Add new item
          </button>
        </div>
        <div>
          <h2 class="text-xl mb-2 text-white">Add Supported Documents</h2>
          <c-file-uploader @onChangeSupportedDocs="onChangeSupportedDocs"></c-file-uploader>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { watch } from "vue";
import FileUploader from "../FileUploader.vue";

export default {
  name: "c-stock-purchase-form-for-bundle-items",
  components: {
    cFileUploader: FileUploader,
  },
  data() {
    return {
      totalBundleCostPrice: 0,
      items: [
        {
          name: "",
          costPrice: 0,
          minMarketValue: 0,
          quantity: 0,
        },
      ],
      purchaseDate: "",
      paymentMethod: "cash", // Default value
      supportedDocuments: [],
    };
  },
  computed: {
    isValid() {
      const self = this;
      return !!(
        self.purchaseDate &&
        self.totalBundleCostPrice > 0 &&
        self.items.every((item) => item.name && item.quantity > 0 && item.minMarketValue > 0)
      );
    },
  },

  methods: {
    addNewItem() {
      const self = this;
      self.items.push({
        name: "",
        quantity: 0,
        costPrice: 0,
        minMarketValue: 0,
      });
      self.onChangePurchasDetails();
    },
    removeItem(index) {
      const self = this;
      self.items.splice(index, 1);
      self.onChangePurchasDetails();
    },
    calculateMinMarketValueOfAllItems() {
      const self = this;
      // Use reduce to sum up the minMarketValue of all items
      const totalMinMarketValue = self.items.reduce((total, item) => {
        return total + (item.minMarketValue || 0); // Add the item's minMarketValue, defaulting to 0 if it's null or undefined
      }, 0); // Initial value of total is 0

      return totalMinMarketValue;
    },
    calculateEstimatedCostPrice(item) {
      const self = this;
      const constPriceOf1Item =
        (item.minMarketValue / self.calculateMinMarketValueOfAllItems()) * self.totalBundleCostPrice;
      item.costPrice = (constPriceOf1Item / item.quantity).toFixed(2);
    },
    onChangeSupportedDocs(files) {
      const self = this;
      self.supportedDocuments = [...files];
      self.onChangePurchasDetails();
    },
    onChangePurchasDetails() {
      const self = this;
      self.$emit("onUpdatePurchaseDetails", {
        purchaseDetails: {
          purchaseDate: self.purchaseDate,
          paymentMethod: self.paymentMethod,
          items: self.items,
          totalBundleCostPrice: self.totalBundleCostPrice,
          supportedDocuments: self.supportedDocuments,
          isBundle: true,
        },
        isValid: self.isValid,
      });
    },
  },
};
</script>
