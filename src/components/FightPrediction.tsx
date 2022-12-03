/** @jsxImportSource @emotion/react */

import { useMediaQuery, useTheme } from "@mui/material";
import { TopLevelSpec } from "vega-lite";
import { useMemo } from "react";
import { getVegaConfig } from "./theme";
import VegaGraphCard from "./VegaGraphCard";

interface IFighterStrikes {
  /** Red fighter name */
  redFighter: string | undefined;
  /** Chance of the red fighter winning */
  redChance: number | undefined;
  /** Red fighter name */
  blueFighter: string | undefined;
  /** Chance of the red fighter winning */
  blueChance: number | undefined;
  /** If the data is empty */
  isLoading?: boolean;
  /** If there is an error message */
  errorMessage?: string;
  /** If there is a retry method */
  onRetry?: () => void;
}

/**
 * Display prediction for given fighters
 */
const FightPrediction: React.FC<IFighterStrikes> = ({
  redFighter,
  redChance,
  blueFighter,
  blueChance,
  isLoading,
  errorMessage,
  onRetry,
}) => {
  const theme = useTheme();
  const smallViewport = useMediaQuery("(max-width: 500px)");

  // VL specification
  const vlSpec: TopLevelSpec = useMemo(
    () => ({
      config: getVegaConfig(theme),
      width: "container",
      height: 250,
      padding: 16,
      autosize: {
        type: "fit",
        contains: "padding",
      },
      background: "transparent",
      layer: [
        {
          data: {
            values:
              !redFighter || !blueFighter || !redChance || !blueChance
                ? []
                : [
                    {
                      fighter: redFighter,
                      chance: redChance,
                      order: 0,
                      group: 0,
                    },
                    {
                      fighter: blueFighter,
                      chance: blueChance,
                      order: 1,
                      group: 0,
                    },
                  ],
          },
          mark: {
            type: "bar",
            color: theme.palette.primary.main,
            size: 170,
          },
          encoding: {
            x: {
              title: "Chance",
              field: "chance",
              type: "quantitative",
              axis: {
                title: "Victory Chance",
                tickMinStep: 0.1,
              },
              scale: {
                domain: [0, 1],
              },
              stack: "normalize",
            },
            color: {
              title: "Fighter",
              field: "fighter",
              type: "ordinal",
              scale: {
                domain: [redFighter, blueFighter],
                range: [theme.palette.primary.main, theme.palette.info.dark],
                rangeMax: [0, 1],
              },
              sort: { field: "order", order: "descending" },
              legend: false,
            },
            order: { field: "order", order: "descending" },
            opacity: { value: 0.7 },
            tooltip: [
              { field: "fighter", title: "Fighter" },
              { field: "chance", title: "Chance", format: ".0%" },
            ],
          },
        },
        {
          data: {
            values:
              !redFighter || !redChance
                ? []
                : [
                    {
                      fighter: redFighter,
                      chance: [
                        `${redFighter}`,
                        `${(redChance * 100).toFixed(2)}%`,
                      ],
                      order: 0,
                    },
                  ],
          },
          mark: {
            type: "text",
            color: "white",
            size: 16,
            align: "left",
            baseline: "top",
            dx: 16,
            y: 16,
          },
          encoding: {
            x: {
              field: "order",
              type: "quantitative",
              scale: {
                domain: [0, 1],
              },
            },
            text: {
              field: "chance",
            },
          },
        },
        {
          data: {
            values:
              !blueFighter || !blueChance
                ? []
                : [
                    {
                      fighter: blueFighter,
                      chance: [
                        `${blueFighter}`,
                        `${(blueChance * 100).toFixed(2)}%`,
                      ],
                      order: 1,
                    },
                  ],
          },
          mark: {
            type: "text",
            color: "white",
            size: 16,
            align: "right",
            baseline: "bottom",
            dx: -16,
            y: 138,
          },
          encoding: {
            x: {
              field: "order",
              type: "quantitative",
              scale: {
                domain: [0, 1],
              },
            },
            text: {
              field: "chance",
            },
          },
        },
      ],
    }),
    [theme, smallViewport, redChance, redFighter, blueChance, blueFighter]
  );

  return (
    <VegaGraphCard
      title="Fight Prediction"
      vlSpec={vlSpec}
      isLoading={isLoading}
      errorMessage={errorMessage}
      onRetry={onRetry}
    />
  );
};

export default FightPrediction;
