import React, { useState } from "react";
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "./firebaseConfig";

const RechargePage = () => {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");

  const handleRecharge = async () => {
    if (!email || !amount) {
      alert("يرجى إدخال البريد الإلكتروني والمبلغ.");
      return;
    }

    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        alert("لم يتم العثور على مستخدم بهذا البريد الإلكتروني.");
        return;
      }

      const userDoc = querySnapshot.docs[0];
      const userRef = doc(db, "users", userDoc.id);
      const currentWallet = userDoc.data().wallet || 0;
      const newWallet = currentWallet + parseFloat(amount);

      await updateDoc(userRef, { wallet: newWallet });
      alert(`تم إضافة ${amount} جنيه إلى محفظة المستخدم (${email}).`);

      // إعادة تعيين القيم
      setEmail("");
      setAmount("");
    } catch (error) {
      console.error("خطأ أثناء إضافة الرصيد:", error);
      alert("حدث خطأ أثناء إضافة الرصيد.");
    }
  };

  return (
    <div className="recharge-container">
      <h2>إضافة رصيد</h2>
      <input
        type="email"
        placeholder="البريد الإلكتروني للمستخدم"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="number"
        placeholder="المبلغ المراد إضافته"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleRecharge}>إضافة رصيد</button>
    </div>
  );
};

export default RechargePage;
