
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { OrderProvider } from "./contexts/OrderContext";
import Gallery from "./pages/Gallery";
import Customize from "./pages/Customize";
import Confirm from "./pages/Confirm";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <OrderProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Gallery />} />
            <Route path="/customize/:category" element={<Customize />} />
            <Route path="/confirm" element={<Confirm />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/success" element={<Success />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </OrderProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
