<template>
  <div class="c-login-view">
    <c-login-form></c-login-form>
  </div>
</template>
<script>
import LoginForm from "../components/login/LoginForm.vue";

export default {
  name: "c-login-view",
  components: {
    cLoginForm: LoginForm,
  },
};
</script>
