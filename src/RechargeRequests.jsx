import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import './App.css'; // ملف CSS خارجي لو حابب

const RechargeRequests = () => {
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const db = getFirestore();

  const fetchRequests = async () => {
    const snapshot = await getDocs(collection(db, 'requests'));
    const recharge = [];

    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      if (data.type === 'شحن') {
        recharge.push({ ...data, id: docSnap.id });
      }
    });

    setRequests(recharge);
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
      <h2>طلبات الشحن</h2>
      <input
        className="search-input"
        type="text"
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

export default RechargeRequests;
