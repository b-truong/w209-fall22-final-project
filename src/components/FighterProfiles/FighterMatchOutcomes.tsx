/** @jsxImportSource @emotion/react */

import { Stack, Switch, Typography, useTheme } from "@mui/material";
import { DSVRowString } from "d3";
import { TopLevelSpec } from "vega-lite";
import { useFighterFights } from "../DataProvider";
import { useCallback, useMemo, useState } from "react";
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

  // Check if there is only one year of data
  const onlyOne = useMemo(() => {
    if (!fights.length) {
      return false;
    }

    const date = new Date(fights[0].date ?? "");
    let onlyOne = true;
    for (const row of fights) {
      if (new Date(row.date ?? "").getFullYear() !== date.getFullYear()) {
        onlyOne = false;
        break;
      }
    }
    return onlyOne;
  }, [fights]);

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
      height: 286,
      padding: 16,
      autosize: {
        type: "fit",
        contains: "padding",
      },
      background: "transparent",
      data: {
        values: fights,
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
          title: "Matches",
          field: "outcome",
          type: "quantitative",
          aggregate: "count",
          scale: {
            domainMin: 0,
          },
          axis: {
            title: "Matches",
            tickMinStep: normalize ? 0.1 : 1,
          },
          stack: normalize ? "normalize" : undefined,
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
        opacity: { value: 0.7 },
        tooltip: [
          { field: "outcome", title: "Outcome" },
          { field: "outcome", title: "Matches", aggregate: "count" },
          { field: "date", title: "Year", timeUnit: "year" },
        ],
      },
    }),
    [fights, theme, normalize]
  );

  return (
    <VegaGraphCard
      title="Match Outcome History"
      vlSpec={vlSpec}
      isEmpty={!fights.length}
    >
      <Stack direction="row">
        <Typography>Normalize:</Typography>
        <Switch size="small" onChange={onNormalize} />
      </Stack>
    </VegaGraphCard>
  );
};

export default FighterMatchOutcomes;
