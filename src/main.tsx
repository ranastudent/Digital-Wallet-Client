// main.tsx
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App';
import './index.css';
import { AuthProvider } from '@/redux/features/auth/AuthContext'; // <-- import AuthProvider
import { ThemeProvider } from './components/theme-provider';

ReactDOM.createRoot(document.getElementById('root')!).render(
 <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme' >
   <Provider store={store}>
    <AuthProvider>  {/* <-- wrap the app */}
      <App />
    </AuthProvider>
  </Provider>
 </ThemeProvider>
);
