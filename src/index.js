import reportWebVitals from "./reportWebVitals";
import React from "react";
import ReactDOM from "react-dom/client"; // Correct import for React 18+
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Create an instance of QueryClient
const queryClient = new QueryClient();

// Create the root element for rendering
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);

// Optional: Report web vitals (optional for performance tracking)
reportWebVitals();
