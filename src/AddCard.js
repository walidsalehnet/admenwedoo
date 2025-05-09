import React, { useState } from 'react';
import { db } from './firebaseConfig';

const AddCard = ({ userId }) => {
  const [cardDetails, setCardDetails] = useState('');

  const handleAddCard = () => {
    if (!cardDetails) return;

    // إضافة الكارت للمستخدم
    db.collection('cards').add({
      userId: userId,
      cardDetails: cardDetails,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setCardDetails('');
  };

  return (
    <div>
      <input
        type="text"
        value={cardDetails}
        onChange={(e) => setCardDetails(e.target.value)}
        placeholder="أدخل تفاصيل الكارت"
      />
      <button onClick={handleAddCard}>إضافة كارت</button>
    </div>
  );
};

export default AddCard;
