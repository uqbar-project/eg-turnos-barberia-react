import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import './index.css'
import './App.css'
import 'react-datepicker/dist/react-datepicker.css'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
