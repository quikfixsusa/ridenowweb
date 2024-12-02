'use client';

import { useAppContext } from '@/app/lib/context/HomeContext';

import Buttons from './Buttons';
import HeaderSidePanel from './HeaderSidePanel';

export default function Sidepanel() {
  const { openSidePanel, setOpenSidePanel } = useAppContext();
  return (
    <section
      onClick={() => {
        openSidePanel ? setOpenSidePanel(false) : setOpenSidePanel(true);
      }}
      className={`fixed top-0 z-50 flex flex-row-reverse backdrop-blur-sm ${openSidePanel ? 'visible opacity-100' : 'invisible opacity-0'} h-screen w-screen bg-black/20 transition-all duration-300 ease-in-out`}
    >
      <aside
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={`h-screen w-full overflow-auto bg-white sm:w-2/6 ${openSidePanel ? 'translate-x-0' : 'translate-x-[100%]'} min-w-[360px] transition-all duration-500 ease-in-out`}
      >
        <HeaderSidePanel setOpenSidePanel={setOpenSidePanel} openSidePanel={openSidePanel} />
        <Buttons />
        {/*<Buttons buttons={buttonsArray} setOpenSidePanel={setOpenSidePanel} openSidePanel={openSidePanel} />*/}
      </aside>
    </section>
  );
}
