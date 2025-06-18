'use client';

export default function Error({ error }: { error: Error }) {
  return (
    <div className="text-center mt-20">
      <h1>{error.message}</h1>
    </div>
  );
}
