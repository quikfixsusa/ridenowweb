interface Props {
  title: string;
  description: string;
  icon: JSX.Element;
}

export default function HeaderCard({ icon, title, description }: Props) {
  return (
    <div className="flex w-full flex-col items-start">
      <div className="flex items-center gap-2 text-black">
        {icon}
        <h3 className="text-3xl font-semibold text-black">{title}</h3>
      </div>
      <p className="text-gray-500">{description}</p>
    </div>
  );
}
