"use client"

import Custom404 from '@/app/404';
import ModelForget from '@/app/components/Model/ModelForget';
import { useSearchParams } from 'next/navigation'

const ResetPasswordPage = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  return (
    <div>
      {token ? (
        <ModelForget token={token} showModal={true} />
      ) : (
        <Custom404 />
      )}
    </div>
  );
};


export default ResetPasswordPage;