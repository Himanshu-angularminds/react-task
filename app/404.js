import Link from 'next/link';
import "bootstrap/dist/css/bootstrap.css";

const Custom404 = () => {
  return (
    <div className="container mt-5">
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">404 - Page Not Found</h4>
        <p>Sorry, the page you are looking for does not exist.</p>
        <hr />
        <p className="mb-0">
          <Link legacyBehavior href="/">
            <a className="btn btn-primary">Go Home</a>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Custom404;

