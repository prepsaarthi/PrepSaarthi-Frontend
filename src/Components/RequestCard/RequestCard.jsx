import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  clearMessage,
  updateRoleMentor,
} from "../../action/userAction";
import LoadingButton from "@mui/lab/LoadingButton";
import toast from "react-hot-toast";
import { getMentorRequest } from "../../action/metorListAction";
import Loader from "../Loader/Loader";
const RequestCard = ({ item, i }) => {
  const dispatch = useDispatch();
  const { loading, error, status } = useSelector((state) => state.roleUpdate);
  const { loading: listLoad, error: listError } = useSelector(
    (state) => state.requestList
  );
  const [loaderButton, setLoad] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (status?.success) {
      toast.success(status.message);
      dispatch(clearMessage());
      dispatch(getMentorRequest());
    }
  }, [status, dispatch, error]);

  useEffect(() => {
    if (listError) {
      toast.error(listError.message);
    }
  }, [listError]);
  return (
    <>
      {listLoad ? (
        <Loader />
      ) : (
        <Grid key={i} item xs={12} sm={6} lg={4}>
          <Card
            sx={{
              width: { xs: "100%", lg: "90%" },
              height: { xs: 180, md: 200, xl: "14vmax" },
              display: "flex",
              margin: "0 auto",
              alignItems: "center",
              paddingLeft: "2vmax",
              mt: "2vmax",
              borderRadius: "1.5vmax",
            }}
          >
            <CardMedia
              component="img"
              alt={item.name}
              image={item?.avatar?.public_URI}
              sx={{
                width: { xs: 100, md: 125, lg: "8vmax" },
                aspectRatio: "1/1",
                borderRadius: "50%",
              }}
            />
            <Box sx={{ display: { xs: "block" } }}>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{
                    fontSize: { xs: "2.5vmax", lg: "1.8vmax" },
                    fontWeight: 500,
                  }}
                >
                  {item.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  component="div"
                  sx={{ fontSize: { lg: "0.8vmax" } }}
                >
                  {item.college}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  component="div"
                  sx={{ fontSize: { lg: "0.8vmax" } }}
                >
                  {item.exam?.name === "jeemains" && (
                    <span>JEE MAINS({item.exam?.rank})</span>
                  )}
                  {item.exam?.name === "jeeadv" && (
                    <span>JEE ADV({item.exam?.rank})</span>
                  )}
                  {item.exam?.name === "bitsat" && (
                    <span>BITSAT({item.exam?.rank})</span>
                  )}
                </Typography>
              </CardContent>
              <CardActions>
                {item?.isApproved === "yes" ? (
                  <LoadingButton
                    sx={{
                      width: { xs: "8vmax", lg: "6vmax" },
                      fontSize: {
                        xs: "1.2vmax",
                        lg: "0.8vmax",
                      },
                    }}
                    size="medium"
                    variant="contained"
                    color="error"
                    name="removeAprrove"
                    loading={loaderButton === "removeAprrove" && loading}
                    onClick={(e) => {
                      dispatch(
                        updateRoleMentor({ id: item?._id, role: "user" })
                      );
                      setLoad(e.target.name);
                    }}
                  >
                    Remove
                  </LoadingButton>
                ) : item?.isRejected === "yes" ? (
                  <LoadingButton
                    sx={{
                      width: { xs: "8vmax", lg: "6vmax" },
                      fontSize: {
                        xs: "1.2vmax",
                        lg: "0.8vmax",
                      },
                    }}
                    variant="contained"
                    size="medium"
                    name="approveRejected"
                    loading={loaderButton === "approveRejected" && loading}
                    onClick={(e) => {
                      dispatch(
                        updateRoleMentor({ id: item?._id, role: "mentor" })
                      );
                      setLoad(e.target.name);
                    }}
                  >
                    Approve
                  </LoadingButton>
                ) : (
                  <>
                    <LoadingButton
                      sx={{
                        width: { xs: "8vmax", lg: "6vmax" },
                        fontSize: {
                          xs: "1.2vmax",
                          lg: "0.8vmax",
                        },
                      }}
                      variant="contained"
                      name="approvePending"
                      size="medium"
                      loading={loaderButton === "approvePending" && loading}
                      onClick={(e) => {
                        dispatch(
                          updateRoleMentor({ id: item?._id, role: "mentor" })
                        );
                        setLoad(e.target.name);
                      }}
                    >
                      Approve
                    </LoadingButton>
                    <LoadingButton
                      sx={{
                        width: { xs: "8vmax", lg: "6vmax" },
                        fontSize: {
                          xs: "1.2vmax",
                          lg: "0.8vmax",
                        },
                      }}
                      size="medium"
                      variant="contained"
                      color="error"
                      name="removePending"
                      loading={loaderButton === "removePending" && loading}
                      onClick={(e) => {
                        dispatch(
                          updateRoleMentor({ id: item?._id, role: "user" })
                        );
                        setLoad(e.target.name);
                      }}
                    >
                      Reject
                    </LoadingButton>
                  </>
                )}
              </CardActions>
            </Box>
          </Card>
        </Grid>
      )}
    </>
  );
};

export default RequestCard;
