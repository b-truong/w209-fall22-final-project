/** @jsxImportSource @emotion/react */

import { useMediaQuery, useTheme } from "@mui/material";
import { DSVRowString } from "d3";
import { TopLevelSpec } from "vega-lite";
import { useCumulativeFighterStrikes } from "../DataProvider";
import { useMemo } from "react";
import { getVegaConfig } from "../theme";
import VegaGraphCard from "./VegaGraphCard";

interface IFighterStrikes {
  /** The selected fighter */
  selected: DSVRowString;
  /** Whether to display strikes taken instead of given */
  taken?: boolean;
}

const getStrikeCounts = (
  strikes: Array<{
    strikeType: string;
    count: number;
    order: number;
    group: string;
  }>
) =>
  Object.values(
    strikes.reduce((reduced: Record<string, number>, current) => {
      if (reduced[current.group]) {
        reduced[current.group] += current.count;
      } else {
        reduced[current.group] = current.count;
      }
      return reduced;
    }, {})
  );

/**
 * Display chart with fighter win rate
 */
const FighterStrikesSummary: React.FC<IFighterStrikes> = ({
  selected,
  taken,
}) => {
  const theme = useTheme();
  const smallViewport = useMediaQuery("(max-width: 500px)");

  const strikes = useCumulativeFighterStrikes(selected?.fighter ?? "");
  const values = taken ? strikes.taken : strikes.given;
  const maxStrikes = getStrikeCounts(strikes.given)
    .concat(getStrikeCounts(strikes.taken))
    .reduce((max, current) => {
      return current > max ? current : max;
    }, 0);

  // VL specification
  const vlSpec: TopLevelSpec = useMemo(
    () => ({
      config: getVegaConfig(theme),
      width: "container",
      height: smallViewport ? 364 : 250,
      padding: 16,
      autosize: {
        type: "fit",
        contains: "padding",
      },
      background: "transparent",
      data: {
        values,
      },
      mark: {
        type: "bar",
        color: theme.palette.primary.main,
      },
      encoding: {
        yOffset: {
          title: "Target",
          field: "group",
          sort: { field: "order", order: "descending" },
        },
        x: {
          title: "Count",
          field: "count",
          type: "quantitative",
          axis: {
            title: "Count",
            tickMinStep: 1,
          },
          scale: {
            domain: [0, maxStrikes],
          },
        },
        color: {
          title: "Type",
          field: "strikeType",
          type: "ordinal",
          scale: {
            domain: [
              "Head Misses",
              "Head Hits",

              "Body Misses",
              "Body Hits",

              "Leg Misses",
              "Leg Hits",
            ],
            range: [
              theme.palette.primary.light,
              theme.palette.primary.main,
              theme.palette.info.light,
              theme.palette.info.dark,
              theme.palette.success.light,
              theme.palette.success.dark,
            ],
            rangeMax: maxStrikes,
          },
          legend: {
            orient: smallViewport ? "bottom" : "right",
            direction: "vertical",
          },
          sort: { field: "order", order: "descending" },
        },
        order: { field: "order", order: "descending" },
        opacity: { value: 0.7 },
        tooltip: [
          { field: "strikeType", title: "Type" },
          { field: "count", title: "Count" },
        ],
      },
    }),
    [values, theme, smallViewport]
  );

  return (
    <VegaGraphCard
      title={`Significant Strikes${taken ? " Taken" : ""}`}
      vlSpec={vlSpec}
      isEmpty={!values.length}
    />
  );
};

export default FighterStrikesSummary;
