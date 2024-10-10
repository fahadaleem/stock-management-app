<template>
  <div class="c-dashboard-view">
    <c-dashboard></c-dashboard>
  </div>
</template>
<script>
import Dashboard from "../components/dashboard/Dashboard.vue";

export default {
  name: "c-dashboard-view",
  components: {
    cDashboard: Dashboard,
  },
};
</script>
