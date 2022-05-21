import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import 'tw-elements';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>
        <React.StrictMode>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </React.StrictMode>
  </QueryClientProvider>
  
);

