import { Logo } from '../assets';
import { Loader } from './loader';

export const Fallback = () => (
  <div className="w-[100vw] h-[100vh] bg-blue-100 flex items-center justify-center z-[-1] fixed">
    <div className="flex flex-col items-center justify-center space-y-[24px]">
      <Logo className="text-white/[0.75]" />

      <div>
        <Loader />
      </div>
    </div>
  </div>
);

export default Fallback;
