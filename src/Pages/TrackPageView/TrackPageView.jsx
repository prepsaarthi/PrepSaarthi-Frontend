import { useEffect } from "react";

function TrackPageView() {
  useEffect(() => {
    const sendPageViewCount = async () => {
      try {
        await fetch(`${process.env.REACT_APP_API_URL}/v1/api/update-counts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ type: "pageview" }),
        });
      } catch (error) {
        throw new Error("Error sending page view count:", error);
      }
    };

    const sendVisitCount = async () => {
      if (!sessionStorage.getItem("visited")) {
        try {
          await fetch(`${process.env.REACT_APP_API_URL}/v1/api/update-counts`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ type: "visit" }),
          });
          sessionStorage.setItem("visited", "true");
        } catch (error) {
          throw new Error("Error sending visit count:");
        }
      }
    };

    sendPageViewCount();
    sendVisitCount();
  }, []);

  return null;
}

export default TrackPageView;
