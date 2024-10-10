import { useCallback, useEffect } from "react";
import "./App.css";
import { flip, offset, shift, useFloating } from "@floating-ui/react";
import { getCurrentWindow } from "@tauri-apps/api/window";

function App() {
  const { refs, floatingStyles } = useFloating({
    placement: "right-start",
    middleware: [offset({ mainAxis: 20, crossAxis: 20, alignmentAxis: 20}), flip(), shift()],
  });
  const onMouseMove = useCallback((e: MouseEvent) => {
    const { clientX, clientY } = e;
    e.preventDefault();

    refs.setPositionReference({
      getBoundingClientRect() {
        return {
          width: 0,
          height: 0,
          x: 0,
          y: 0,
          left: clientX,
          top: clientY,
          right: 0,
          bottom: 0,
        };
      },
    });
  }, []);

  useEffect(() => {
    const appWindow = getCurrentWindow();
    appWindow.setFullscreen(true);
    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [onMouseMove]);

  return (
    <div className="tooltip" ref={refs.setFloating} style={floatingStyles}>
      Follows mouse pointer
    </div>
  );
}

export default App;
