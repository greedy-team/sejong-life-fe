import { authApi } from '../../../api/api';

const deleteUser = async () => {
  const res = await authApi.delete('/api/users');
  return res.data;
};

export default deleteUser;
