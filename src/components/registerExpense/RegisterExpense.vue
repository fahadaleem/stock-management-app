<template>
  <div class="c-register-expense">
    <c-page-header
      page-name="Register Expense"
      :is-valid="isFormValid"
      :is-loading="isLoading"
      @onSave="onSave"
    ></c-page-header>
    <div class="w-[50%] my-16 flex flex-col justify-center mx-auto">
      <div class="p-4 h-full">
        <div class="flex flex-col gap-y-4">
          <div>
            <h2 class="font-semibold text-xl grow">Date of Expense</h2>
            <input
              type="date"
              v-model="dateOfExpense"
              class="w-full my-2 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
            />
          </div>
          <div class="">
            <h2 class="font-semibold text-xl grow">Date of Entry</h2>
            <input
              type="date"
              v-model="dateOfEntry"
              class="w-full my-2 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
            />
          </div>
          <div>
            <h2 class="font-semibold text-xl grow">Expense Amount</h2>
            <input
              type="number"
              v-model="expenseAmount"
              placeholder="0"
              min="0"
              class="w-full my-2 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
            />
          </div>
          <div>
            <h2 class="font-semibold text-xl grow">Expense Reason</h2>
            <input
              type="text"
              v-model="expenseReason"
              class="w-full my-2 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
            />
            <!-- <textarea
              rows="5"
              class="w-80 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
            /> -->
          </div>
          <div>
            <h2 class="font-semibold text-xl">Additional Info</h2>
            <textarea
              rows="5"
              v-model="additionalInfo"
              class="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
            />
          </div>
          <div>
            <h2 class="font-semibold text-xl grow">Add Supported Documents</h2>
            <c-file-uploader @onChangeSupportedDocs="onChangeSupportedDocs"></c-file-uploader>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PageHeader from "../PageHeader.vue";
import FileUploader from "../FileUploader.vue";
import { apiUtilServices } from "../../services/apiUtilServices";
export default {
  name: "c-register-expense",
  components: {
    cPageHeader: PageHeader,
    cFileUploader: FileUploader,
  },
  data() {
    const self = this;
    return {
      dateOfExpense: null,
      dateOfEntry: self.getFormattedDate(new Date()),
      expenseAmount: 0,
      expenseReason: "",
      additionalInfo: "",
      supportedDocuments: [],
      isLoading: false,
    };
  },
  computed: {
    isFormValid() {
      const self = this;
      return !!(self.dateOfExpense && self.expenseAmount && self.expenseReason);
    },
  },
  methods: {
    onChangeSupportedDocs(files) {
      const self = this;
      self.supportedDocuments = [...files];
    },
    getFormattedDate(date) {
      // Format the date as YYYY-MM-DD
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    async onSave() {
      const self = this;
      let documentUrls = [];
      self.isLoading = true;
      if (self.supportedDocuments.length) {
        const promises = [];
        self.supportedDocuments.forEach((document) => {
          promises.push(apiUtilServices.uploadFileRequest(document));
        });

        documentUrls = await Promise.all(promises);
      }

      // integrate an API to upload files and then save the url in the database
      const payload = {
        expense_date: self.dateOfExpense,
        entry_date: self.dateOfEntry,
        amount: self.expenseAmount,
        reason: self.expenseReason,
        additional_info: self.additionalInfo,
        supported_documents: documentUrls, // change with actual url
      };

      apiUtilServices
        .postRequest("/expenses", payload)
        .then((res) => {
          if (res.status === "success") {
            self.$toast.open({
              type: "success",
              message: res.message,
            });
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
  },
};
</script>
