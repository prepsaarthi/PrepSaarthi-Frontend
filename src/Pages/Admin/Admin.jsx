import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Dashboard from "./Dashboard";
import Requests from "./Requests";
// import Connection from "./Connection";
// import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { Divider } from "@mui/material";
import Students from "../Students/Students";
import MentorAll from "../MentorAll/MentorAll.jsx";
import AllAdmin from "../AllAdmin/AllAdmin.jsx";
import Allconnction from "./Allconnction.jsx";
import MetaData from "../../utils/Metadata.jsx";

export default function AdminDashboard() {
  const [open, setOpen] = useState(false);
  const [menudata, setMenuData] = useState("Dashboard");

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  useEffect(() => {
    const page = sessionStorage.getItem("menu");
    if (Boolean(page)) {
      setMenuData(page);
    }
  }, []);

  const naviagteMenu = (text) => {
    setMenuData(text);
    sessionStorage.setItem("menu", text);
  };

  const dataset = [
    {
      label: "Jan",
      student: 23,
      mentor: 14,
    },
    {
      label: "Feb",
      student: 33,
      mentor: 17,
    },
    {
      label: "March",
      student: 13,
      mentor: 4,
    },
    {
      label: "April",
      student: 3,
      mentor: 0,
    },
    {
      label: "May",
      student: 2,
      mentor: 1,
    },
    {
      label: "June",
      student: 3,
      mentor: 0,
    },
    {
      label: "July",
      student: 0,
      mentor: 0,
    },
    {
      label: "Aug",
      student: 0,
      mentor: 14,
    },
    {
      label: "Sept",
      student: 0,
      mentor: 1,
    },
    {
      label: "Oct",
      student: 3,
      mentor: 1,
    },
    {
      label: "Nov",
      student: 3,
      mentor: 12,
    },
    {
      label: "Dec",
      student: 33,
      mentor: 4,
    },
  ];
  // const dataset2 = [
  //   {
  //     label: "Jan1",
  //     student: 23,
  //     mentor: 14,
  //   },
  //   {
  //     label: "Feb",
  //     student: 33,
  //     mentor: 17,
  //   },
  //   {
  //     label: "March",
  //     student: 13,
  //     mentor: 4,
  //   },
  //   {
  //     label: "April",
  //     student: 3,
  //     mentor: 0,
  //   },
  //   {
  //     label: "May",
  //     student: 2,
  //     mentor: 1,
  //   },
  //   {
  //     label: "June",
  //     student: 3,
  //     mentor: 0,
  //   },
  //   {
  //     label: "July",
  //     student: 0,
  //     mentor: 0,
  //   },
  //   {
  //     label: "Aug",
  //     student: 0,
  //     mentor: 14,
  //   },
  //   {
  //     label: "Sept",
  //     student: 0,
  //     mentor: 1,
  //   },
  //   {
  //     label: "Oct",
  //     student: 3,
  //     mentor: 1,
  //   },
  //   {
  //     label: "Nov",
  //     student: 3,
  //     mentor: 12,
  //   },
  //   {
  //     label: "Dec",
  //     student: 33,
  //     mentor: 4,
  //   },
  // ];

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List sx={{ display: "flex", flexDirection: "column" }}>
        {[
          "Dashboard",
          "Request",
          "Connection",
          "Students",
          "Mentors",
          "Admins",
        ].map((text, index) => (
          <ListItem
            key={text}
            disablePadding
            onClick={() => naviagteMenu(text)}
          >
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      <MetaData title="Admin Dashboard" />
      <Box display="flex" justifyContent="flex-end" bgcolor="var(--text2)">
        <Button onClick={toggleDrawer(true)} sx={{ color: "var(--button1)" }}>
          Admin Menu
        </Button>
      </Box>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        {menudata === "Dashboard" && <Dashboard />}
        {menudata === "Request" && <Requests />}
        {menudata === "Connection" && <Allconnction />}
        {menudata === "Students" && <Students />}
        {menudata === "Mentors" && <MentorAll />}
        {menudata === "Admins" && <AllAdmin />}
      </Box>
      <Box>
        {/* <Line
          data={{
            labels: dataset.map((data) => data.label),
            datasets: [
              {
                label: "Student",
                data: dataset.map((d) => d.student),
                backgroundColor: "#064FF0",
                borderColor: "#064FF0",
              },
              {
                label: "Mentor",
                data: dataset.map((d) => d.mentor),
                backgroundColor: "#FF3030",
                borderColor: "#FF3030",
              },
            ],
          }}
          options={{
            elements: {
              line: {
                tension: 0.5,
              },
            },
          }}
        /> */}
      </Box>
    </div>
  );
}
