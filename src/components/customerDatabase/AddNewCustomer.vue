<template>
  <div class="c-add-new-customer">
    <c-page-header
      page-name="Add new customer"
      @onSave="onSubmit"
      :is-valid="isFormValid"
      :is-loading="isLoading"
    ></c-page-header>
    <div class="w-[50%] mx-auto">
      <form class="flex flex-col gap-y-4 my-8">
        <div>
          <h2 class="mb-2 text-white">Name</h2>
          <input
            type="text"
            v-model="name"
            placeholder="Enter name of customer"
            class="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
          />
        </div>
        <div>
          <h2 class="mb-2 text-white">Email</h2>
          <input
            type="email"
            v-model="email"
            placeholder="john.doe@gmail.com"
            class="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
          />
        </div>
        <div>
          <h2 class="mb-2 text-white">Phone No.</h2>
          <input
            type="text"
            v-model="phoneNo"
            placeholder="+97127777182"
            class="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
          />
        </div>
        <div>
          <h2 class="mb-2 text-white">Company Registeration Number.</h2>
          <input
            type="text"
            placeholder=""
            v-model="customerRegisterationNo"
            class="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
          />
        </div>
        <div>
          <h2 class="mb-2 text-white">City</h2>
          <input
            type="text"
            placeholder="Enter city name"
            v-model="city"
            class="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
          />
        </div>
        <div>
          <h2 class="mb-2 text-white">Address</h2>
          <textarea
            v-model="address"
            class="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
          />
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import PageHeader from "../PageHeader.vue";

import { apiUtilServices } from "../../services/apiUtilServices";
import { appConstantService } from "../../services/appConstantsService";
export default {
  name: "c-add-new-customer",
  components: {
    cPageHeader: PageHeader,
  },
  data() {
    return {
      cities: appConstantService.cities,
      name: "",
      email: "",
      phoneNo: "",
      customerRegisterationNo: "",
      city: "",
      address: "",
      isLoading: false,
    };
  },
  computed: {
    isFormValid() {
      const self = this;
      return !!(self.name && self.email && self.phoneNo && self.city && self.address);
    },
  },
  methods: {
    onSubmit() {
      const self = this;
      const payload = {
        name: self.name,
        email: self.email,
        phone_no: self.phoneNo,
        customer_registeration_number: self.customerRegisterationNo,
        city: self.city,
        address: self.address,
      };
      self.isLoading = true;
      apiUtilServices
        .postRequest("/customers", payload)
        .then((res) => {
          if (res.status === "success") {
            self.$toast.open({
              message: res.message,
              type: "success",
              position: "top-right",
            });
            self.$router.push("/customer-database");
          }
        })
        .catch((err) => {
          self.$toast.open({
            message: (err.response && err.response.data && err.response.data.message) || "Internal server error",
            type: "error",
            position: "top-right",
          });
        })
        .finally(() => {
          self.isLoading = false;
        });
    },
  },
};
</script>
