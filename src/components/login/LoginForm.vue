<template>
  <div class="c-login bg-black h-screen flex flex-col justify-center">
    <h2 class="text-center font-bold text-3xl mb-8 text-primary">Stock Management App</h2>
    <div class="w-[40%] p-8 mx-auto bg-primary">
      <form @submit="onSubmit">
        <div class="flex flex-col gap-y-5">
          <h2 class="text-center text-3xl font-bold text-white">Login Form</h2>
          <div>
            <input
              type="email"
              v-model="email"
              class="w-full p-2 rounded outline-none font-medium"
              required
              placeholder="Please enter your email"
            />
          </div>
          <div>
            <input
              type="password"
              v-model="password"
              class="w-full p-2 rounded outline-none font-medium"
              required
              placeholder="Please enter your password"
            />
          </div>
          <div>
            <button type="submit" class="p-2 bg-slate-100 w-full rounded font-medium">Login</button>
          </div>
          <p v-if="error" class="text-red-500 text-center mt-2">{{ error }}</p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { auth } from "../../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";

export default {
  name: "c-login",
  data() {
    return {
      email: "",
      password: "",
      error: null,
    };
  },
  methods: {
    onSubmit(e) {
      const self = this;

      e.preventDefault();
      signInWithEmailAndPassword(auth, self.email, self.password)
        .then((res) => {
          window.sessionStorage.setItem("stock_management_app_user", JSON.stringify(res.user));
          // Redirect after successful login
          this.$router.push("/");
        })
        .catch((err) => {
          self.$toast.open({
            type: "error",
            message: "Invalid email or password.",
          });
        });
    },
  },
};
</script>
