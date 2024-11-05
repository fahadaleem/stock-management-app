<template>
  <div class="c-account-statement-view">
    <c-account-statement></c-account-statement>
  </div>
</template>
<script>
import AccountStatement from "../components/accountStatement/AccountStatement.vue";

export default {
  name: "c-account-statement-view",
  components: {
    cAccountStatement: AccountStatement,
  },
};
</script>
