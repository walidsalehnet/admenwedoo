import React from 'react';
import UsersList from './UsersList';
import AddBalance from './AddBalance';
import AddCard from './AddCard';

const App = () => {
  // أضف هنا ID المستخدمين للتفاعل معهم
  const userId = 'user123'; // على سبيل المثال

  return (
    <div>
      <h1>لوحة التحكم</h1>
      <UsersList />
      <AddBalance userId={userId} />
      <AddCard userId={userId} />
    </div>
  );
};

export default App;
