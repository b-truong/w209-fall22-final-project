/** @jsxImportSource @emotion/react */

import {
  Stack,
  Switch,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { DSVRowString } from "d3";
import { TopLevelSpec } from "vega-lite";
import { useFighterStrikes } from "../DataProvider";
import { useCallback, useMemo, useState } from "react";
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
const FighterStrikes: React.FC<IFighterStrikes> = ({ selected, taken }) => {
  const theme = useTheme();
  let fighterStrikes = useFighterStrikes(selected?.fighter ?? "");
  const smallViewport = useMediaQuery("(max-width: 500px)");

  // Transform strike data for stacked area chart
  const [strikes, onlyOne] = useMemo(() => {
    if (!fighterStrikes.length) {
      return [[], false];
    }

    // Check if there is only one year of data
    const date = new Date(fighterStrikes[0].date ?? "");
    let onlyOne = true;
    for (const row of fighterStrikes) {
      if (new Date(row.date ?? "").getFullYear() !== date.getFullYear()) {
        onlyOne = false;
        break;
      }
    }

    // Transform strike data
    const strikes = fighterStrikes.reduce((strikes: any[], fight) => {
      const columns = taken ? fighterStrikeTakenColumns : fighterStrikeColumns;
      columns.forEach(([strikeType, strikeTitle], index) => {
        strikes.push({
          date: fight.date,
          strikeType: strikeTitle,
          count: fight[strikeType],
          order: index,
        });
      });
      return strikes;
    }, []);

    return [strikes, onlyOne];
  }, [fighterStrikes, taken]);

  // Whether to normalize area chart
  const [normalize, setNormalize] = useState(false);
  const onNormalize = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
      setNormalize(checked);
    },
    []
  );

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
        type: onlyOne ? "bar" : "area",
        color: theme.palette.primary.main,
        line: true,
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
          title: "Hits",
          field: "count",
          type: "quantitative",
          aggregate: "sum",
          scale: {
            domainMin: 0,
          },
          axis: {
            title: "Hits",
            tickMinStep: normalize ? 0.1 : 1,
          },
          stack: normalize ? "normalize" : undefined,
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
        },
        order: { field: "order" },
        opacity: { value: 0.7 },
        tooltip: [
          { field: "strikeType", title: "Type" },
          { field: "count", title: "Count", aggregate: "sum" },
          { field: "date", title: "Year", timeUnit: "year" },
        ],
      },
    }),
    [strikes, theme, normalize, onlyOne, smallViewport]
  );

  return (
    <VegaGraphCard
      title={`Significant Strikes${taken ? " Taken" : ""}`}
      vlSpec={vlSpec}
      isEmpty={!strikes.length}
    >
      <Stack direction="row">
        <Typography>Normalize:</Typography>
        <Switch size="small" onChange={onNormalize} />
      </Stack>
    </VegaGraphCard>
  );
};

export default FighterStrikes;
