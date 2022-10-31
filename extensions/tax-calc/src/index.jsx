import React from 'react';
import {
  useExtensionApi,
  useCartLines,
  render,
  Banner,
} from '@shopify/checkout-ui-extensions-react';

render('Checkout::Dynamic::Render', () => <App />);

function App() {
  const {extensionPoint} = useExtensionApi();
  const cartLines = useCartLines();
  return (
    <Banner title="Breakdown of taxes & duties">
      {JSON.stringify(cartLines)}
    </Banner>
  );
}