"use client";

import {
  Box,
  Button,
  Container,
  Grid,
  Modal,
  Stack,
  TextField,
  Typography,
  Snackbar,
  Slide,
  Alert,
  CircularProgress,
  Chip,
} from "@mui/material";
import styles from "./page.module.css";
import Balancer from "react-wrap-balancer";
import { grey } from "@mui/material/colors";
import { theme } from "theme";
import { useState, FormEvent } from "react";
import CheckIcon from "@mui/icons-material/Check";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { supabase } from "utils";
import { nanoid } from "nanoid";

export default function Home() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [generatedId, setGeneratedId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onCloseModal = () => {
    setIsModalVisible(false);
  };
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const url = event.currentTarget.url.value;
    event.currentTarget.url.value = "";
    setIsLoading(true);
    const id = nanoid(4);
    await supabase
      .from("url")
      .insert({ id: id, url })
      .then(() => {
        setGeneratedId(id);
        setIsModalVisible(true);
        setIsLoading(false);
      });
  };

  const onClickCopy = () => {
    navigator.clipboard.writeText(`www.quurls.com/data/${generatedId}`);
    setIsNotificationVisible(true);
    setIsModalVisible(false);
  };

  const onCloseNotifications = () => {
    setIsNotificationVisible(false);
  };

  return (
    <form onSubmit={onSubmit}>
      <main className={styles.main}>
        <Container maxWidth="md">
          <Stack
            spacing={6}
            minHeight="100vh"
            justifyContent="center"
            alignItems="center"
          >
            <Stack spacing={3} textAlign="center" alignItems="center">
              <Chip label="Experimental" />
              <Typography variant="h2" fontWeight="900" lineHeight="6.5vh">
                <Balancer>Easier way to shorten your loooong URL </Balancer>
              </Typography>
              <Typography
                variant="h6"
                color={grey[600]}
                fontWeight={400}
                maxWidth="sm"
              >
                <Balancer>
                  Streamline lengthy web addresses with a URL shortener tool,
                  perfect for smoother online journeys and seamless sharing
                </Balancer>
              </Typography>
            </Stack>
            <Grid
              container
              rowGap={3}
              columnGap={2}
              alignItems="center"
              maxWidth="sm"
            >
              <Grid item xs={12} sm={7.5}>
                <TextField
                  type="url"
                  required
                  placeholder="https://www.example.com"
                  hiddenLabel
                  variant="outlined"
                  size="medium"
                  fullWidth
                  id="url"
                />
              </Grid>
              <Grid item xs={12} sm={3.5}>
                <Button
                  disabled={isLoading}
                  fullWidth
                  variant="contained"
                  size="large"
                  type="submit"
                >
                  {isLoading ? <CircularProgress size={25} /> : "Shorten URL"}
                </Button>
              </Grid>
            </Grid>
          </Stack>
        </Container>
      </main>
      <Modal open={isModalVisible} onClose={onCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,

            [theme.breakpoints.down("sm")]: {
              position: "absolute",
              bottom: 0,
              width: "100vw",
              transform: "none",
              left: 0,
              bgcolor: "background.paper",
              borderRadius: "1rem 1rem  0 0",
              top: "40%",
            },
          }}
        >
          <Stack spacing={3}>
            <Stack spacing={3} textAlign="center" alignItems="center">
              <CheckCircleIcon sx={{ fontSize: "5rem" }} color="success" />
              <Stack spacing={1}>
                <Typography variant="h6" fontWeight={700}>
                  <Balancer>Shortened URL Generated</Balancer>
                </Typography>
                <Typography variant="body2">
                  <Balancer>
                    Your shortened URL is ready. Click below to copy it to your
                    clipboard.
                  </Balancer>
                </Typography>
              </Stack>
            </Stack>
            <Box bgcolor={grey[100]} p={2} borderRadius={1} textAlign="center">
              <Typography fontWeight="500">{`www.quurls.com/data/${generatedId}`}</Typography>
            </Box>
            <Button
              fullWidth
              variant="contained"
              type="submit"
              onClick={onClickCopy}
            >
              Copy URL
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={isNotificationVisible}
        autoHideDuration={2000}
        onClose={onCloseNotifications}
        TransitionComponent={Slide}
      >
        <Alert
          onClose={onCloseNotifications}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
          icon={<CheckIcon fontSize="inherit" />}
        >
          Link have been copied
        </Alert>
      </Snackbar>
    </form>
  );
}
