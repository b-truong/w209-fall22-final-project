/** @jsxImportSource @emotion/react */

import { Card, Stack, Typography, useTheme } from "@mui/material";
import { TopLevelSpec } from "vega-lite";
import embed from "vega-embed";
import { useEffect, useMemo } from "react";
import getStyles from "./VegaGraphCard.styles";
import { LayoutSizeMixins } from "vega-lite/build/src/spec";

interface IVegaGraphCard extends React.PropsWithChildren {
  /** Titla of the visualization */
  title: string;
  /** The Vega-Lite specification */
  vlSpec: TopLevelSpec & LayoutSizeMixins;
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
  children,
}) => {
  const theme = useTheme();
  const styles = getStyles(theme, Number(vlSpec.height));

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
      <Stack css={styles.title}>
        <Typography>{title}</Typography>
        {children}
      </Stack>
      {/* Key based on empty state to regenerate component and display empty state */}
      <Stack id={id} css={styles.stack} key={String(isEmpty)}>
        <Typography css={styles.empty}>No fighter selected</Typography>
      </Stack>
    </Card>
  );
};

export default VegaGraphCard;
