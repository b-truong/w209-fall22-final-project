/** @jsxImportSource @emotion/react */

import { useTheme } from "@mui/material";
import { DSVRowString } from "d3";
import { TopLevelSpec } from "vega-lite";
import { useFighterFights } from "../DataProvider";
import { useMemo } from "react";
import { getVegaConfig } from "../theme";
import VegaGraphCard from "./VegaGraphCard";

interface IFighterMatchOutcomes {
  /** The selected fighter */
  selected: DSVRowString;
}

/**
 * Display chart with fighter win rate
 */
const FighterMatchOutcomes: React.FC<IFighterMatchOutcomes> = ({
  selected,
}) => {
  const theme = useTheme();
  const fights = useFighterFights(selected?.fighter ?? "");

  // VL specification
  const vlSpec: TopLevelSpec = useMemo(
    () => ({
      config: getVegaConfig(theme),
      width: "container",
      background: "transparent",
      padding: 16,
      data: {
        values: fights,
      },
      mark: {
        type: "area",
        color: theme.palette.primary.main,
        line: true,
        point: {
          filled: false,
          fill: theme.palette.background.paper,
          size: 128,
        },
      },
      encoding: {
        x: {
          title: "Date",
          field: "date",
          type: "temporal",
          timeUnit: "year",
          axis: {
            title: "Year",
            tickCount: "year",
          },
        },
        y: {
          title: "Matches",
          field: "outcome",
          type: "quantitative",
          aggregate: "count",
          scale: {
            domainMin: 0,
          },
          axis: {
            title: "Matches",
            tickMinStep: 1,
          },
        },
        color: {
          title: "Outcome",
          field: "outcome",
          type: "nominal",
          scale: {
            domain: ["Lost", "Won"],
            range: [theme.palette.secondary.main, theme.palette.primary.main],
          },
        },
      },
    }),
    [fights, theme]
  );

  return (
    <VegaGraphCard
      title="Match Outcome History"
      vlSpec={vlSpec}
      isEmpty={!fights.length}
    />
  );
};

export default FighterMatchOutcomes;
