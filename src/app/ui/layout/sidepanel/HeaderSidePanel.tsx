import CloseIcon from '@/app/components/svg/CloseIcon';

interface Props {
  setOpenSidePanel: React.Dispatch<React.SetStateAction<boolean>>;
  openSidePanel: boolean;
}

export default function HeaderSidePanel({ openSidePanel, setOpenSidePanel }: Props) {
  return (
    <header className="mx-5 my-5 flex items-center justify-between border-b border-b-black pb-4">
      <p className="text-2xl font-bold text-black">Menu</p>
      <button
        className="transition-all: flex duration-150 hover:opacity-60"
        onClick={() => {
          openSidePanel ? setOpenSidePanel(false) : setOpenSidePanel(true);
        }}
      >
        <CloseIcon size={24} color="black" />
      </button>
    </header>
  );
}
