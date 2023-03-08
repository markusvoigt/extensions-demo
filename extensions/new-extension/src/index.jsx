import React from 'react';
import {
  useExtensionApi,
  render,
  Banner,
  useTranslate,
  useSettings,
} from '@shopify/checkout-ui-extensions-react';

render('Checkout::Dynamic::Render', () => <App />);

function App() {
  const {extensionPoint} = useExtensionApi();
  const {banner} = useSettings();
  const banner_title = banner || "Hello Marmalade";
  return (
    <Banner title={banner_title}>
      Hello from CheckoutUI Extensions!
    </Banner>
  );
}