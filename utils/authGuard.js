"use client"
import { useRouter, usePathname  } from 'next/navigation';
import { useEffect } from 'react';

const AuthGuard = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const profilePage = "/my-profile"; 

  const isAuthenticated = () => {
    const userData = localStorage.getItem("UserData"); 
    return !!userData;
  };

  useEffect(() => {
    const currentPage = pathname;

    if (currentPage === profilePage && !isAuthenticated()) {
      router.push("/login");
    }
  }, [router,pathname]);

  return <>{children}</>;
};

export default AuthGuard;
