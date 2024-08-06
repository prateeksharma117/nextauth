"use client";

import { useEffect, useState } from "react";
import moment from "moment";
import { getAllUser } from "../../../api/actions/user.action";
import { UserData } from "../../../../type_interface/user";
import { UserTableCell } from "../../../../components/Constants";
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const AdminUsers = () => {
  const [userData, setUserData] = useState<UserData[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getAllUser();
        if (typeof data === "string") {
          setUserData(JSON.parse(data));
        } else {
          console.error("Error fetching product data:", data.error);
        }
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
                {UserTableCell.map((cell, index) => (
                  <TableCell key={index} sx={{ fontWeight: "bold" }}>
                    {cell?.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {userData.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{row?.name}</TableCell>
                  <TableCell align="left">{row?.email}</TableCell>
                  <TableCell align="left">{row?.bio}</TableCell>
                  <TableCell align="left">{row?.gender}</TableCell>
                  <TableCell align="left">{row?.address}</TableCell>
                  <TableCell align="left">{row?.country}</TableCell>
                  <TableCell align="left">
                    {moment(row?.createdAt).format("DD-MM-YYYY")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
};

export default AdminUsers;
