<template>
  <div class="c-delivery-template">
    <div class="">
      <h2>Issued To: {{ deliveryDetails.customer.name }} {{ deliveryDetails.customer.city }}</h2>
    </div>
  </div>
</template>
<script>
export default {
  name: "c-delivery-template",
  data() {
    return {
      deliveryDetails: {
        _id: "670951d61d1b6fdc268d702e",
        customer: {
          _id: "67017179c3d975977c087b2b",
          name: "Hello Customer",
          phone_no: "012931293",
          email: "CustomerHello@gmail.com",
          id_no: "9749127834",
          city: "Business Bay",
          address: "Karac",
          __v: 0,
        },
        amount: 230,
        products: [
          {
            product: {
              _id: "6700def9e60fbd872068fd99",
              name: "Charger",
              cost_price: 120,
              quantity: 10,
              min_market_value: 150,
              __v: 0,
            },
            selling_price: 1000,
            quantity: 3,
            total_price: 3000,
            _id: "670951d61d1b6fdc268d702f",
          },
        ],
        created_at: "2024-10-11T16:27:02.558Z",
        __v: 0,
      },
    };
  },
};
</script>
