import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from "./components/App/App"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
<QueryClientProvider client={queryClient}>
  <StrictMode>
    <App />
  </StrictMode>
  <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>,
)
