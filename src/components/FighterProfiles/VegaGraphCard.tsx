/** @jsxImportSource @emotion/react */

import { Card, Stack, Typography, useTheme } from "@mui/material";
import { TopLevelSpec } from "vega-lite";
import embed from "vega-embed";
import { useEffect, useMemo } from "react";
import getStyles from "./VegaGraphCard.styles";

interface IVegaGraphCard {
  /** Titla of the visualization */
  title: string;
  /** The Vega-Lite specification */
  vlSpec: TopLevelSpec;
  /** If the data is empty */
  isEmpty?: boolean;
}

/**
 * Display chart with fighter win rate
 */
const VegaGraphCard: React.FC<IVegaGraphCard> = ({
  title,
  vlSpec,
  isEmpty,
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  // Generate unique ID
  const id = useMemo(
    () => `vl-viz-${Math.random().toString(36).substring(2, 15)}`,
    []
  );

  // Embed VL visualization
  useEffect(() => {
    if (!isEmpty) {
      embed(`#${id}`, vlSpec, { actions: false, renderer: "svg" });
    }
  }, [vlSpec, isEmpty, id]);

  return (
    <Card>
      <Typography css={styles.title}>{title}</Typography>
      {/* Key based on empty state to regenerate component and display empty state */}
      <Stack id={id} css={styles.stack} key={String(isEmpty)}>
        <Typography css={styles.empty}>No fighter selected</Typography>
      </Stack>
    </Card>
  );
};

export default VegaGraphCard;
