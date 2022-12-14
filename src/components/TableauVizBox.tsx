/** @jsxImportSource @emotion/react */

import { TableauViz } from "../assets/tableau.embedding.3.latest.min";
import { useLayoutEffect, useMemo } from "react";

interface ITableauVizBox extends React.PropsWithChildren {
  /** URL of the visualization */
  url: string;
}

/**
 * Display chart with fighter win rate
 */
const TableauVizBox: React.FC<ITableauVizBox> = ({ url }) => {
  // Generate unique ID
  const id = useMemo(
    () => `tableau-viz-${Math.random().toString(36).substring(2, 15)}`,
    []
  );

  // Embed VL visualization
  // Documentation an d examples for Tableau embedding can be found here:
  // https://github.com/tableau/embedding-api-v3-samples#embedding-api-v3-samples
  useLayoutEffect(() => {
    const viz = new TableauViz();

    viz.src = url;
    viz.toolbar = "hidden";
    viz.width = "100vw";
    viz.height = "calc(100vh - 64px)";

    const vizElement = document.getElementById(id);
    if (vizElement) {
      vizElement.innerHTML = "";
      vizElement.appendChild(viz);
    }
  }, [url, id]);

  return <div id={id} css={{ width: "100vw" }} />;
};

export default TableauVizBox;
