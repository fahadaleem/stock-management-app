<template>
  <div class="c-view-delivery-note-view">
    <c-view-delivery-note></c-view-delivery-note>
  </div>
</template>
<script>
import ViewDeliveryNote from "../components/delivery/ViewDeliveryNote.vue";

export default {
  name: "c-view-delivery-note-view",
  components: {
    cViewDeliveryNote: ViewDeliveryNote,
  },
};
</script>
