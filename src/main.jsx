import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ImageProvider } from './Context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ImageProvider>
    <App />
  </ImageProvider>
)
