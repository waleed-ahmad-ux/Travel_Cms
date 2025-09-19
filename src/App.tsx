import { ThemeProvider } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Destinations } from './pages/Destinations';
import { DestinationDetail } from './pages/DestinationDetail';
import { theme } from './theme/theme';
import AllOffers from './pages/AllOffers';
import HolidayDeals2025 from './pages/HolidayDeals2025';
import LastMinuteHolidayDeals from './pages/LastMinuteHolidayDeals';
import KidsGoFreeOffers from './pages/KidsGoFreeOffers';
import SummerHolidayDeals from './pages/SummerHolidayDeals';
import OctoberHalfTermDeals from './pages/OctoberHalfTermDeals';
import ChristmasHolidays from './pages/ChristmasHolidays';
import FebruaryHalfTermDeals from './pages/FebruaryHalfTermDeals';
import EasterHolidayOffers from './pages/EasterHolidayOffers';
import MayHalfTermDeals from './pages/MayHalfTermDeals';
import BusinessClassOffers from './pages/BusinessClassOffers';
import HolidayDeals2026 from './pages/HolidayDeals2026';
import OnlineDeals from './pages/OnlineDeals';
import Antigua from './pages/Antigua';
import Thailand from './pages/Thailand';

// Admin Components
import { AdminProvider } from './contexts/AdminContext';
import AdminLogin from './components/admin/AdminLogin';
import AdminLayout from './components/admin/AdminLayout';
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import PhotoManagement from './pages/admin/PhotoManagement';
import DestinationManagement from './pages/admin/DestinationManagement';
import HotelManagement from './pages/admin/HotelManagement';
import HotelMarginManagement from './pages/admin/HotelMarginManagement';
import FlightManagement from './pages/admin/FlightManagement';
import UserManagement from './pages/admin/UserManagement';
import FlightMarginManagement from './pages/admin/FlightMarginManagement';

// Initialize React Query client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <AdminProvider>
          <Router>
            <Routes>
              {/* Admin Routes */}
              <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
              <Route path="/admin/login" element={<AdminLogin />} />

              <Route
                path="/admin/*"
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<AdminDashboard />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route
                  path="photos"
                  element={
                    <ProtectedRoute requiredPermission="manage_photos">
                      <PhotoManagement />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="destinations"
                  element={
                    <ProtectedRoute requiredPermission="manage_destinations">
                      <DestinationManagement />
                    </ProtectedRoute>
                  }
                />
                <Route path="hotels" element={<HotelManagement />} />
                <Route path="hotel-margins" element={<HotelMarginManagement />} />
                <Route path="flights" element={<FlightManagement />} />
                <Route
                  path="users"
                  element={
                    <ProtectedRoute requiredPermission="manage_users">
                      <UserManagement />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="flight-margins"
                  element={
                    <ProtectedRoute requiredPermission="manage_flight_margins">
                      <FlightMarginManagement />
                    </ProtectedRoute>
                  }
                />
                {/* package-margins route removed */}
                <Route path="settings" element={<div>Settings (Coming Soon)</div>} />
              </Route>

              {/* Public Routes */}
              <Route path="/*" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="destinations" element={<Destinations />} />
                <Route path="destination/6" element={<Antigua />} />
                <Route path="destination/thailand" element={<Thailand />} />
                <Route path="destination/5" element={<Thailand />} />
                <Route path="destination/:id" element={<DestinationDetail />} />
                <Route path="holiday-deals/all" element={<AllOffers />} />
                <Route path="holiday-deals/2025" element={<HolidayDeals2025 />} />
                <Route path="holiday-deals/last-minute" element={<LastMinuteHolidayDeals />} />
                <Route path="holiday-deals/kids-free" element={<KidsGoFreeOffers />} />
                <Route path="holiday-deals/summer" element={<SummerHolidayDeals />} />
                <Route path="holiday-deals/october-half-term" element={<OctoberHalfTermDeals />} />
                <Route path="holiday-deals/christmas" element={<ChristmasHolidays />} />
                <Route path="holiday-deals/february-half-term" element={<FebruaryHalfTermDeals />} />
                <Route path="holiday-deals/easter" element={<EasterHolidayOffers />} />
                <Route path="holiday-deals/may-half-term" element={<MayHalfTermDeals />} />
                <Route path="holiday-deals/business-class" element={<BusinessClassOffers />} />
                <Route path="holiday-deals/2026" element={<HolidayDeals2026 />} />
                <Route path="holiday-deals/online" element={<OnlineDeals />} />
                <Route path="contact" element={<div>Contact Us (Coming Soon)</div>} />
              </Route>
            </Routes>
          </Router>
        </AdminProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
