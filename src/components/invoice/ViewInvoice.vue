<template>
  <div class="c-view-delivery-note bg-white">
    <c-page-header-for-listing page-title="View Invoice">
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
        <img src="../../assets/invoice-nav.png" />
      </div>
      <div class="flex justify-between">
        <h2 class="font-bold">
          Issued To: {{ invoiceDetails.customer.name }}
          {{ invoiceDetails.customer.city }}
        </h2>
        <h2 class="font-bold">Date of Issue: {{ formatDate(invoiceDetails.created_at) }}</h2>
      </div>
      <div class="my-4">
        <table class="w-full">
          <thead class="uppercase">
            <tr>
              <th class="py-2 border-2">Product</th>
              <th class="py-2 border-2">Cost Price</th>
              <th class="py-2 border-2">Selling Price</th>
              <th class="py-2 border-2">Quantity</th>
              <th class="py-2 border-2">Total Price</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="relative"
              v-for="(item, key) in invoiceDetails.products"
              :key="key"
              :class="{ 'bg-primary': key % 2 == 0 }"
            >
              <td class="p-2 text-center font-semibold">
                {{ item.product.name }}
              </td>
              <td class="p-2 text-center font-semibold">AED {{ item.product.cost_price }}</td>
              <td class="p-2 text-center font-semibold">AED {{ item.selling_price }}</td>
              <td class="p-3 text-center font-semibold">{{ item.quantity }}</td>
              <td class="p-2 text-center font-semibold">AED {{ item.total_price }}</td>

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
        <img src="../../assets/invoice-bottom.png" class="w-full mt-40" />
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
      invoiceDetails: {
        _id: "67099ba54386b7584a758c9f",
        customer: {
          _id: "670023804082f56a401cbb87",
          name: "Umer",
          phone_no: "03163137902",
          email: "umer2010@gmail.com",
          id_no: "0377171727351623621",
          city: "Sharjah",
          address: "Dubai",
          __v: 0,
        },
        amount: 88000,
        status: "unpaid",
        products: [
          {
            product: {
              _id: "6700def9e60fbd872068fd9a",
              name: "Charger 2",
              cost_price: 180,
              quantity: 80,
              min_market_value: 200,
              __v: 0,
            },
            selling_price: 400,
            quantity: 20,
            total_price: 8000,
            _id: "67099ba54386b7584a758ca0",
          },
          {
            product: {
              _id: "67018547c3d975977c087b59",
              name: "Earbuds",
              cost_price: 2000,
              quantity: 40,
              min_market_value: 20,
              __v: 0,
            },
            selling_price: 40000,
            quantity: 2,
            total_price: 80000,
            _id: "67099ba54386b7584a758ca1",
          },
        ],
        created_at: "2024-10-11T21:41:57.032Z",
        __v: 0,
      },
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
      self.getInvoiceDetails();
    },
    getInvoiceDetails() {
      const self = this;
      const invoiceId = self.$route.params.invoice_id;
      self.isLoading = true;
      apiUtilServices
        .getRequest(`/invoices/${invoiceId}`)
        .then((res) => {
          if (res.status === "success") {
            self.invoiceDetails = res.data;
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
      return self.invoiceDetails.products.reduce((total, item) => total + item.selling_price * item.quantity, 0);
    },
    // async generatePDF() {
    //   const self = this;
    //   const element = document.querySelector(".c-print-content"); // Get the entire page content

    //   // Convert the element into canvas
    //   html2canvas(element).then((canvas) => {
    //     const imgData = canvas.toDataURL("image/png");
    //     const pdf = new jsPDF("p", "mm", "a4");

    //     const imgWidth = 210;
    //     const pageHeight = 300;
    //     const imgHeight = (canvas.height * imgWidth) / canvas.width;
    //     let heightLeft = imgHeight;
    //     let position = 0;

    //     pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    //     heightLeft -= pageHeight;

    //     // If content overflows multiple pages
    //     while (heightLeft >= 0) {
    //       position = heightLeft - imgHeight;
    //       pdf.addPage();
    //       pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    //       heightLeft -= pageHeight;
    //     }

    //     // Save the PDF
    //     pdf.save("delivery.pdf");
    //   });
    // },
    async generatePDF() {
      const element = document.querySelector(".c-print-content"); // Get the main content area for PDF

      // Convert the element into a higher-resolution canvas
      html2canvas(element, {
        scale: 2, // Increase scale for better quality
        useCORS: true, // Allows images from other domains if necessary
      }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");

        const imgWidth = 210; // A4 page width in mm
        const pageHeight = 297; // A4 page height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // Add pages if the content overflows
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        // Save the PDF
        pdf.save("invoice.pdf");
      });
    },

    onDownloadPdf() {
      const self = this;
      self.generatePDF();
    },
  },
};
</script>
