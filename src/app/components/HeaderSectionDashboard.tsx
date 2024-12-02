export default function HeaderSectionDashboard({ title, description }: { title: string; description: string }) {
  return (
    <header className="flex w-full flex-col border-b border-b-gray-300 bg-gray-100 px-8 py-4">
      <h2 className="text-4xl font-bold">{title}</h2>
      <p className="text-gray-500">{description}</p>
    </header>
  );
}
