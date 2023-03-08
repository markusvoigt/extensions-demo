import {AppProvider} from '@shopify/discount-app-components'
import '@shopify/discount-app-components/build/esm/styles.css'

import React from 'react'

const DiscountProvider = ({children}) => {
  return (
    <AppProvider locale="en-US" ianaTimezone='America/New_York'>{children}</AppProvider>
  )
}

export default DiscountProvider