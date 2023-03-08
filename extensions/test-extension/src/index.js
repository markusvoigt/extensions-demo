import { extend, Banner } from "@shopify/checkout-ui-extensions";

extend("Checkout::Dynamic::Render", (root, { settings }) => {
  const { banner } = settings;
  const text = banner || "Hello Marmalade";
  root.appendChild(
    root.createComponent(
      Banner,
      { title: text },
      "Hello from CheckoutUI Extensions."
    )
  );
  root.mount();
});
