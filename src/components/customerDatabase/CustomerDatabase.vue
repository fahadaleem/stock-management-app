<template>
  <div class="c-customer-database">
    <!-- header -->
    <c-page-header-for-listing page-title="Customer Database">
      <template v-slot:actions>
        <div class="flex gap-x-2">
          <button class="p-2 rounded border-b-2 font-medium" @click="onClickAddNewCustomer">
            <i class="fa-solid fa-plus"></i>
            Add new customer
          </button>
        </div>
      </template>
    </c-page-header-for-listing>

    <!-- table -->
    <div class="p-8">
      <!-- TODO -->
      <!-- <div>
        <input type="text" class="w-full p-2 rounded border-2 font-medium" required placeholder="Search customer" />
      </div> -->
      <div class="my-4 border-2 rounded">
        <table class="w-full">
          <thead class="text-gray-700 uppercase bg-primary">
            <tr>
              <th class="px-6 py-3 font-medium text-gray-900 text-left">S.NO</th>
              <th class="px-6 py-3 font-medium text-gray-900 text-left">Name</th>
              <th class="px-6 py-3 font-medium text-gray-900 text-left">Email</th>
              <th class="px-6 py-3 font-medium text-gray-900 text-left">Phone No.</th>
              <th class="px-6 py-3 font-medium text-gray-900 text-left">City</th>
              <th class="px-6 py-3 font-medium text-gray-900 text-left">Company Reg No.</th>
              <th class="px-6 py-3 font-medium text-gray-900 text-left">Address</th>
              <th class="px-6 py-3 font-medium text-gray-900 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(customer, index) in customers" :key="customer.email">
              <td class="px-6 py-4 font-medium text-white text-left">
                {{ (currentPage - 1) * ITEMS_PER_PAGE + index + 1 }}
              </td>
              <td class="px-6 py-4 font-medium text-white text-left">
                {{ customer.name }}
              </td>
              <td class="px-6 py-4 font-medium text-white text-left">
                {{ customer.email }}
              </td>
              <td class="px-6 py-4 font-medium text-white text-left">
                {{ customer.phone_no }}
              </td>
              <td class="px-6 py-4 font-medium text-white text-left">
                {{ customer.city || "-" }}
              </td>
              <td class="px-6 py-4 font-medium text-white text-left">
                {{ customer.customer_registeration_number || "-" }}
              </td>
              <td class="px-6 py-4 font-medium text-white text-left">
                {{ customer.address || "-" }}
              </td>
              <td class="px-6 py-4 font-medium text-white">
                <button class="mx-2 text-xl" @click="onDeleteCustomer(customer._id)">
                  <i class="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <c-pagination
          @onUpdatePage="onGridPageChange"
          :current-page="currentPage"
          :total-pages="totalPages"
        ></c-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { apiUtilServices } from "../../services/apiUtilServices";

import Pagination from "../dataGrid.vue/Pagination.vue";
import PageHeaderForListing from "../PageHeaderForListing.vue";
export default {
  name: "c-customer-database",
  components: {
    cPagination: Pagination,
    cPageHeaderForListing: PageHeaderForListing,
  },
  data() {
    return {
      customers: [],
      isLoading: true,
      totalPages: 0,
      currentPage: 1,
      ITEMS_PER_PAGE: 10,
    };
  },
  created() {
    const self = this;
    self.initialize();
  },
  methods: {
    initialize() {
      const self = this;
      self.getListOfCustomers();
    },
    getListOfCustomers() {
      const self = this;
      self.isLoading = true;
      apiUtilServices
        .getRequest(`/customers?page=${self.currentPage}&limit=${self.ITEMS_PER_PAGE}`)
        .then((res) => {
          if (res.status === "success") {
            self.customers = res.data.customers || [];
            self.totalPages = res.data.total_pages;
            self.currentPage = res.data.current_page;
          }
        })
        .catch((err) => {
          self.$toast.open({
            message: (err.response && err.response.data && err.response.data.message) || "Internal server error",
            type: "error",
          });
        })
        .finally(() => {
          //   self.isLoading = false;
        });
    },
    onDeleteCustomer(id) {
      const self = this;
      apiUtilServices
        .deleteRequest(`/customers/${id}`)
        .then((res) => {
          if (res.status === "success") {
            self.$toast.open({
              message: res.message,
              type: "success",
            });
            self.getListOfCustomers();
          }
        })
        .catch((err) => {
          self.$toast.open({
            message: (err.response && err.response.data && err.response.data.message) || "Internal server error",
            type: "error",
          });
        });
    },
    onClickAddNewCustomer() {
      const self = this;
      self.$router.push("/customer-database/create");
    },
    onGridPageChange(pageNo) {
      const self = this;
      self.currentPage = pageNo;
      console.log("testing");
      self.getListOfCustomers();
    },
  },
};
</script>
<style></style>
