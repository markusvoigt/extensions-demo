import React,{ useState, useEffect } from 'react';
import {
  useExtensionApi,
  useAppMetafields,
  render,
  BlockStack,
  TextField,
  useApplyMetafieldsChange,
  useBuyerJourneyIntercept,
  useSettings
} from '@shopify/checkout-ui-extensions-react';

render('Checkout::Dynamic::Render', () => <App />);

function App() {
  const [validationError, setValidationError] = useState("");
  const [userInput, setUserInput] = useState("");
  const applyMetafieldsChange = useApplyMetafieldsChange();
  const {label} = useSettings();
console.log(`Label is: ${label}`)
  //const cartLines = useCartLines();


  const metafieldNamespace = "custom";
  const metafieldKey = "billing";

  
  const metafields = useAppMetafields();
  let customerReference = metafields[0]?.metafield.value || "";

  if (customerReference.length>0){
    applyMetafieldsChange({
      type: "updateMetafield",
      namespace: metafieldNamespace,
      key: metafieldKey,
      valueType: "string",
      value: customerReference,
    });
}




  useBuyerJourneyIntercept(()=>{
    if (userInput.length>0){
      return {
        behavior: "allow",
        perform: () => {
          setValidationError("");
        }
      }
    }else{
      return {
        behavior: "block",
        reason: "No billing ref provided",
        perform: () => {
          setValidationError("Please enter your billing reference");
        }
      }
    }
  })









  /*
  // interate through cartlines 
  // find corresponding tax and duties metafield value
  var breakDown = [];
  var totalTax = 0;
  var totalDuties = 0;
  cartLines.forEach((cartLine) => {
    var lineItem = {};
    lineItem.title = cartLine.merchandise.title;
    lineItem.quantity = cartLine.quantity;
    if (metafields.length>0){
    lineItem.tax = metafields.filter(entry => {
        return entry.target.id === cartLine.merchandise.product.id.substr(-13) && entry.metafield.key === 'tax';
      })[0].metafield.value*cartLine.quantity;
    totalTax += lineItem.tax;
      lineItem.duties = metafields.filter(entry => {
        return entry.target.id === cartLine.merchandise.product.id.substr(-13) && entry.metafield.key === 'duties';
      })[0].metafield.value*cartLine.quantity;
    }
    totalDuties += lineItem.duties;
    breakDown.push(lineItem);
}); 

  return (
    <Banner title="Breakdown of taxes & duties">
       <BlockStack spacing="tight">
      <View border="none" padding="none">
      <InlineLayout columns={['50%', '25%', '25%']}>
      <View border="none">
        Product
      </View>
      <View border="none">
        Taxes
      </View>
      <View border="none">
       Duties
      </View>
    </InlineLayout>
      </View>
      {breakDown.map((item) => (
        <View border="none" padding="none">
      <InlineLayout columns={['50%', '25%', '25%']}>
      <View border="none">
        {item.title}
      </View>
      <View border="none">
      {item.tax} €
      </View>
      <View border="none">
       {item.duties} €
      </View>
    </InlineLayout>
        </View>
      ))}
      <Divider />
      <Text size="small">A total tax of {totalTax} € and duties of {totalDuties} € are included in the product prices.</Text>
      </BlockStack>
    </Banner>
  );
  */

        if (customerReference.length==0){
  return (
    <BlockStack>
        {label || "Your billing reference ID:"}
         <TextField
          label="Enter your billing reference ID"
          multiline={false}
          required={true}
          error={validationError}
          onChange={(value) => {
            setUserInput(value);
            applyMetafieldsChange({
              type: "updateMetafield",
              namespace: metafieldNamespace,
              key: metafieldKey,
              valueType: "string",
              value: value
            });
          }}
        />
    </BlockStack>
  )}else{
  return (
    <BlockStack>
        Your billing reference ID on file:
         <TextField
          label="Reference ID"
          multiline={false}
          required={true}
          disabled={true}
          value={customerReference}
        />
    </BlockStack>
  )
}
}