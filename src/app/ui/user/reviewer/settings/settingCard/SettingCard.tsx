import HeaderCard from './HeaderCard';

interface Props {
  title: string;
  description: string;
  icon: JSX.Element;
  children: JSX.Element;
}

export default function SettingCard({ children, icon, title, description }: Props) {
  return (
    <div className="flex w-full flex-col gap-4 rounded-lg border border-gray-300 p-6">
      <HeaderCard icon={icon} title={title} description={description} />
      {children}
    </div>
  );
}
