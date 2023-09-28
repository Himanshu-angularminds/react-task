// import Image from 'next/image'
// import styles from './page.module.css'
// import Registration from '@/component/registration/registration'
// import Login from '@/component/login/login'
// import 'bootstrap/dist/css/bootstrap.css';

// export default function Home() {
//   return (
//     <div class="card-body p-5 ">
//       <h2 class="text-uppercase text-center mb-5">Create an account</h2>
//      {/* <Registration /> */}
//      <Login />
//     </div>
//   )
// }

import LoginForm from "./login/page";

const Index = () => {
  return (
      <div className="card-body p-5 ">
        <LoginForm />
      </div>
  );
};

export default Index;
