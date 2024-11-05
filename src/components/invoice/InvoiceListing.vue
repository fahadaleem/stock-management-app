<template>
  <div class="c-invoice-listing">
    <c-page-header-for-listing page-Title="Invoices">
      <template v-slot:actions>
        <div class="flex gap-x-2">
          <button class="p-2 rounded border-b-2 border-slate-700 font-medium" @click="onClickAddNewInvoice">
            <i class="fa-solid fa-plus"></i>
            Create Invoice
          </button>
          <!-- TODO: will add it later -->
          <!-- <button class="p-2 rounded border-b-2 font-medium">
            <i class="fa-solid fa-download"></i>
            Export as CSV
          </button> -->
        </div>
      </template>
    </c-page-header-for-listing>

    <div class="p-8">
      <div>
        <!-- TODO: Will implement later -->
        <!-- <input
          type="text"
          class="w-full p-2 rounded border-2 font-medium"
          required
          placeholder="Search by invoice id"
        /> -->
      </div>
      <div class="my-4">
        <table class="w-full border-2 rounded">
          <thead class="text-gray-700 uppercase bg-gray-200">
            <tr>
              <th class="px-6 py-3 font-medium text-gray-900 text-left">Id</th>
              <th class="px-6 py-3 font-medium text-gray-900 text-left">Customer Name</th>
              <th class="px-6 py-3 font-medium text-gray-900 text-left">Invoice Amount</th>
              <th class="px-6 py-3 font-medium text-gray-900 text-left">Created At</th>
              <th class="px-6 py-3 font-medium text-gray-900 text-left">Status</th>
              <th class="px-6 py-3 font-medium text-gray-900 text-left"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(invoice, index) in invoices" :key="index">
              <td class="px-6 py-4 font-medium text-gray-900 text-left text-white">
                {{ index + 1 }}
              </td>
              <td class="px-6 py-4 font-medium text-gray-900 text-left text-white">
                {{ (invoice.customer && invoice.customer.name) || "-" }}
              </td>
              <td class="px-6 py-4 font-medium text-gray-900 text-left text-white">
                {{ invoice.amount }}
              </td>
              <td class="px-6 py-4 font-medium text-gray-900 text-left text-white">
                {{ formatDate(invoice.created_at) }}
              </td>
              <td class="px-6 py-4 font-medium text-gray-900 text-left text-white">
                {{ invoice.status }}
              </td>
              <td class="py-4 font-medium text-gray-900 w-4">
                <c-grid-actions :actions="getGridActions(invoice)"></c-grid-actions>
              </td>
            </tr>
          </tbody>
        </table>
        <h2 class="text-center font-semibold p-4" v-if="!invoices.length">No data available</h2>
      </div>
    </div>
  </div>
</template>
<script>
import PageHeaderForListing from "../PageHeaderForListing.vue";
import GridActions from "../GridActions.vue";
import { apiUtilServices } from "../../services/apiUtilServices";

export default {
  name: "c-invoice-listing",
  components: {
    cPageHeaderForListing: PageHeaderForListing,
    cGridActions: GridActions,
  },
  data() {
    return {
      invoices: [],
      gridActions: [
        {
          text: "Delete",
          handler: () => console.log("delete"),
        },
        {
          text: "View",
          handler: () => console.log("delete"),
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
      self.getAllInvoices();
    },
    getAllInvoices() {
      const self = this;
      apiUtilServices.getRequest("/invoices").then((res) => {
        if ((res.status = "success")) {
          self.invoices = res.data || [];
        }
      });
    },
    formatDate(date) {
      return new Date(date).toDateString(); // Format the date as desired
    },
    onClickAddNewInvoice() {
      const self = this;
      self.$router.push("/invoice/create");
    },
    getGridActions(invoice) {
      const self = this;
      return [
        {
          text: invoice.status === "unpaid" ? "Mark as Paid" : "Mark as Unpaid",
          handler: () => self.onChangeInvoiceStatus(invoice, "paid"),
        },
        {
          text: "Delete",
          handler: () => self.onDelete(invoice),
        },
        {
          text: "View",
          handler: () => self.onViewInvoiceDetails(invoice),
        },
      ];
    },
    onDelete(invoice) {
      const self = this;
      apiUtilServices
        .deleteRequest(`/invoices/${invoice._id}`)
        .then((res) => {
          if (res.status === "success") {
            self.getAllInvoices();
            self.$toast.open({
              type: "success",
              message: res.message,
            });
          }
        })
        .catch((err) => {
          self.$toast.open({
            type: "error",
            message: (err.response && err.response.data && err.response.data.message) || "Internal server error.",
          });
        });
    },
    onViewInvoiceDetails(invoice) {
      const self = this;
      self.$router.push(`/invoice/${invoice._id}`);
    },
    onChangeInvoiceStatus(invoice, status) {
      const self = this;
      const payload = {
        ...invoice,
        status,
      };

      apiUtilServices
        .putRequest(`/invoices/${invoice._id}`, payload)
        .then((res) => {
          if (res.status === "success") {
            self.$toast.open({
              type: "success",
              message: res.message,
            });
            self.getAllInvoices();
          }
        })
        .catch((err) => {
          self.$toast.open({
            type: "error",
            message: (err.response && err.response.data && err.response.data.message) || "Internal server error.",
          });
        });
    },
  },
};
</script>
