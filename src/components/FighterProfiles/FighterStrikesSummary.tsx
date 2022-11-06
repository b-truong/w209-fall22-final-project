/** @jsxImportSource @emotion/react */

import { useMediaQuery, useTheme } from "@mui/material";
import { DSVRowString } from "d3";
import { TopLevelSpec } from "vega-lite";
import { useFighterStrikes } from "../DataProvider";
import { useMemo } from "react";
import { getVegaConfig } from "../theme";
import VegaGraphCard from "./VegaGraphCard";

interface IFighterStrikes {
  /** The selected fighter */
  selected: DSVRowString;
  /** Whether to display strikes taken instead of given */
  taken?: boolean;
}

const fighterStrikeColumns = [
  ["leg", "Leg Hits"],
  ["leg_misses", "Leg Misses"],
  ["body", "Body Hits"],
  ["body_misses", "Body Misses"],
  ["head", "Head Hits"],
  ["head_misses", "Head Misses"],
];

const fighterStrikeTakenColumns = [
  ["opponent_leg", "Leg Hits"],
  ["opponent_leg_misses", "Leg Misses"],
  ["opponent_body", "Body Hits"],
  ["opponent_body_misses", "Body Misses"],
  ["opponent_head", "Head Hits"],
  ["opponent_head_misses", "Head Misses"],
];

/**
 * Display chart with fighter win rate
 */
const FighterStrikesSummary: React.FC<IFighterStrikes> = ({
  selected,
  taken,
}) => {
  const theme = useTheme();
  let fighterStrikes = useFighterStrikes(selected?.fighter ?? "");
  const smallViewport = useMediaQuery("(max-width: 500px)");

  // Transform strike data for stacked area chart
  const strikes = useMemo(() => {
    if (!fighterStrikes.length) {
      return [[], false];
    }

    const columns = taken ? fighterStrikeTakenColumns : fighterStrikeColumns;

    // Transform strike data
    const strikes = fighterStrikes.reduce((strikes: any[], fight) => {
      columns.forEach(([strikeType, strikeTitle], index) => {
        strikes.push({
          date: fight.date,
          strikeType: strikeTitle,
          count: fight[strikeType],
        });
      });
      return strikes;
    }, []);

    // Accumulate
    const strikesTally: Record<string, number> = {};
    strikes.forEach(({ strikeType, count }) => {
      const current = strikesTally[strikeType] ?? 0;
      strikesTally[strikeType] = current + Number(count);
    });

    // Transform into data array
    return Object.entries(strikesTally).map(([key, value]) => ({
      strikeType: key,
      count: value,
      order: columns.findIndex((column) => column[1] === key),
      group: key.split(" ")[0],
    }));
  }, [fighterStrikes, taken]);

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
        values: strikes,
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
    [strikes, theme, smallViewport]
  );

  return (
    <VegaGraphCard
      title={`Significant Strikes${taken ? " Taken" : ""}`}
      vlSpec={vlSpec}
      isEmpty={!strikes.length}
    />
  );
};

export default FighterStrikesSummary;
