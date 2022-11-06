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
const FighterMatchOutcomeSummary: React.FC<IFighterMatchOutcomes> = ({
  selected,
}) => {
  const theme = useTheme();
  const fights = useFighterFights(selected?.fighter ?? "");
  const smallViewport = useMediaQuery("(max-width: 500px)");

  // Aggregate data
  const values = useMemo(() => {
    if (!fights.length) {
      return [];
    }

    const losses = { outcome: "Lost", matches: 0 };
    const wins = { outcome: "Won", matches: 0 };

    fights.forEach(({ outcome }) => {
      if (outcome === "Won") {
        wins.matches += 1;
      } else {
        losses.matches += 1;
      }
    });

    return [losses, wins];
  }, [fights]);

  // VL specification
  const vlSpec: TopLevelSpec = useMemo(
    () => ({
      config: getVegaConfig(theme),
      width: "container",
      height: smallViewport ? 300 : 250,
      padding: {
        top: 16,
        bottom: 16,
        left: 16,
        right: smallViewport ? 16 : 35,
      },
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
      },
      encoding: {
        yOffset: {
          title: "Outcome",
          field: "outcome",
        },
        x: {
          title: "Matches",
          field: "matches",
          type: "quantitative",
          axis: {
            title: "Matches",
            tickMinStep: 1,
          },
        },
        color: {
          title: "Outcome",
          field: "outcome",
          type: "ordinal",
          scale: {
            domain: ["Lost", "Won"],
            range: [theme.palette.secondary.main, theme.palette.primary.main],
          },
          legend: {
            orient: smallViewport ? "bottom" : "right",
            direction: "vertical",
          },
        },
        opacity: { value: 0.7 },
        tooltip: [
          { field: "outcome", title: "Outcome" },
          { field: "matches", title: "Matches" },
        ],
      },
    }),
    [fights, theme, smallViewport]
  );

  return (
    <VegaGraphCard
      title="Match Outcomes"
      vlSpec={vlSpec}
      isEmpty={!fights.length}
    />
  );
};

export default FighterMatchOutcomeSummary;
