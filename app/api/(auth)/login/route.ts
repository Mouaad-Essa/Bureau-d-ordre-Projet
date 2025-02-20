import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

import { serialize } from "cookie";

const prisma = new PrismaClient();

// JWT Secret Key (should be stored in .env)

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "33e3093a466cfba5c15031ae601e1da921502752990d545a31d2ce3a55be496d";

// Handle POST request for login

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Validate user input

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email et mot de passe sont requis." },

        { status: 400 }
      );
    }

    // Find user by email

    const user = await prisma.utilisateur.findUnique({
      where: { email },
      include: {
        role: {
          include: {
            privileges: {
              include: { privilege: true },
            },
          },
        },
      },
    });

    if (!user || !user.password) {
      return NextResponse.json(
        { error: "Utilisateur introuvable ou mot de passe manquant." },
        { status: 404 }
      );
    }

    // Compare password with hashed password in DB

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Mot de passe incorrect." },
        { status: 401 }
      );
    }

    const privilegeNames =
      user.role?.privileges.map((p) => p.privilege.nom) || [];
    const isSuperAdmin = privilegeNames.includes("isSuperAdmin");

    // Generate JWT Token

    const token = jwt.sign(
      {
        id: user.id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        role: user.roleId,
        isSuperAdmin,
        privileges: privilegeNames,
      },

      JWT_SECRET,

      { expiresIn: "1h" }
    );

    const cookie = serialize("token", token, {
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 3600,
    });

    const response = NextResponse.json({ message: "Authentification réussie" });
    response.headers.set("Set-Cookie", cookie);
    return response;

    // Return token to client

    //return NextResponse.json({ token, user }, { status: 200 });
  } catch (error) {
    console.error("Login Error:", error);

    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}