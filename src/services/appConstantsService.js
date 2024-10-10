export const appConstantService = (() => {
  const purchaseTypes = {
    INDIVIDUAL_ITEMS: "individual_items",
    BUNDLE_ITEMS: "bundle_items",
  };

  const cities = [
    "Deira",
    "Bur Dubai",
    "Jumeirah",
    "Downtown Dubai",
    "Dubai Marina",
    "Business Bay",
    "Al Barsha",
    "Jebel Ali",
    "Al Quoz",
    "Dubai Silicon Oasis",
    "Palm Jumeirah",
    "Al Nahda",
    "Satwa",
    "Mirdif",
    "Al Qusais",
  ];

  return {
    purchaseTypes,
    cities,
  };
})();
