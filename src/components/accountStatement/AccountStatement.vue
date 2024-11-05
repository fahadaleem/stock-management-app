<template>
  <div class="c-account-statement">
    <c-page-header-for-listing page-title="Account Statement">
      <template v-slot:actions>
        <div class="flex gap-x-2">
          <button class="p-2 rounded border-b-2 font-medium" @click="onDownloadPdf">
            <i class="fa-solid fa-plus"></i>
            Download as PDF
          </button>
        </div>
      </template>
    </c-page-header-for-listing>
    <div class="p-8 c-print-content">
      <div class="w-[60%] mx-auto">
        <div class="flex justify-between gap-x-8">
          <div class="w-full bg-green-300 p-8 rounded">
            <h3 class="text-center text-3xl font-bold mb-4">AED {{ totalIncome }}</h3>
            <h2 class="font-semibold text-2xl text-center">Total Income</h2>
          </div>
          <div class="w-full bg-red-300 p-8 rounded">
            <h3 class="text-center text-3xl font-bold mb-4">AED {{ totalExpense }}</h3>
            <h2 class="font-semibold text-2xl text-center">Total Expense</h2>
          </div>
          <div class="w-full p-8 rounded" :class="{ 'bg-red-300': netBalance < 0, 'bg-teal-300': netBalance > 0 }">
            <h3 class="text-center text-3xl font-bold mb-4">AED {{ netBalance }}</h3>
            <h2 class="font-semibold text-2xl text-center">Net Balance</h2>
          </div>
        </div>
        <hr class="my-4 h-1 bg-slate-300" />
        <div>
          <template v-for="(transaction, index) in transactions" :key="index">
            <div class="flex justify-between items-center my-2 border-b-2 py-2">
              <p class="font-semibold text-white">
                <span
                  ><i
                    class="fa-solid mr-2"
                    :class="{
                      'fa-arrow-down text-red-400': transaction.type === 'expense',
                      'fa-arrow-up text-green-400': transaction.type === 'income',
                    }"
                  ></i
                ></span>
                {{ transaction.description }}
              </p>
              <div>
                <p class="font-semibold">AED {{ transaction.amount }}</p>
                <p class="text-sm font-medium text-right">{{ formatDate(transaction.date) }}</p>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiUtilServices } from "../../services/apiUtilServices";
import PageHeaderForListing from "../PageHeaderForListing.vue";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default {
  name: "c-account-statement",
  components: {
    cPageHeaderForListing: PageHeaderForListing,
  },
  data() {
    const self = this;
    return {
      totalIncome: 0,
      totalExpense: 0,
      transactions: [],
    };
  },
  computed: {
    netBalance() {
      const self = this;
      return self.totalIncome - self.totalExpense;
    },
  },
  created() {
    const self = this;
    self.initialize();
  },
  methods: {
    initialize() {
      const self = this;
      self.getAccountSummary();
    },
    getAccountSummary() {
      const self = this;
      apiUtilServices.getRequest("/accounts").then((res) => {
        if (res.status === "success") {
          self.totalExpense = res.data.total_expense;
          self.totalIncome = res.data.total_income;
          self.transactions = res.data.transactions;
        }
      });
    },
    formatDate(date) {
      return new Date(date).toDateString(); // Format the date as desired
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
