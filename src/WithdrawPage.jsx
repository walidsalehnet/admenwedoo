import React, { useState } from "react";
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "./firebaseConfig";

const WithdrawPage = () => {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");

  const handleWithdraw = async () => {
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
      const withdrawAmount = parseFloat(amount);

      if (withdrawAmount > currentWallet) {
        alert("رصيد المستخدم غير كافٍ.");
        return;
      }

      const newWallet = currentWallet - withdrawAmount;

      await updateDoc(userRef, { wallet: newWallet });
      alert(`تم سحب ${amount} جنيه من محفظة المستخدم (${email}).`);

      // إعادة تعيين القيم
      setEmail("");
      setAmount("");
    } catch (error) {
      console.error("خطأ أثناء سحب الرصيد:", error);
      alert("حدث خطأ أثناء سحب الرصيد.");
    }
  };

  return (
    <div className="withdraw-container p-6 bg-gray-800 rounded-lg shadow-lg max-w-md mx-auto mt-10">
      <h2 className="text-2xl text-white mb-6 text-center">سحب رصيد</h2>
      <input
        type="email"
        placeholder="البريد الإلكتروني للمستخدم"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-3 mb-4 bg-gray-700 text-white rounded-lg border-2 border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="number"
        placeholder="المبلغ المراد سحبه"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-3 mb-6 bg-gray-700 text-white rounded-lg border-2 border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleWithdraw}
        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        سحب رصيد
      </button>
    </div>
  );
};

export default WithdrawPage;
