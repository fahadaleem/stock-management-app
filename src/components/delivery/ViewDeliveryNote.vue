<template>
  <div class="c-view-delivery-note bg-white">
    <c-page-header-for-listing page-title="View Delivery Note">
      <template v-slot:actions>
        <div class="flex gap-x-2">
          <button class="p-2 rounded border-b-2 font-medium" @click="onDownloadPdf">
            <i class="fa-solid fa-plus"></i>
            Download as PDF
          </button>
        </div>
      </template>
    </c-page-header-for-listing>
    <div class="p-8 w-[80%] mx-auto c-print-content" v-if="!isLoading">
      <div>
        <img src="../../assets/delivery-note-top.png" class="mb-8" />
      </div>
      <div class="flex justify-between">
        <h2 class="font-bold">
          Issued To: {{ deliveryDetails.customer.name }}
          {{ deliveryDetails.customer.city }}
        </h2>
        <h2 class="font-bold">Date of Issue: {{ formatDate(deliveryDetails.created_at) }}</h2>
      </div>
      <div class="my-4">
        <table class="w-full">
          <thead class="text-gray-700 uppercase">
            <tr>
              <th class="py-4 border-2">Product</th>
              <th class="py-4 border-2">Cost Price</th>
              <th class="py-4 border-2">Selling Price</th>
              <th class="py-4 border-2">Quantity</th>
              <th class="py-4 border-2">Total Price</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="relative"
              :class="{ 'bg-primary': key % 2 == 0 }"
              v-for="(item, key) in deliveryDetails.products"
              :key="key"
            >
              <td class="p-4 text-center">
                {{ item.product.name }}
              </td>
              <td class="p-4 text-center">AED {{ item.product.cost_price }}</td>
              <td class="p-4 text-center">AED {{ item.selling_price }}</td>
              <td class="p-4 text-center">{{ item.quantity }}</td>
              <td class="p-4 text-center">AED {{ item.total_price }}</td>

              <!-- <td class="p-4 text-center">
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
                </td> -->
              <!-- close button -->
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" class="py-2 text-right font-semibold"></td>
              <td class="py-2 text-center font-semibold bg-primary border-2">Total:</td>
              <td class="py-2 text-center font-semibold bg-primary">AED {{ calculateTotal() }}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div>
        <img src="../../assets/delivery-note-bottom.png" class="mt-40 w-full" />
      </div>
    </div>
    <div v-else>
      <h2 class="text-center font-bold text-2xl">Loading...</h2>
    </div>
  </div>
</template>
<script>
import PageHeaderForListing from "../PageHeaderForListing.vue";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { apiUtilServices } from "../../services/apiUtilServices";

export default {
  name: "c-view-delivery-note",
  components: {
    cPageHeaderForListing: PageHeaderForListing,
  },
  data() {
    return {
      deliveryDetails: {},
      isLoading: false,
    };
  },
  created() {
    const self = this;
    self.initialize();
  },
  methods: {
    initialize() {
      const self = this;
      self.getDeliveryNoteDetails();
    },
    getDeliveryNoteDetails() {
      const self = this;
      const deliveryNoteId = self.$route.params.delivery_note_id;
      self.isLoading = true;
      apiUtilServices
        .getRequest(`/deliveries/${deliveryNoteId}`)
        .then((res) => {
          if (res.status === "success") {
            console.log(res.data);
            self.deliveryDetails = res.data;
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
    formatDate(date) {
      return new Date(date).toDateString(); // Format the date as desired
    },
    calculateTotal() {
      const self = this;
      return self.deliveryDetails.products.reduce((total, item) => total + item.selling_price * item.quantity, 0);
    },
    async generatePDF() {
      const self = this;
      const element = document.querySelector(".c-print-content"); // Get the entire page content

      // Convert the element into canvas
      html2canvas(element).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");

        const imgWidth = 210;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // If content overflows multiple pages
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        // Save the PDF
        pdf.save("delivery.pdf");
      });
    },
    onDownloadPdf() {
      const self = this;
      self.generatePDF();
    },
  },
};
</script>
