export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,rgba(11,37,56,0.06)_0%,rgba(243,240,232,0)_22%)]">
      {children}
    </div>
  );
}
