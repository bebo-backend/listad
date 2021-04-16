import {getFetch} from '../lib/ax-fetch'

import { Provider } from 'react-redux'
import { useStore } from '../store'
import { SWRConfig } from 'swr'

import 'react-dropzone-uploader/dist/styles.css'
import "../public/vendors/styles/icon-font.min.css"
import "../public/vendors/styles/core.css"
import "../public/vendors/styles/style.css"  
import "../category.css"


if (typeof window !== "undefined") {
const  $ = require("jquery");$
  window.$  = $
  window.jQuery  = $
  require("popper.js");
  require("bootstrap");
  // require("../public/vendors/plugins/jQuery-Knob-master/jquery.knob.min.js")
  
  // require("../public/vendors/plugins/bootstrap-touchspin/jquery.bootstrap-touchspin.js")
  // require("../public/vendors/scripts/core.js")
  // require("../public/vendors/scripts/script.min.js")

  // require("../public/vendors/scripts/advanced-components.js")
 
}



export default function MyApp({ Component, pageProps }) {

   const store = useStore(pageProps.initialReduxState)

  return (
  <Provider store={store}>
            <SWRConfig value={{
        fetcher: getFetch,
        onError: (err) => {
          console.error(err)
        },
      }}>
      <Component {...pageProps} />
   </SWRConfig>
    </Provider>

  )
}









