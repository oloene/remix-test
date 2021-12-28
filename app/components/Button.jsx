import { useEffect, useState } from "react";

export default function Button({
  children,
  onClick = () => {},
  type = "",
  disabled = false,
}) {
  const [ripples, setRipples] = useState([]);

  function onRipple(e) {
    const button = e.currentTarget;
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    const { left: offsetLeft, top: offsetTop } = button.getBoundingClientRect();

    const _ripple = {
      width: diameter,
      height: diameter,
      top: `${e.clientY - (offsetTop + radius)}px`,
      left: `${e.clientX - (offsetLeft + radius)}px`,
    };

    setRipples((prev) => [...prev, _ripple]);
  }

  /**
   * Clear ripples from the DOM after 1200ms (debounced)
   */
  useEffect(() => {
    if (ripples.length === 0) return;

    const timerId = setTimeout(() => {
      setRipples([]);
    }, 1200);

    return () => clearTimeout(timerId);
  }, [ripples]);

  return (
    <>
      <button
        className={`relative min-h-[42px] min-w-[100px] overflow-hidden px-6 py-0 shadow-md shadow-blue-500/50 text-white outline-0 border-0 rounded-md ${
          disabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"
        }`}
        type={type}
        disabled={disabled}
        onClick={(e) => {
          onRipple(e);
          onClick(e);
        }}
      >
        <span className="button-content">{children}</span>
        {ripples.length > 0 &&
          ripples.map(({ top, left, width, height }, index) => (
            <span
              key={`$_ripple_${index}`}
              className="bg-white-alpha absolute animate-ripple block rounded-full"
              style={{
                top,
                left,
                width,
                height,
              }}
            />
          ))}
      </button>
    </>
  );
}
