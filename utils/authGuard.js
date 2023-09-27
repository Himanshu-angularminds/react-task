import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const AuthGuard = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('UserData'); 
    if (!token) {
      // User is not logged in, redirect to the login page
      router.push('/login');
    }
  }, []);

  return <>{children}</>;
};

export default AuthGuard;
