import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";

const Logs = () => {
  const [logs, setLogs] = useState([
    {
      utilisateur: "Admin",
      email: "admin@gmail.com",
      action: "Accessed Depart index",
      date: "31/12/2024 12:09:17",
    },
    {
      utilisateur: "Admin",
      email: "admin@gmail.com",
      action: "Accessed Depart index",
      date: "31/12/2024 12:09:13",
    },
  ]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Historique des actions</h1>
      <Card className="mb-6">
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <Input
              type="text"
              placeholder="Rechercher un log..."
              className="w-1/3"
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>Utilisateur</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log, index) => (
                <TableRow key={index}>
                  <TableCell>{log.utilisateur}</TableCell>
                  <TableCell>{log.email}</TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell>{log.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Logs;
