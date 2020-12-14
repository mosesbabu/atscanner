import { useContext } from 'react';
import AuthContext from 'src/contexts/DjangoAuth';

const useAuth = () => useContext(AuthContext);

export default useAuth;
