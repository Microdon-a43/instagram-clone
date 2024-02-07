import ReactDOM from 'react-dom/client';
import App from './app/App';
import { StoreProvider, ThemeProvider } from './app/provider';
import './app/styles/index.scss';
import { BrowserRouter } from 'react-router-dom';
import './shared/config/i18n';

ReactDOM.createRoot(document.getElementById('root')).render(
  <StoreProvider>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StoreProvider>
);
