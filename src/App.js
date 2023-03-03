import "./App.css";
import "./utils/libs/slick/slick.css";
import "./utils/libs/slick/slick-theme.css";
import { Index } from "./pages/Index/Index";

import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";
import { HomeLayout } from "./components/Layouts/Home-Layout";
import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";
import { MyAccountLayout } from "./components/My-Account-Layout/My-Account-Layout";
import { Faq } from "./pages/Faq/Faq";
import { PartnersProgram } from "./pages/Partners-Program/Partners-Program";
import { AboutUs } from "./pages/About-Us/About-Us";
import { Contacts } from "./pages/Contacts/Contacts";
import { Deposit } from "./pages/Deposit/Deposit";
import { Transactions } from "./pages/Transactions/Transactions";
import { Partners } from "./pages/Partners/Partners";
import { Withdraw } from "./pages/Withdraw/Withdraw";
import { PersonalArea } from "./pages/Personal-Area/Personal-Area";
import { Settings } from "./pages/Settings/Settings";
import { Replenishment } from "./pages/Replanishment/Replenishment";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/partners" element={<PartnersProgram />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contacts" element={<Contacts />} />
        </Route>

        <Route path="/my-account" element={<MyAccountLayout />}>
          <Route index element={<PersonalArea />} />
          <Route path="deposit" element={<Deposit />} />
          <Route path="withdraw" element={<Withdraw />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="partners" element={<Partners />} />
          <Route path="settings" element={<Settings />} />
          <Route path="replenishment" element={<Replenishment />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
