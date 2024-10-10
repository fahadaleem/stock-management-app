<template>
  <div class="c-create-invoice">
    <c-page-header page-name="Create Invoice" @onSave="onSaveInvoice" :is-valid="isValid"></c-page-header>
    <div class="p-8">
      <c-search-with-dropdown
        label="Customers"
        :list-items="customers"
        @onSelectItem="onSelectCustomer"
      ></c-search-with-dropdown>

      <!-- Product table -->
      <div class="my-4" v-if="selectedCustomer">
        <table class="w-full">
          <thead class="text-gray-700 uppercase bg-gray-200">
            <tr>
              <th class="py-4">Product</th>
              <th class="py-4">Cost Price</th>
              <th class="py-4">Selling Price</th>
              <th class="py-4">Quantity</th>
              <th class="py-4">Total Price</th>
            </tr>
          </thead>
          <tbody>
            <tr class="relative" v-for="(item, key) in invoicedItems" :key="key">
              <td class="p-4">
                <c-search-with-dropdown
                  :list-items="dropdownListOfProduct"
                  @onSelectItem="(selectedItem) => onSelectProduct(item, selectedItem)"
                ></c-search-with-dropdown>
              </td>
              <td class="p-4 text-center">
                <h2 class="font-semibold">{{ item.costPrice }}</h2>
              </td>
              <td class="p-4">
                <input
                  type="number"
                  v-model="item.sellingPrice"
                  class="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                />
              </td>
              <td class="p-4">
                <input
                  type="number"
                  v-model="item.quantity"
                  class="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                />
              </td>
              <td class="p-4 text-center">
                <h2 class="font-semibold">
                  {{ item.totalPrice }}
                </h2>
              </td>
              <!-- close button -->
              <td>
                <button class="absolute top-5 right-2 text-red-600 text-2xl" @click="onRemoveRow(key)">
                  <i class="fa-solid fa-xmark"></i>
                </button>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="4" class="py-4 text-right font-semibold">Total:</td>
              <td class="py-4 text-center font-semibold">
                {{ calculateTotal() }}
              </td>
            </tr>
          </tfoot>
        </table>
        <div class="w-40 ml-auto">
          <button class="w-full bg-primary p-2 text-white rounded" @click="onAddNewRow">Add new row</button>
        </div>
      </div>
      <div v-else>
        <h2 class="text-center my-4 font-bold text-2xl">Please Select the customer</h2>
      </div>
    </div>
  </div>
</template>
<script>
import { apiUtilServices } from "../../services/apiUtilServices";

import PageHeader from "../PageHeader.vue";
import SearchWithDropdown from "../SearchWithDropdown.vue";

import lodashCloneDeep from "lodash/cloneDeep";

export default {
  name: "c-create-invoice",
  components: {
    cPageHeader: PageHeader,
    cSearchWithDropdown: SearchWithDropdown,
  },
  data() {
    const self = this;
    return {
      customers: [],
      products: [],
      selectedCustomer: "", // Bind to input field for user input
      invoicedItems: [],
      defaultInvoiceItemObj: {
        product: "",
        costPrice: 0,
        sellingPrice: 0,
        quantity: 0,
        totalPrice: 0,
      },
      dropdownListOfProduct: [],
    };
  },
  computed: {
    isValid() {
      const self = this;
      // Check if selectedCustomer is not empty
      if (!this.selectedCustomer.trim()) {
        return false;
      }

      // Check if all invoicedItems are valid
      return this.invoicedItems.every((item) => {
        return (
          item.product !== "" && // Product name is not empty
          item.costPrice > 0 && // Cost price is greater than 0
          item.sellingPrice > 0 && // Selling price is greater than 0
          item.quantity > 0 && // Quantity is greater than 0
          item.totalPrice > 0 // Total price is greater than 0
        );
      });
    },
  },
  created() {
    const self = this;
    self.initialize();
  },
  methods: {
    initialize() {
      const self = this;
      self.getAllCustomers();
      self.getAllProducts();
    },
    onSelectCustomer(item) {
      const self = this;
      self.selectedCustomer = item;

      self.onAddNewRow();
    },
    onAddNewRow() {
      const self = this;
      self.invoicedItems.push(lodashCloneDeep(self.defaultInvoiceItemObj));
    },
    onRemoveRow(index) {
      const self = this;
      self.invoicedItems.splice(index, 1);
    },
    onSelectProduct(itemObj, product) {
      const self = this;
      itemObj.product = product;
      // find product name
      const foundProduct = self.products.find((p) => p._id === product);
      itemObj.costPrice = foundProduct.cost_price;
    },
    getProductList() {
      const self = this;
      return self.products.map((product) => product.name);
    },
    calculateTotal() {
      const self = this;
      return self.invoicedItems.reduce((total, item) => total + item.sellingPrice * item.quantity, 0);
    },
    onSaveInvoice() {
      const self = this;

      const payload = {
        customer: self.selectedCustomer,
        products: self.invoicedItems.map((item) => {
          return {
            selling_price: item.sellingPrice,
            product: item.product,
            quantity: item.quantity,
            total_price: item.sellingPrice * item.quantity,
          };
        }),
        amount: self.calculateTotal(),
        status: "unpaid",
      };

      apiUtilServices
        .postRequest("/invoices", payload)
        .then((res) => {
          if (res.status === "success") {
            self.$toast.open({
              type: "success",
              message: res.message,
            });
            self.$router.push("/invoice");
          }
        })
        .catch((err) => {
          self.$toast.open({
            type: "error",
            message: (err.response && err.response.data && err.response.data.message) || "Internal server error",
          });
        });
    },
    getAllCustomers() {
      const self = this;
      apiUtilServices
        .getRequest("/customers")
        .then((res) => {
          if (res.status === "success") {
            self.customers = (res.data.customers || []).map((customer) => ({
              text: customer.name,
              value: customer._id,
            }));
          }
        })
        .catch((err) => {
          self.$toast.open({
            type: "error",
            message: (err.response && err.response.data && err.response.data.message) || "Internal server error",
          });
        });
    },
    getAllProducts() {
      const self = this;
      apiUtilServices
        .getRequest("/products")
        .then((res) => {
          if (res.status === "success") {
            self.products = res.data || [];
            self.dropdownListOfProduct = (res.data || []).map((product) => {
              return {
                text: product.name,
                value: product._id,
              };
            });
          }
        })
        .catch((err) => {
          self.$toast.open({
            type: "error",
            message: (err.response && err.response.data && err.response.data.message) || "Internal server error",
          });
        });
    },
    resetFormState() {
      const self = this;
      self.selectedCustomer = "";
      self.invoicedItems = [];
    },
  },
  watch: {
    // Watch for changes in each invoiced item's sellingPrice or quantity
    invoicedItems: {
      deep: true, // Watch nested properties
      handler(newItems) {
        newItems.forEach((item) => {
          item.totalPrice = item.sellingPrice * item.quantity; // Update totalPrice
        });
      },
    },
  },
};
</script>
