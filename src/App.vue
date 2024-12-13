<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: "c-app",
  created() {
    const self = this;
    const loggedInUser = window.sessionStorage.getItem("stock_management_app_user");

    if (!loggedInUser) {
      self.$router.push("/login");
    }
  },
};
</script>
<style></style>
