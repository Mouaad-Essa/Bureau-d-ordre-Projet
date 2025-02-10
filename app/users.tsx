import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table";

type User = {
  name: string;
  email: string;
  password: string;
  establishment: string;
};

const UserList = () => {
  const [users, setUsers] = useState<User[]>([
    { name: "mohammed", email: "mohammed@example.com", password: "moha1234", establishment: "Université A" },
    { name: "sawsan", email: "sawsan@example.com", password: "08092001", establishment: "Université B" },
    { name: "ayman", email: "ayman@example.com", password: "123456789", establishment: "Université C" },
  ]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Liste des Utilisateurs</h1>
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell><strong>Nom</strong></TableCell>
                <TableCell><strong>Email</strong></TableCell>
                <TableCell><strong>Mot de Passe</strong></TableCell>
                <TableCell><strong>Établissement</strong></TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={index}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.password}</TableCell>
                  <TableCell>{user.establishment}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserList;
