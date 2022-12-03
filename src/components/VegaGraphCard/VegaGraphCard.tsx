/** @jsxImportSource @emotion/react */

import {
  Button,
  Card,
  LinearProgress,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { TopLevelSpec } from "vega-lite";
import embed from "vega-embed";
import { useEffect, useMemo } from "react";
import getStyles from "./VegaGraphCard.styles";
import { LayoutSizeMixins } from "vega-lite/build/src/spec";

interface IVegaGraphCard extends React.PropsWithChildren {
  /** Title of the visualization */
  title: string;
  /** The Vega-Lite specification */
  vlSpec: TopLevelSpec & LayoutSizeMixins;
  /** If the data is empty */
  isLoading?: boolean;
  /** If there is an error message */
  errorMessage?: string;
  /** If there is a retry method */
  onRetry?: () => void;
}

/**
 * Display chart with fighter win rate
 */
const VegaGraphCard: React.FC<IVegaGraphCard> = ({
  title,
  vlSpec,
  children,
  isLoading,
  errorMessage,
  onRetry,
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
    if (isLoading || errorMessage) {
      return;
    }

    embed(`#${id}`, vlSpec, { actions: false, renderer: "svg" });
  }, [vlSpec, id, isLoading, errorMessage]);

  const body = useMemo(() => {
    if (errorMessage) {
      return (
        <Stack css={styles.errorBox}>
          <Typography css={styles.errorMessage}>
            Error: {errorMessage}
          </Typography>
          {onRetry && (
            <Button
              onClick={onRetry}
              variant="contained"
              css={styles.retryButton}
            >
              Retry
            </Button>
          )}
        </Stack>
      );
    }
  }, [errorMessage, onRetry, styles]);

  return (
    <Card>
      <LinearProgress sx={{ visibility: isLoading ? "visible" : "hidden" }} />
      <Stack css={styles.title}>
        <Typography>{title}</Typography>
        {children}
      </Stack>
      {/* Key based on empty state to regenerate component and display other states */}
      <Stack
        id={id}
        css={styles.stack}
        key={JSON.stringify(vlSpec) + errorMessage}
      >
        {body}
      </Stack>
    </Card>
  );
};

export default VegaGraphCard;
