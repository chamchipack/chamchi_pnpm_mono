import HeaderInputContainer from './HeaderInputContainer';

const HeaderSection = () => {
  return (
    <>
      <div className="flex flex-row justify-between items-center py-4 px-4">
        <img
          src="/logo/logo3_4x.png"
          alt="App Logo"
          className="h-[40px] w-[40px] rounded-md mr-2"
        />

        <HeaderInputContainer />
      </div>
    </>
  );
};

export default HeaderSection;
