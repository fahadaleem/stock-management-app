<template>
  <table class="w-full border-2 rounded">
    <thead class="text-gray-700 uppercase bg-gray-200">
      <tr>
        <th
          class="px-6 py-3 font-medium text-gray-900 text-left"
          v-for="column in gridModel.gridColumns"
          :key="column.name"
        >
          {{ column.name }}
        </th>
        <!-- <th class="px-6 py-3 font-medium text-gray-900 text-left">Name</th>
        <th class="px-6 py-3 font-medium text-gray-900 text-left">Email</th>
        <th class="px-6 py-3 font-medium text-gray-900 text-left">Phone No.</th>
        <th class="px-6 py-3 font-medium text-gray-900 text-left">City</th>
        <th class="px-6 py-3 font-medium text-gray-900 text-left">Actions</th> -->
      </tr>
    </thead>
    <tbody>
      <tr v-for="(customer, index) in customers" :key="customer.email">
        <td class="px-6 py-4 font-medium text-gray-900 text-left">
          {{ index + 1 }}
        </td>
        <td class="px-6 py-4 font-medium text-gray-900 text-left">
          {{ customer.name }}
        </td>
        <td class="px-6 py-4 font-medium text-gray-900 text-left">
          {{ customer.email }}
        </td>
        <td class="px-6 py-4 font-medium text-gray-900 text-left">
          {{ customer.phone_no }}
        </td>
        <td class="px-6 py-4 font-medium text-gray-900 text-left">
          {{ customer.city }}
        </td>
        <td class="px-6 py-4 font-medium text-gray-900">
          <button class="text-xl">
            <i class="fa-regular fa-eye"></i>
          </button>
          <button class="mx-2 text-xl">
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "c-data-grid",
  props: {
    gridModel: Object,
  },
};
</script>
