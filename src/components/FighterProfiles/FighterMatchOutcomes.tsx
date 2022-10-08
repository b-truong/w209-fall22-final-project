/** @jsxImportSource @emotion/react */

import { Card, Stack, Typography, useTheme } from "@mui/material";
import { DSVRowString } from "d3";
import { TopLevelSpec } from "vega-lite";
import embed from "vega-embed";
import { useFighterFights } from "../DataProvider";
import { useEffect, useMemo } from "react";
import { getVegaConfig } from "../theme";
import getStyles from "./FighterMatchOutcomes.styles";

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
  const styles = getStyles(theme);
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

  // Generate unique ID
  const id = useMemo(
    () => `vl-viz-${Math.random().toString(36).substring(2, 15)}`,
    []
  );

  // Embed VL visualization
  useEffect(() => {
    if (fights.length) {
      embed(`#${id}`, vlSpec, { actions: false, renderer: "svg" });
    }
  }, [vlSpec, fights.length, id]);

  return (
    <Card>
      <Typography css={styles.title}>Match Outcome History</Typography>
      <Stack id={id} css={styles.stack} key={selected.fighter}>
        <Typography css={styles.empty}>No fighter selected</Typography>
      </Stack>
    </Card>
  );
};

export default FighterMatchOutcomes;
