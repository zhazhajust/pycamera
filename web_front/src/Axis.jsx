import './App.css';
import {useEffect, useRef} from "react";
import * as Plot from "@observablehq/plot";

function PlotFigure(props) {
  const containerRef = useRef();
  const data = props.data;
  useEffect(() => {
    if (data === undefined) return;
    const plot = Plot.plot({
        marks: [
            Plot.ruleY([0.25, 0.5, 0.75], {stroke: "red"}),
            Plot.lineY(data, {x: "index_0", y: "axis_0"}),
            Plot.crosshair(data, {x: "index_0", y: "axis_0", color: "red"})
        ]
    });
    containerRef.current.append(plot);
    return () => plot.remove();
  }, [data]);

  return <div ref={containerRef} className="box"/>;
}

export default PlotFigure;