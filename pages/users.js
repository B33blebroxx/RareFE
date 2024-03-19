import { useEffect, useState } from 'react';
import { getAllUsers } from '../api/rareUserApi';
import MiniUserCard from '../components/cards/MiniUserCard';

export default function Users() {
  const [user, setUser] = useState([]);

  const allUsers = () => {
    getAllUsers().then(setUser);
  };

  useEffect(() => {
    allUsers();
  });

  return (
    <>
      <div className="mini-card-container">
        {user.map((users) => (
          <MiniUserCard key={users.id} userObj={users} onUpdate={allUsers} />
        ))}
      </div>
    </>
  );
}
