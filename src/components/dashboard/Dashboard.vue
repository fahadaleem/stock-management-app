<template>
  <div class="c-dashboard flex flex-col justify-center h-screen">
    <div class="p-8 grid grid-cols-4 gap-4 justify-between items-center gap-4">
      <div class="rounded bg-primary py-8">
        <router-link to="/register-expense" class="flex flex-col justify-center items-center w-full">
          <i class="fa-solid fa-dollar-sign text-3xl text-white my-2"></i>
          <h2 class="font-semibold text-xl text-white">
            <span>Register an Expense</span>
          </h2>
        </router-link>
      </div>

      <div class="rounded bg-primary py-8 flex flex-col justify-center items-center">
        <router-link to="/invoice" class="flex flex-col justify-center items-center w-full">
          <i class="fa-solid fa-file-invoice text-3xl text-white my-2"></i>
          <h2 class="font-semibold text-xl text-white">
            <span>Invoice</span>
          </h2>
        </router-link>
      </div>
      <div class="rounded bg-primary py-8 flex flex-col justify-center items-center">
        <router-link to="/stock-purchase" class="flex flex-col justify-center items-center w-full">
          <i class="fa-solid fa-file-invoice text-3xl text-white my-2"></i>
          <h2 class="font-semibold text-xl text-white">
            <span>Stock Purchase</span>
          </h2>
        </router-link>
      </div>
      <div class="rounded bg-primary py-8 flex flex-col justify-center items-center">
        <router-link to="/customer-database" class="flex flex-col justify-center items-center w-full">
          <i class="fa-solid fa-users text-3xl text-white my-2"></i>
          <h2 class="font-semibold text-xl text-white">
            <span>Customer Database</span>
          </h2>
        </router-link>
      </div>
      <div class="rounded bg-primary py-8 flex flex-col justify-center items-center">
        <router-link to="/products" class="flex flex-col justify-center items-center w-full">
          <i class="fa-solid fa-box text-3xl text-white my-2"></i>
          <h2 class="font-semibold text-xl text-white">
            <span>Products</span>
          </h2>
        </router-link>
      </div>
      <div class="rounded bg-primary py-8 flex flex-col justify-center items-center">
        <router-link to="/delivery" class="flex flex-col justify-center items-center w-full">
          <i class="fa-solid fa-box text-3xl text-white my-2"></i>
          <h2 class="font-semibold text-xl text-white">
            <span>Delivery Note</span>
          </h2>
        </router-link>
      </div>
      <div class="rounded bg-primary py-8 flex flex-col justify-center items-center">
        <router-link to="/account-statement" class="flex flex-col justify-center items-center w-full">
          <i class="fa-solid fa-box text-3xl text-white my-2"></i>
          <h2 class="font-semibold text-xl text-white">
            <span>Account Summary</span>
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
