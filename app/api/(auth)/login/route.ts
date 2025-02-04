import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";


const prisma = new PrismaClient();


// JWT Secret Key (should be stored in .env)

const JWT_SECRET = process.env.JWT_SECRET || "33e3093a466cfba5c15031ae601e1da921502752990d545a31d2ce3a55be496d";


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

});


if (!user || !user.password) {

    return NextResponse.json({ error: "Utilisateur introuvable ou mot de passe manquant." }, { status: 404 });

}


// Compare password with hashed password in DB

const passwordMatch = await bcrypt.compare(password, user.password);

if (!passwordMatch) {

return NextResponse.json({ error: "Mot de passe incorrect." }, { status: 401 });

}


// Generate JWT Token

const token = jwt.sign(

{ id: user.id, email: user.email, role: user.roleId },

JWT_SECRET,

{ expiresIn: "1h" }

);


// Return token to client

return NextResponse.json({ token, user }, { status: 200 });


} catch (error) {

console.error("Login Error:", error);

return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });

}

}