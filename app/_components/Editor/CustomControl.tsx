import { Dispatch, ReactNode, SetStateAction } from "react";
import { useReactFlow } from "reactflow";
import { ZoomIn, ZoomOut, Maximize2, Lock, Unlock } from "lucide-react";

type CustomControlsProps = {
  isLocked: boolean;
  isEditor: boolean;
  setIsLocked: Dispatch<SetStateAction<boolean>>;
};
export default function CustomControls({
  isLocked,
  isEditor,
  setIsLocked,
}: CustomControlsProps) {
  const { zoomIn, zoomOut, fitView } = useReactFlow();

  return (
    <div className="absolute bottom-5 left-4 z-50 flex gap-3">
      <ControlButton title="Zoom In" onClick={() => zoomIn()}>
        <ZoomIn size={18} />
      </ControlButton>

      <ControlButton title="Zoom Out" onClick={() => zoomOut()}>
        <ZoomOut size={18} />
      </ControlButton>

      <ControlButton
        title="Fit View"
        onClick={() => fitView({ maxZoom: 1, padding: 0.2 })}
      >
        <Maximize2 size={18} />
      </ControlButton>

      <ControlButton
        title={isLocked ? "Unlock Interactions" : "Lock Interactions"}
        onClick={() => isEditor && setIsLocked((prev) => !prev)}
      >
        {isLocked ? <Lock size={18} /> : <Unlock size={18} />}
      </ControlButton>
    </div>
  );
}

function ControlButton({
  title,
  onClick,
  children,
}: {
  title: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="p-3 w-full rounded-md bg-transparent cursor-pointer hover:bg-gray-200 transition-colors flex items-center justify-center focus:ring-offset-2 ring-2 ring-slate-300 focus:ring-slate-400"
    >
      {children}
    </button>
  );
}
