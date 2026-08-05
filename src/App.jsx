import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./hooks/useTheme";
import Layout from "./components/layout/Layout";
import LandingPage from "./pages/LandingPage";
import OrderPage from "./pages/OrderPage";
import CatalogPage from "./pages/CatalogPage";
import LacakOrderPage from "./pages/LacakOrderPage";
import OrderStatusPage from "./pages/OrderStatusPage";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/lacak-order" element={<LacakOrderPage />} />
            <Route path="/lacak-order/status" element={<OrderStatusPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
