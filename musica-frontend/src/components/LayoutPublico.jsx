export default function LayoutPublico({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4">
        {children}
      </div>
    </div>
  );
}