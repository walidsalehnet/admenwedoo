import React, { useState } from 'react';
import { getFirestore, collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { db } from './firebaseConfig'; // استيراد db بشكل صحيح من firebase-config

const AddCredit = () => {
  const [addEmail, setAddEmail] = useState('');
  const [addAmount, setAddAmount] = useState('');
  const [withdrawEmail, setWithdrawEmail] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');

  const getUserDocByEmail = async (email) => {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return null;
    return querySnapshot.docs[0];
  };

  const handleAddCredit = async () => {
    if (!addEmail || !addAmount) {
      alert('يرجى إدخال البريد الإلكتروني والمبلغ');
      return;
    }

    const userDoc = await getUserDocByEmail(addEmail);
    if (!userDoc) {
      alert('المستخدم غير موجود');
      return;
    }

    const currentWallet = userDoc.data().wallet || 0;
    const newWallet = currentWallet + parseFloat(addAmount);

    try {
      await updateDoc(userDoc.ref, { wallet: newWallet });
      alert(`تم إضافة ${addAmount} لرصيد ${addEmail}. الرصيد الجديد: ${newWallet}`);
    } catch (error) {
      console.error('خطأ أثناء إضافة الرصيد:', error);
    }
  };

  const handleWithdraw = async () => {
    if (!withdrawEmail || !withdrawAmount) {
      alert('يرجى إدخال البريد الإلكتروني والمبلغ');
      return;
    }

    const userDoc = await getUserDocByEmail(withdrawEmail);
    if (!userDoc) {
      alert('المستخدم غير موجود');
      return;
    }

    const currentWallet = userDoc.data().wallet || 0;
    const amountToWithdraw = parseFloat(withdrawAmount);

    if (currentWallet < amountToWithdraw) {
      alert('الرصيد غير كافٍ للسحب');
      return;
    }

    const newWallet = currentWallet - amountToWithdraw;

    try {
      await updateDoc(userDoc.ref, { wallet: newWallet });
      alert(`تم سحب ${withdrawAmount} من رصيد ${withdrawEmail}. الرصيد المتبقي: ${newWallet}`);
    } catch (error) {
      console.error('خطأ أثناء سحب الرصيد:', error);
    }
  };

  return (
    <div>
      <h2>إضافة رصيد</h2>
      <input
        type="email"
        placeholder="البريد الإلكتروني"
        value={addEmail}
        onChange={(e) => setAddEmail(e.target.value)}
      />
      <input
        type="number"
        placeholder="المبلغ"
        value={addAmount}
        onChange={(e) => setAddAmount(e.target.value)}
      />
      <button onClick={handleAddCredit}>إضافة رصيد</button>

      <hr />

      <h2>سحب رصيد</h2>
      <input
        type="email"
        placeholder="البريد الإلكتروني"
        value={withdrawEmail}
        onChange={(e) => setWithdrawEmail(e.target.value)}
      />
      <input
        type="number"
        placeholder="المبلغ المراد سحبه"
        value={withdrawAmount}
        onChange={(e) => setWithdrawAmount(e.target.value)}
      />
      <button onClick={handleWithdraw}>سحب رصيد</button>
    </div>
  );
};

export default AddCredit;
