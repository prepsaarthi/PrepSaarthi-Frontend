import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
  styled,
} from "@mui/material";
import React from "react";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import SchoolIcon from "@mui/icons-material/School";
import FaceIcon from "@mui/icons-material/Face";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
const earning = 2000;
const students = 103;
const mentors = 90;
const connections = 50;
const Dashboard = () => {
  const CustomIconWrapper = styled("div")(({ variant }) => ({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0.5vmax",
    color: "white",
    width: { xs: "3vmax", sm: "2vmax", md: "1.8vmax" },
    height: { xs: "3vmax", sm: "2vmax", md: "1.8vmax" },
    fontSize: { xs: "3vmax", sm: "2vmax", md: "1.8vmax" },
    backgroundColor:
      variant === "rupee"
        ? "var(--button1)"
        : variant === "mentor"
        ? "crimson"
        : variant === "student"
        ? "pink"
        : variant === "connection"
        ? "blue"
        : "",
    borderRadius: "50%",
  }));

  const CustomIcon = ({ icon, variant }) => {
    return <CustomIconWrapper variant={variant}>{icon}</CustomIconWrapper>;
  };
  const cards = [
    {
      name: "Earning",
      total: earning,
      icon: <CustomIcon icon={<CurrencyRupeeIcon />} variant={"rupee"} />,
    },
    {
      name: "Student",
      total: students,
      icon: <CustomIcon icon={<FaceIcon />} variant={"student"} />,
    },
    {
      name: "Mentors",
      total: mentors,
      icon: <CustomIcon icon={<SchoolIcon />} variant={"mentor"} />,
    },
    {
      name: "Connections",
      total: connections,
      icon: <CustomIcon icon={<SyncAltIcon />} variant={"connection"} />,
    },
  ];
  return (
    <>
      <Grid container spacing={2}>
        {cards.map((item, i) => (
          <Grid key={i} item xs={12} sm={6} md={3}>
            <Card sx={{ width: "100%", borderRadius: "2vmax" }}>
              <CardActionArea
                sx={{
                  width: "100%",
                  height: { sm: "22vmax" },
                  alignItems: "center",
                  justifyContent: "flex-start",
                  display: "flex",
                }}
              >
                <CardContent>
                  {item.icon}
                  <Typography
                    sx={{ fontSize: 20, fontWeight: 600 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {item.name}
                  </Typography>
                  <Typography variant="h3">
                    {item.total.toLocaleString("en-IN")}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Dashboard;
