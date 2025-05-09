import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import UsersList from "./UsersList";
import RechargePage from "./RechargePage";
import WithdrawPage from "./WithdrawPage";
import RechargeRequests from "./RechargeRequests";
import WithdrawRequests from "./WithdrawRequests";
import './App.css';

const App = () => {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [showContent, setShowContent] = useState(true);

  const handlePasswordSubmit = () => {
    const correctPassword = "123456"; // كلمة السر الصحيحة
    if (password === correctPassword) {
      setAuthenticated(true);
    } else {
      alert("كلمة السر غير صحيحة");
    }
  };

  const handlePageChange = () => {
    setShowContent(false);
    setTimeout(() => setShowContent(true), 300); // تأخير لإخفاء الصفحة
  };

  useEffect(() => {
    setShowContent(true);
  }, [window.location.pathname]);

  return (
    <Router>
      <div className="admin-container">
        {!authenticated ? (
          <div className="password-container">
            <h2>أدخل كلمة السر</h2>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="أدخل كلمة السر"
            />
            <button onClick={handlePasswordSubmit}>دخول</button>
          </div>
        ) : (
          <div className={`admin-dashboard ${showContent ? "fade-in" : "fade-out"}`}>
            <h1>لوحة التحكم</h1>
            <div className="buttons-container">
              <Link to="/users" className="button" onClick={handlePageChange}>
                عرض المستخدمين
              </Link>
              <Link to="/recharge" className="button" onClick={handlePageChange}>
                إضافة رصيد
              </Link>
              <Link to="/withdraw" className="button" onClick={handlePageChange}>
                سحب الرصيد
              </Link>
              <Link to="/orders" className="button" onClick={handlePageChange}>
                الطلبات
              </Link>
            </div>
            <Routes>
              <Route path="/users" element={<UsersList />} />
              <Route path="/recharge" element={<RechargePage />} />
              <Route path="/withdraw" element={<WithdrawPage />} />
              <Route path="/orders" element={
                <div className="orders-buttons-container">
                  <Link to="/recharge-requests" className="button">
                    طلبات الشحن
                  </Link>
                  <Link to="/withdraw-requests" className="button">
                    طلبات السحب
                  </Link>
                </div>
              } />
              <Route path="/recharge-requests" element={<RechargeRequests />} />
              <Route path="/withdraw-requests" element={<WithdrawRequests />} />
            </Routes>
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;
