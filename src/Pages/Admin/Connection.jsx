import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  styled,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  assignConnection,
  clearError,
  getAllConnections,
  reset,
  resolveConnection,
} from "../../action/userAction";
import LoadingButton from "@mui/lab/LoadingButton";
import toast from "react-hot-toast";
const convertToIST = (time) => {
  const utcTimestampString = time;
  const utcTimestamp = new Date(utcTimestampString);

  utcTimestamp.setHours(utcTimestamp.getHours() + 5);
  utcTimestamp.setMinutes(utcTimestamp.getMinutes() + 30);

  const istTimestampString = utcTimestamp.toISOString();
  return istTimestampString;
};

const Connection = ({ connection }) => {
  const dispatch = useDispatch();
  const { success, loading, error } = useSelector(
    (state) => state.connectionAssign
  );
  const {
    success: rsuccess,
    loading: rloading,
    error: rerror,
  } = useSelector((state) => state.connectionResolve);
  const RoundedImg = styled("img")(({ theme }) => ({
    width: 60,
    aspectRatio: "1/1",
    borderRadius: "50%",
    objectFit: "cover",
    objectPosition: "center",
    [theme.breakpoints.up("md")]: {
      width: 100,
    },
  }));

  useEffect(() => {
    if (success) {
      toast.success("Connection is now active");
      dispatch(reset());
      dispatch(getAllConnections());
      return;
    }
    if (rsuccess) {
      toast.success("Connection is now resolved");
      dispatch(reset());
      dispatch(getAllConnections());
      return;
    }
  }, [loading, success, rloading, rsuccess, dispatch]);
  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(clearError());
      return;
    }
    if (rerror) {
      toast.error(rerror.message);
      dispatch(clearError());
      return;
    }
  }, [error, rerror,dispatch]);
  const [loader, setLoading] = useState(-1);
  return (
    <>
      {connection?.length === 0 ? (
        <h3>No Connection To show</h3>
      ) : (
        <>
          {connection?.map((item, i) => (
            <Card
              key={i}
              sx={{
                maxWidth: { xs: "100%", md: "80%" },
                m: "2vmax auto",
                height: { xs: 150, md: 180, lg: 200 },
              }}
            >
              <CardActionArea sx={{ height: "100%" }}>
                <CardContent
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <Box textAlign="center">
                    <RoundedImg
                      src={item?.studentDetails?.avatar?.public_URI}
                      alt={item?.studentDetails?.name}
                    />
                    <Typography component="p">
                      {item?.studentDetails?.name}
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    width="70%"
                  >
                    <Box
                      display={"flex"}
                      width="100%"
                      justifyContent={"center"}
                    >
                      <ArrowBackIosIcon sx={{}} />
                      ...........................
                      <ArrowForwardIosIcon />
                    </Box>
                    <Typography
                      variant="p"
                      component="span"
                      width={"100%"}
                      textAlign={"center"}
                      fontSize="1.5vmax"
                    >
                      {item?.studentDetails?.name} asked to connnect with{" "}
                      {item?.mentorDetails?.name} on{" "}
                      {convertToIST(item?.boughtAt).split("T")[1].split(".")[0]}{" "}
                      at {convertToIST(item?.boughtAt).split("T")[0]}
                    </Typography>
                    <Typography
                      variant="p"
                      component="span"
                      width={"100%"}
                      textAlign={"center"}
                      fontSize="0.8vmax"
                      color="red"
                    >
                      {item?.isConnected === false &&
                        item?.isActive === false && <>Expired</>}{" "}
                    </Typography>
                    {item?.isConnected === false && item?.isActive === true && (
                      <Box display={"flex"}>
                        <Button
                          sx={{
                            width: { xs: "10vmax", md: "8vmax" },
                            bgcolor: "#25D366",
                            mt: "2vmax",
                            fontWeight: 600,
                            fontSize: "1vmax",
                            mr: "1vmax",
                            color: "white",
                          }}
                          startIcon={<WhatsAppIcon />}
                        >
                          Connect
                        </Button>
                        <LoadingButton
                          variant="contained"
                          sx={{
                            width: { xs: "10vmax", md: "8vmax" },
                            mt: "2vmax",
                            fontWeight: 600,
                            fontSize: "1vmax",
                          }}
                          loading={loader === i && loading}
                          onClick={() => {
                            setLoading(i);
                            dispatch(assignConnection(item._id));
                          }}
                        >
                          Enable
                        </LoadingButton>
                      </Box>
                    )}
                    {item?.isConnected === true && item?.isActive === true && (
                      <Box display={"flex"}>
                        <LoadingButton
                          variant="contained"
                          sx={{
                            width: { xs: "10vmax", md: "8vmax" },
                            mt: "2vmax",
                            fontWeight: 600,
                            fontSize: "1vmax",
                            mr: "1vmax",
                          }}
                          loading={loader === i && rloading}
                          onClick={() => {
                            setLoading(i);
                            dispatch(
                              resolveConnection({
                                id: item._id,
                                sid: item?.studentDetails?._id,
                              })
                            );
                          }}
                        >
                          Resolve
                        </LoadingButton>
                      </Box>
                    )}
                  </Box>
                  <Box textAlign="center">
                    <RoundedImg
                      src={item?.mentorDetails?.avatar?.public_URI}
                      alt={item?.mentorDetails?.name}
                    />
                    <Typography component="p">
                      {item?.mentorDetails?.name}
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </>
      )}
    </>
  );
};

export default Connection;
