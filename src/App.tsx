import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { EntrepreneurDashboard } from "./pages/dashboard/EntrepreneurDashboard";
import { InvestorDashboard } from "./pages/dashboard/InvestorDashboard";
import { ProfilePage } from "./pages/profile/ProfilePage";
import { InvestorsPage } from "./pages/investors/InvestorsPage";
import { EntrepreneursPage } from "./pages/entrepreneurs/EntrepreneursPage";
import { MessagesPage } from "./pages/messages/MessagesPage";
import { NotificationsPage } from "./pages/notifications/NotificationsPage";
import { MeetingsPage } from "./pages/meetings/MeetingsPage";
import { VideoCallPage } from "./pages/video/VideoCallPage";
import { DocumentChamberPage } from "./pages/documents/DocumentChamberPage";
import { PaymentDashboardPage } from "./pages/payments/PaymentDashboardPage";
import { SecurityPage } from "./pages/security/SecurityPage";
import { SettingsPage } from "./pages/settings/SettingsPage";
import { HelpPage } from "./pages/help/HelpPage";
import { DealsPage } from "./pages/deals/DealsPage";

const App = () => (
  <AuthProvider>
    <Toaster position="top-right" />
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<DashboardLayout />}>
          <Route path="/dashboard/entrepreneur" element={<EntrepreneurDashboard />} />
          <Route path="/dashboard/investor" element={<InvestorDashboard />} />
          <Route path="/profile/:role/:id" element={<ProfilePage />} />
          <Route path="/investors" element={<InvestorsPage />} />
          <Route path="/entrepreneurs" element={<EntrepreneursPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/meetings" element={<MeetingsPage />} />
          <Route path="/video-call" element={<VideoCallPage />} />
          <Route path="/documents" element={<DocumentChamberPage />} />
          <Route path="/payments" element={<PaymentDashboardPage />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/deals" element={<DealsPage />} />
        </Route>

        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
