<template>
  <div class="c-dashboard flex flex-col justify-center h-screen">
    <div class="p-8 grid grid-cols-4 gap-4 justify-between items-center gap-4">
      <div class="rounded bg-red-400 py-8 hover:bg-red-500">
        <router-link to="/register-expense" class="flex flex-col justify-center items-center w-full">
          <i class="fa-solid fa-dollar-sign text-3xl text-white my-2"></i>
          <h2 class="font-semibold text-xl text-white">
            <span>Register an Expense</span>
          </h2>
        </router-link>
      </div>

      <div class="rounded bg-slate-400 py-8 flex flex-col justify-center items-center hover:bg-slate-500">
        <router-link to="/invoice" class="flex flex-col justify-center items-center w-full">
          <i class="fa-solid fa-file-invoice text-3xl text-white my-2"></i>
          <h2 class="font-semibold text-xl text-white">
            <span>Invoice</span>
          </h2>
        </router-link>
      </div>
      <div class="rounded bg-lime-400 hover:bg-lime-500 py-8 flex flex-col justify-center items-center">
        <router-link to="/stock-purchase" class="flex flex-col justify-center items-center w-full">
          <i class="fa-solid fa-file-invoice text-3xl text-white my-2"></i>
          <h2 class="font-semibold text-xl text-white">
            <span>Stock Purchase</span>
          </h2>
        </router-link>
      </div>
      <div class="rounded bg-green-400 hover:bg-green-500 py-8 flex flex-col justify-center items-center">
        <router-link to="/customer-database" class="flex flex-col justify-center items-center w-full">
          <i class="fa-solid fa-users text-3xl text-white my-2"></i>
          <h2 class="font-semibold text-xl text-white">
            <span>Customer Database</span>
          </h2>
        </router-link>
      </div>
      <div class="rounded bg-cyan-400 hover:bg-cyan-500 py-8 flex flex-col justify-center items-center">
        <router-link to="/products" class="flex flex-col justify-center items-center w-full">
          <i class="fa-solid fa-box text-3xl text-white my-2"></i>
          <h2 class="font-semibold text-xl text-white">
            <span>Products</span>
          </h2>
        </router-link>
      </div>
      <div class="rounded bg-orange-400 hover:bg-orange-500 py-8 flex flex-col justify-center items-center">
        <router-link to="/delivery" class="flex flex-col justify-center items-center w-full">
          <i class="fa-solid fa-box text-3xl text-white my-2"></i>
          <h2 class="font-semibold text-xl text-white">
            <span>Delivery Note</span>
          </h2>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "c-dashboard",
  methods: {},
};
</script>
