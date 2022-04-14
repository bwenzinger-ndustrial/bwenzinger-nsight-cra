export const initializePendo = (user) => {
  if (window.pendo && user.sub) {
    window.pendo.initialize({
      visitor: {
        id: user.sub, // Required if user is logged in
        full_name: user.name
        // email:        // Recommended if using Pendo Feedback, or NPS Email
        // role:         // Optional
        // You can add any additional visitor level key-values here,
        // as long as it's not one of the above reserved names.
      },
      account: {
        id: user.sub // Highly recommended
        // name:         // Optional
        // is_paying:    // Recommended if using Pendo Feedback
        // monthly_value:// Recommended if using Pendo Feedback
        // planLevel:    // Optional
        // planPrice:    // Optional
        // creationDate: // Optional

        // You can add any additional account level key-values here,
        // as long as it's not one of the above reserved names.
      }
    });
  }
};
