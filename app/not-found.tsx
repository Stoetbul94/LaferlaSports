import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="section-padding bg-white">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="heading-1 mb-4">404 - Page Not Found</h1>
          <p className="text-body mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link href="/" className="btn btn-primary">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

