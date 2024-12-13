<template>
  <div class="c-stock-purchase-form-for-individual-items">
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
            v-model="paymentMethod"
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
                  <td class="px-4 py-2 font-medium">Cost Per Unit</td>
                  <td class="px-4 py-2">
                    <input
                      type="number"
                      v-model="item.costPrice"
                      placeholder="0"
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
                      v-model="item.minMarketValue"
                      placeholder="0"
                      @change="onChangePurchasDetails"
                      class="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <button
            type="button"
            @change="onChangePurchasDetails"
            class="border rounded bg-primary p-2 font-medium w-full text-white"
            @click="addNewItem"
          >
            Add new item
          </button>
        </div>
        <div>
          <h2 class="text-white text-xl mb-2">Add Supported Documents</h2>
          <c-file-uploader @onChangeSupportedDocs="onChangeSupportedDocs"></c-file-uploader>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import FileUploader from "../FileUploader.vue";

export default {
  name: "c-stock-purchase-form-for-individual-items",
  components: {
    cFileUploader: FileUploader,
  },
  data() {
    return {
      purchaseDate: "",
      paymentMethod: "cash", // Default value
      items: [{ name: "", costPrice: 0, minMarketValue: 0, quantity: 1 }],
      supportedDocuments: [],
    };
  },
  computed: {
    isValid() {
      const self = this;
      // Check if purchaseDate is filled
      const isDateValid = !!self.purchaseDate;

      // Check if paymentMethod is selected
      const isPaymentMethodValid = !!self.paymentMethod;

      // Check if all items are filled
      const areItemsValid =
        self.items &&
        self.items.every((item) => {
          return item.name.trim() && item.costPrice && item.minMarketValue;
        });

      // Return true if all fields are valid
      return isDateValid && isPaymentMethodValid && areItemsValid;
    },
  },
  methods: {
    addNewItem() {
      const self = this;
      self.items.push({ name: "", costPrice: 0, minMarketValue: 0, quantity: 1 });
    },
    removeItem(index) {
      const self = this;
      self.items.splice(index, 1);
    },
    handleSubmit() {
      // Handle form submission logic here
      console.log("Submitted Data:", {
        purchaseDate: this.purchaseDate,
        paymentMethod: this.paymentMethod,
        items: this.items,
      });
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
          supportedDocuments: self.supportedDocuments,
        },
        isValid: self.isValid,
      });
    },
  },
};
</script>
