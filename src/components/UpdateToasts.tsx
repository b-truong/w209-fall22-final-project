/** @jsxImportSource @emotion/react */

import {
  Button,
  IconButton,
  Paper,
  Snackbar,
  SnackbarOrigin,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ServiceWorkerEvents } from "../service-register";
import CloseIcon from "@mui/icons-material/Close";

import Observer from "./Observer";
import getStyles from "./UpdateToasts.styles";

interface IUpdateToasts {
  swEventObserver: Observer<ServiceWorkerEvents>;
}

const anchor: SnackbarOrigin = {
  vertical: "bottom",
  horizontal: "center",
};

/**
 * Display toasts after service worker updates or installs
 */
const UpdateToasts: React.FC<IUpdateToasts> = ({ swEventObserver }) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const handleEvents = useCallback((event: ServiceWorkerEvents) => {
    switch (event) {
      case ServiceWorkerEvents.Installed:
        // setInstalled(true); // TODO: figure out how to cache Tableau visualizations
        break;
      case ServiceWorkerEvents.Updated:
      default:
        setUpdated(true);
        break;
    }
  }, []);

  useEffect(() => {
    swEventObserver.subscribe(handleEvents);
  }, [swEventObserver, handleEvents]);

  const [isInstalled, setInstalled] = useState(false);
  const resetInstalled = useCallback(() => setInstalled(false), []);
  const installToast = useMemo(() => {
    return (
      <Snackbar
        anchorOrigin={anchor}
        open={isInstalled}
        onClose={resetInstalled}
        autoHideDuration={4000}
      >
        <Paper>
          <Stack direction="row" spacing={2} css={styles.toast}>
            <Typography>
              Content cached. Offline use is now available.
            </Typography>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={resetInstalled}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Paper>
      </Snackbar>
    );
  }, [isInstalled, resetInstalled, styles]);

  const [isUpdated, setUpdated] = useState(false);
  const resetUpdated = useCallback(() => setUpdated(false), []);
  const updateToast = useMemo(() => {
    const reload = () => {
      window.location.reload();
      resetUpdated();
    };

    return (
      <>
        <Snackbar anchorOrigin={anchor} open={isUpdated}>
          <Paper elevation={3}>
            <Stack direction="row" spacing={2} css={styles.toast}>
              <Typography>Finished retrieving new changes.</Typography>
              <Stack direction="row" spacing={1} css={styles.toastButtonStack}>
                <Button onClick={reload} variant="contained">
                  VIEW
                </Button>
                <IconButton
                  size="small"
                  aria-label="close"
                  color="inherit"
                  onClick={resetUpdated}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Stack>
            </Stack>
          </Paper>
        </Snackbar>
      </>
    );
  }, [isUpdated, resetUpdated, styles]);

  return (
    <>
      {installToast}
      {updateToast}
    </>
  );
};

export default UpdateToasts;
