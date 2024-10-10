import { createRouter, createWebHistory } from "vue-router";

import Invoice from "./pages/InvoiceView.vue";
import LoginView from "./pages/LoginView.vue";
import DashboardView from "./pages/DashboardView.vue";
import StockPurchaseView from "./pages/StockPurchaseView.vue";
import RegisterExpenseView from "./pages/RegisterExpenseView.vue";
import CustomerDatabaseView from "./pages/CustomerDatabaseView.vue";
import InvoiceListing from "./components/invoice/InvoiceListing.vue";
import ProductListing from "./components/products/ProductListing.vue";
import CreateDeliveryView from "./pages/CreateDeliveryView.vue";
import DeliveryListingView from "./pages/DeliveryListingView.vue";

import AddNewCustomer from "./components/customerDatabase/AddNewCustomer.vue";

const routes = [
  { path: "/", component: DashboardView },
  { path: "/login", component: LoginView },
  { path: "/invoice/create", component: Invoice },
  { path: "/invoice", component: InvoiceListing },
  { path: "/stock-purchase", component: StockPurchaseView },
  { path: "/register-expense", component: RegisterExpenseView },
  { path: "/customer-database", component: CustomerDatabaseView },
  { path: "/products", component: ProductListing },
  { path: "/delivery/create", component: CreateDeliveryView },
  { path: "/delivery", component: DeliveryListingView },
  { path: "/customer-database/create", component: AddNewCustomer },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
