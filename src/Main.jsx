import { useEffect } from "react";
import { BackHandler } from "react-native";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-native";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import WelcomePage from "./pages/WelcomePage";
import UserBalancePage from "./pages/User/Balance/UserBalancePage";
import MyCardsPage from "./pages/User/MyCards/MyCardsPage";
import PayPage from "./pages/User/Pay/PayPage";
import ProfilePage from "./pages/User/Profile/ProfilePage";
import HceTestingPage from "./pages/User/Profile/HceTestingPage";
import CardDetailsPage from "./pages/User/MyCards/CardDetailsPage";
import PinCodePage from "./pages/User/MyCards/PinCodePage";
import AdminCardPage from "./pages/User/MyCards/AdminCardPage";
import TransactionsPage from "./pages/User/MyCards/TransactionsPage";
import CustomizeCardPage from "./pages/User/MyCards/CustomizeCardPage";
import DefineCodePage from "./pages/User/MyCards/DefineCodePage";
import CodeApprovedPage from "./pages/User/MyCards/CodeApprovedPage";
import OneTransactionPage from "./pages/User/MyCards/OneTransactionPage";
import ImportCardPage from "./pages/User/MyCards/ImportCardPage";
import PayWithCardPage from "./pages/User/Pay/PayWithCardPage";
import CustomizeProfilePage from "./pages/User/Profile/CustomizeProfilePage";
import TermsAndConditionsPage from "./pages/User/Profile/TermsAndConditionsPage";
import CompanyBalancePage from "./pages/Company/FiatPayments/CompanyBalancePage";
import HistoricBalancePage from "./pages/Company/FiatPayments/HistoricBalancePage";
import OneHistoricPage from "./pages/Company/FiatPayments/OneHistoricPage";
import CompanySettingsPage from "./pages/Company/Settings/CompanySettingsPage";
import CompanyTermsPage from "./pages/Company/Settings/CompanyTermsPage";
import CompanyCustomizePage from "./pages/Company/Settings/CompanyCustomizePage";
import CompanyPayPage from "./pages/Company/CryptoPayments/CompanyPayPage";
import SelectCryptoPage from "./pages/Company/CryptoPayments/SelectCryptoPage";
import SelectAmountPage from "./pages/Company/CryptoPayments/SelectAmountPage";
import SummaryToPayPage from "./pages/Company/CryptoPayments/SummaryToPayPage";
import ExchangePage from "./pages/User/Exchange/ExchangePage";

const Main = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const onBackPress = () => {
    if (location.pathname !== "/") {
      navigate(-1);
      return true; // Previene el comportamiento por defecto (cerrar la app)
    }
    return false; // Permite el comportamiento por defecto (cerrar la app)
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", onBackPress);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    };
  }, [navigate, location]);

  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/userBalance" element={<UserBalancePage />} />
      <Route path="/companyBalance" element={<CompanyBalancePage />} />
      <Route
        path="/companyBalance/historic"
        element={<HistoricBalancePage />}
      />
      <Route
        path="/companyBalance/historic/:historicId"
        element={<OneHistoricPage />}
      />
      <Route path="/companySettings/terms" element={<CompanyTermsPage />} />
      <Route
        path="/companySettings/customize"
        element={<CompanyCustomizePage />}
      />
      <Route path="/companySettings" element={<CompanySettingsPage />} />
      <Route path="/companyPay" element={<CompanyPayPage />} />
      <Route
        path="/companyPay/selectCrypto/:blockchainId"
        element={<SelectCryptoPage />}
      />
      <Route
        path="/companyPay/selectAmount/:payload"
        element={<SelectAmountPage />}
      />
      <Route
        path="/companyPay/summaryToPay/:payload"
        element={<SummaryToPayPage />}
      />
      <Route path="/pay" element={<PayPage />} />
      <Route path="/pay/:card" element={<PayWithCardPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/profile/customize" element={<CustomizeProfilePage />} />
      <Route path="/profile/terms" element={<TermsAndConditionsPage />} />
      <Route path="/profile/hceTesting" element={<HceTestingPage />} />
      <Route path="/myCards" element={<MyCardsPage />} />
      <Route path="/myCards/cardDetails/:card" element={<CardDetailsPage />} />
      <Route
        path="/myCards/customizeCard/:card"
        element={<CustomizeCardPage />}
      />
      <Route path="/myCards/pinCode" element={<PinCodePage />} />
      <Route path="/myCards/defineCode" element={<DefineCodePage />} />
      <Route path="/myCards/codeApproved" element={<CodeApprovedPage />} />
      <Route path="/myCards/adminCard/:card" element={<AdminCardPage />} />
      <Route path="/myCards/transactions" element={<TransactionsPage />} />
      <Route
        path="/myCards/transactions/:transactionId"
        element={<OneTransactionPage />}
      />
      <Route path="/myCards/importCard" element={<ImportCardPage />} />
      <Route path="/exchange" element={<ExchangePage />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default Main;
