export const Loader = () => {
  return (
      <div
        className="
          w-[190px]
          h-[18px]
          rounded-[50px]
          shadow-inner
          relative
          bg-white/[0.10]
        "
      >
        <div
          className="
            rounded-[50px]
            h-[16px]
            w-[16px]
            absolute
            bottom-[1px]
            top-[1px]
            bottom-[2px]
            shadow-sm
            animate-loader
            bg-current
          "
        />
      </div>
  );
};

export default Loader;
