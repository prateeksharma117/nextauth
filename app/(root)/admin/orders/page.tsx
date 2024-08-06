"use client";

import { useEffect, useState } from "react";
import { OrderTableCell } from "../../../../components/Constants";
import { getOrder } from "../../../api/actions/order.action";
import OrderRow from "./OrderRow";
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const AdminOrders = () => {
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        let result = await getOrder();
        result = JSON.parse(result);
        if (typeof result === "string") {
          console.error("Error: getOrder() returned a string instead of an array");
          return
        }
        setOrderData(result);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    getData();
  }, []);

  return (
    <div className="bg-[#ddd] text-white rounded-md p-5">
      <Card sx={{ padding: "10px" }}>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                {OrderTableCell.map((cell, index) => (
                  <TableCell key={index} sx={{ fontWeight: "bold" }}>
                    {cell?.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {orderData.map((row: any, index) => (
                <OrderRow key={index} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
};

export default AdminOrders;
