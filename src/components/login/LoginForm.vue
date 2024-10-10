<template>
  <div class="c-login bg-[#edf6f9] h-screen flex flex-col justify-center">
    <h2 class="text-center font-bold text-3xl mb-8">Stock Management App</h2>
    <div class="w-[40%] p-8 mx-auto bg-[#5fa8d3]">
      <form @submit="onSubmit">
        <div class="flex flex-col gap-y-5">
          <h2 class="text-center text-3xl font-bold text-white">Login Form</h2>
          <div>
            <input
              type="email"
              class="w-full p-2 rounded outline-none font-medium"
              required
              placeholder="Please enter your email"
            />
          </div>
          <div>
            <input
              type="password"
              class="w-full p-2 rounded outline-none font-medium"
              required
              placeholder="Please enter your password"
            />
          </div>
          <div>
            <button
              type="submit"
              class="p-2 bg-slate-100 w-full rounded font-medium"
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "c-login",
  methods: {
    onSubmit(e) {
      e.preventDefault();
      const self = this;
      self.$router.push("/");
    },
  },
};
</script>
