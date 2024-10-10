<template>
  <c-register-expense></c-register-expense>
</template>
<script>
import RegisterExpense from "../components/registerExpense/RegisterExpense.vue";

export default {
  name: "c-register-expense-view",
  components: {
    cRegisterExpense: RegisterExpense,
  },
};
</script>
