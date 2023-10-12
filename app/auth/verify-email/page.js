"use client"

import Custom404 from '@/app/404';
import ModelEmailVerify from '@/app/components/Model/ModelEmailVerify';
import { useSearchParams } from 'next/navigation'

const VerifyEmail = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  return (
    <div>
      {token ? (
        <ModelEmailVerify token={token} showModalverify={true} />
      ) : (
        <Custom404 />
      )}
    </div>
  );
};


export default VerifyEmail;