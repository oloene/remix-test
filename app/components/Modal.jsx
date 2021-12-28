import { useCallback, useEffect, useRef, useState } from "react";
import reactDom from "react-dom";
import { clamp } from "../utils/func";

export default function Modal({
  children,
  title = "",
  open = false,
  onClose = () => {},
}) {
  const [isClient, setIsClient] = useState(false);
  const [active, setActive] = useState(false);
  const [currentX, setCurrentX] = useState(null);
  const [currentY, setCurrentY] = useState(null);
  const [initialX, setInitialX] = useState(null);
  const [initialY, setInitialY] = useState(null);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const boxRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  function dragStart(e) {
    e.preventDefault();

    const boxRect = boxRef.current.getBoundingClientRect();

    setInitialX(e.clientX - offsetX);
    setInitialY(e.clientY - offsetY);

    setActive(true);
  }

  function drag(e) {
    if (active) {
      e.preventDefault();

      const newX = e.clientX - initialX;
      const newY = e.clientY - initialY;

      const boxRect = boxRef?.current?.getBoundingClientRect() ?? {};
      const boxWidth = boxRect.width ?? 0;
      const boxHeight = boxRect.height ?? 0;

      // keep within bounds of window
      const currentX = clamp(
        newX,
        -(window.innerWidth / 2) + boxWidth / 2,
        window.innerWidth / 2 - boxWidth / 2
      );
      const currentY = clamp(
        newY,
        -(window.innerHeight / 2) + boxHeight / 2,
        window.innerHeight / 2 - boxHeight / 2
      );

      setCurrentX(currentX);
      setCurrentY(currentY);

      setOffsetX(currentX);
      setOffsetY(currentY);
    }
  }

  function dragEnd(e) {
    e.preventDefault();

    setInitialX(currentX);
    setInitialY(currentY);

    setActive(false);
  }

  return isClient && open
    ? reactDom.createPortal(
        <div
          className={`fixed inset-0 flex items-center justify-center z-10 `}
          onMouseUp={dragEnd}
          onMouseMove={drag}
          style={{
            cursor: active === true ? "grabbing" : "",
          }}
        >
          <div
            className="fixed inset-0 z-10 bg-[rgba(0,0,0,0.4)]"
            onClick={onClose}
          />
          <div
            className="w-[456px] z-10 h-[556px] bg-white rounded-md shadow-2xl"
            ref={boxRef}
            style={{
              transform: `translate3d(${currentX}px, ${currentY}px, 0)`,
            }}
          >
            <div
              className={`p-4 h-[56px] border-b-2 border-b-slate-200 flex`}
              onMouseDown={dragStart}
              style={{
                cursor: active === true ? "grabbing" : "grab",
              }}
            >
              <span className="font-bold">{title}</span>
              <span
                className="material-icons ml-auto cursor-pointer"
                onClick={onClose}
              >
                close
              </span>
            </div>
            <div className="p-4 h-[500px] overflow-y-auto">{children}</div>
          </div>
        </div>,

        document.getElementById("portal")
      )
    : null;
}
