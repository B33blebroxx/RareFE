import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSingleUser } from '../../api/rareUserApi';
import RegisterForm from '../../components/RegisterForm';
// import { useAuth } from '../../utils/context/authContext';

export default function EditUserProfile() {
  const [editUser, setEditUser] = useState({});
  const router = useRouter();
  const { id } = router.query;
  // const { user } = useAuth();

  useEffect(() => {
    console.log(id);
    if (id) {
      getSingleUser(id).then(setEditUser);
    }
  }, [id]);

  return (<RegisterForm userObj={editUser} />
  );
}
