<template>
  <div class="c-delivery-listing">
    <c-page-header-for-listing page-title="Delivery Notes">
      <template v-slot:actions>
        <div class="flex gap-x-2">
          <button class="p-2 rounded border-b-2 font-medium" @click="onClickCreateDelivery">
            <i class="fa-solid fa-plus"></i>
            Create Delivery
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
      <!-- TODO -->
      <!-- <div>
        <input
          type="text"
          class="w-full p-2 rounded border-2 font-medium"
          required
          placeholder="Search by invoice id"
        />
      </div> -->
      <div class="my-4">
        <table class="w-full border-2 rounded">
          <thead class="text-gray-700 uppercase bg-primary">
            <tr>
              <th class="px-6 py-3 font-medium text-gray-900 text-left">S.No</th>
              <th class="px-6 py-3 font-medium text-gray-900 text-left">Customer Name</th>
              <th class="px-6 py-3 font-medium text-gray-900 text-left">Amount</th>
              <th class="px-6 py-3 font-medium text-gray-900 text-left">Created At</th>
              <th class="px-6 py-3 font-medium text-gray-900 text-left"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(delivery, index) in deliveries" :key="index">
              <td class="px-6 py-4 font-medium text-gray-900 text-left text-white">
                {{ index + 1 }}
              </td>
              <td class="px-6 py-4 font-medium text-gray-900 text-left text-white">
                {{ (delivery.customer && delivery.customer.name) || "-" }}
              </td>
              <td class="px-6 py-4 font-medium text-gray-900 text-left text-white">
                {{ delivery.amount }}
              </td>
              <td class="px-6 py-4 font-medium text-gray-900 text-left text-white">
                {{ formatDate(delivery.created_at) }}
              </td>
              <td class="py-4 font-medium text-gray-900 w-4">
                <c-grid-actions :actions="getGridActions(delivery)"></c-grid-actions>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import { apiUtilServices } from "../../services/apiUtilServices";
import PageHeaderForListing from "../PageHeaderForListing.vue";
import GridActions from "../GridActions.vue";

export default {
  name: "c-delivery-listing",
  components: {
    cPageHeaderForListing: PageHeaderForListing,
    cGridActions: GridActions,
  },
  data() {
    return {
      deliveries: [],
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
      self.getDeliveryNotesList();
    },
    getDeliveryNotesList() {
      const self = this;
      apiUtilServices
        .getRequest("/deliveries")
        .then((response) => {
          if (response.status === "success") {
            self.deliveries = response.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onClickCreateDelivery() {
      const self = this;
      self.$router.push("/delivery/create");
    },
    formatDate(date) {
      return new Date(date).toDateString(); // Format the date as desired
    },
    getGridActions(delivery) {
      const self = this;
      return [
        {
          text: "Delete",
          handler: () => self.onDelete(delivery),
        },
        {
          text: "View",
          handler: () => self.onViewDeliveryNote(delivery),
        },
      ];
    },
    onViewDeliveryNote(delivery) {
      const self = this;
      self.$router.push(`/delivery/${delivery._id}`);
    },
  },
};
</script>
