import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import './App.css'; // تأكد من استخدام الـ CSS الجديد هنا

const WithdrawRequests = () => {
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const db = getFirestore();

  const fetchRequests = async () => {
    const snapshot = await getDocs(collection(db, 'requests'));
    const withdraws = [];

    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      if (data.type === 'سحب') {
        withdraws.push({ ...data, id: docSnap.id });
      }
    });

    setRequests(withdraws);
  };

  const handleExecute = async (record) => {
    const docRef = doc(db, 'requests', record.id);
    await updateDoc(docRef, { status: 'تم التنفيذ' });
    fetchRequests();
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const filtered = requests.filter((r) =>
    r.orderId?.toString().includes(searchTerm)
  );

  return (
    <div className="table-container">
      <h2 className="requests-title">طلبات السحب</h2>
      <input
        type="text"
        className="search-input"
        placeholder="بحث برقم الطلب"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="styled-table">
        <thead>
          <tr>
            <th>رقم الطلب</th>
            <th>الإيميل</th>
            <th>من</th>
            <th>إلى</th>
            <th>المبلغ</th>
            <th>الحالة</th>
            <th>إجراء</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((r) => (
            <tr key={r.id}>
              <td>{r.orderId}</td>
              <td>{r.userEmail}</td>
              <td>{r.senderPhone}</td>
              <td>{r.receiverPhone}</td>
              <td>{r.amount} جنيه</td>
              <td>{r.status}</td>
              <td>
                {r.status === 'قيد التنفيذ' && (
                  <button className="execute-btn" onClick={() => handleExecute(r)}>تم التنفيذ</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WithdrawRequests;
