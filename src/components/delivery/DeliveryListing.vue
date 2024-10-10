<template>
  <div class="c-delivery-listing">
    <c-page-header-for-listing page-title="Delivery Notes">
      <template v-slot:actions>
        <div class="flex gap-x-2">
          <button class="p-2 rounded border-b-2 font-medium">
            <i class="fa-solid fa-plus"></i>
            Create Delivery
          </button>
          <button class="p-2 rounded border-b-2 font-medium">
            <i class="fa-solid fa-download"></i>
            Export as CSV
          </button>
        </div>
      </template>
    </c-page-header-for-listing>
    <div class="p-8">
      <div>
        <input
          type="text"
          class="w-full p-2 rounded border-2 font-medium"
          required
          placeholder="Search by invoice id"
        />
      </div>
      <div class="my-4">
        <table class="w-full border-2 rounded">
          <thead class="text-gray-700 uppercase bg-gray-200">
            <tr>
              <th class="px-6 py-3 font-medium text-gray-900 text-left">S.No</th>
              <th class="px-6 py-3 font-medium text-gray-900 text-left">Customer Name</th>
              <th class="px-6 py-3 font-medium text-gray-900 text-left">Amount</th>
              <th class="px-6 py-3 font-medium text-gray-900 text-left">Created At</th>
              <th class="px-6 py-3 font-medium text-gray-900 text-left"></th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import PageHeaderForListing from "../PageHeaderForListing.vue";

export default {
  name: "c-delivery-listing",
  components: {
    cPageHeaderForListing: PageHeaderForListing,
  },
};
</script>
