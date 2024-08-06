"use client";

import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Line, Bar, Pie } from "react-chartjs-2";
import { getOrder } from "../../../api/actions/order.action";
import { Grid } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const lineOptions: ChartOptions<"line"> = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Line Chart",
    },
  },
};

const barOptions: ChartOptions<"bar"> = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Bar Chart",
    },
  },
};

const pieOptions: ChartOptions<"pie"> = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Pie Chart",
    },
  },
};

const AdminDashboard = () => {
  const [categoryCounts, setCategoryCounts] = useState({});
  const [monthlyOrders, setMonthlyOrders] = useState({});
  const [monthlyProfit, setMonthlyProfit] = useState({});

  const lineData = {
    labels: Object.keys(monthlyOrders),
    datasets: [
      {
        label: "Orders per Month",
        data: Object.values(monthlyOrders),
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  const barData = {
    labels: Object.keys(monthlyProfit),
    datasets: [
      {
        label: "Profit per Month",
        data: Object.values(monthlyProfit),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: Object.keys(categoryCounts),
    datasets: [
      {
        label: "Orders per Category",
        data: Object.values(categoryCounts),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    const getData = async () => {
      try {
        let result = await getOrder();
        result = JSON.parse(result);

        if (!Array.isArray(result)) {
          throw new Error("Data is not in expected format");
        }

        const ordersPerMonth = result.reduce((acc, order) => {
          const month = new Date(order.createdAt).toLocaleString("default", {
            month: "long",
          });
          acc[month] = (acc[month] || 0) + 1;
          return acc;
        }, {});

        setMonthlyOrders(ordersPerMonth);

        const ordersPerCategory = result.reduce((acc, order) => {
          const category = order.productId.category || "Unknown";
          acc[category] = (acc[category] || 0) + 1;
          return acc;
        }, {});

        setCategoryCounts(ordersPerCategory);

        const profitPerMonth = result.reduce((acc, order) => {
          const month = new Date(order.createdAt).toLocaleString("default", {
            month: "long",
          });
          const profit = order.productId.basePrice * order.quantity;
          acc[month] = (acc[month] || 0) + profit;
          return acc;
        }, {});

        setMonthlyProfit(profitPerMonth);
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };
    getData();
  }, []);

  return (
    <div>
      <Grid sx={{ padding: "20px" }} spacing={3} container component="main">
        <Grid item xs={12} sm={12} md={6}>
          <Line data={lineData} options={lineOptions} />
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
          <Bar data={barData} options={barOptions} />
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <div className="flex items-center justify-center mt-10">
            <div className=" md:w-[50%]">
              <Pie data={pieData} options={pieOptions} />
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminDashboard;
