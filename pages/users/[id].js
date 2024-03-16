import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSingleUser } from '../../api/rareUserApi';
import RegisterForm from '../../components/RegisterForm';

export default function EditUserProfile() {
  const [editUser, setEditUser] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    console.warn(editUser);
    if (id) {
      getSingleUser(id).then(setEditUser);
    }
  }, [editUser, id]);

  return (<RegisterForm userObj={editUser} />
  );
}
