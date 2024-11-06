<template>
  <div class="c-product-listing">
    <c-page-header-for-listing page-title="Products"></c-page-header-for-listing>
    <div class="p-8">
      <!-- TODO -->
      <!-- <div>
        <input type="text" class="w-full p-2 rounded border-2 font-medium" required placeholder="Search" />
      </div> -->
      <div class="my-4">
        <table class="w-full border-2 rounded">
          <thead class="text-gray-800 uppercase bg-primary">
            <tr>
              <th class="px-6 py-3 font-medium text-gray-900 text-left">Id</th>
              <th class="px-6 py-3 font-medium text-gray-900 text-left">Name</th>
              <th class="px-6 py-3 font-medium text-gray-900 text-left">Cost Price</th>
              <th class="px-6 py-3 font-medium text-gray-900 text-left">Min. Market Value</th>
              <th class="px-6 py-3 font-medium text-gray-900 text-left">Available Quantity</th>
              <th class="px-6 py-3 font-medium text-gray-900 text-left">Purchase Date</th>
              <th class="px-6 py-3 font-medium text-gray-900 text-left"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in products" :key="index">
              <td class="px-6 py-4 font-medium text-gray-900 text-left text-white">
                {{ index + 1 }}
              </td>
              <td class="px-6 py-4 font-medium text-gray-900 text-left text-white">
                {{ product.name || "-" }}
              </td>
              <td class="px-6 py-4 font-medium text-gray-900 text-left text-white">
                {{ product.cost_price }}
              </td>
              <td class="px-6 py-4 font-medium text-gray-900 text-left text-white">
                {{ product.min_market_value }}
              </td>
              <td class="px-6 py-4 font-medium text-gray-900 text-left text-white">
                {{ product.quantity }}
              </td>
              <td class="px-6 py-4 font-medium text-gray-900 text-left text-white">
                {{ (product.purchase_date && getFormattedDate(product.purchase_date)) || "-" }}
              </td>
              <td class="py-4 font-medium text-gray-900">
                <!-- <button class="text-xl">
                  <i class="fa-regular fa-eye"></i>
                </button> -->
                <button class="mx-2 text-xl text-white" @click="onDeleteProduct(product._id)">
                  <i class="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- <h2 class="text-center font-semibold p-4" v-if="!invoices.length">No data available</h2> -->
      </div>
    </div>
  </div>
</template>
<script>
import { apiUtilServices } from "../../services/apiUtilServices";

import PageHeaderForListing from "../PageHeaderForListing.vue";
import GridActions from "../GridActions.vue";

export default {
  name: "c-product-listing",
  components: {
    cPageHeaderForListing: PageHeaderForListing,
    cGridActions: GridActions,
  },
  data() {
    return {
      products: [],
      isLoading: false,
      gridActions: [
        {
          text: "Delete",
          handler: () => console.log("View"),
        },
      ],
    };
  },
  created() {
    const self = this;
    self.initialize();
  },
  methods: {
    initialize() {
      const self = this;
      self.getAllProducts();
    },
    getAllProducts() {
      const self = this;
      self.isLoading = true;
      apiUtilServices
        .getRequest("/products")
        .then((res) => {
          if (res.status === "success") {
            self.products = res.data;
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
    onDeleteProduct(id) {
      const self = this;
      apiUtilServices
        .deleteRequest(`/products/${id}`)
        .then((res) => {
          if (res.status === "success") {
            self.$toast.open({
              type: "success",
              message: res.message,
            });
            self.getAllProducts();
          }
        })
        .catch((err) => {
          self.$toast.open({
            type: "error",
            message: (err.response && err.response.data && err.response.data.message) || "Internal server error",
          });
        });
    },
    getFormattedDate(date) {
      date = new Date(date);
      // Format the date as YYYY-MM-DD
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${day}-${month}-${year}`;
    },
  },
};
</script>
