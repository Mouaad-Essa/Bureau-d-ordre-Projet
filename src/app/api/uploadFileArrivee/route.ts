
import { PrismaClient } from "@prisma/client";
import { writeFile } from "fs/promises";
import { join } from "path";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    console.log("📥 Upload request received");

    // Lire le formData pour gérer plusieurs fichiers
    const formData = await request.formData();
    const idArrivee = request.headers.get("idArrivee");
const files = formData.getAll("files") as File[];

    if (!idArrivee) {
      console.error("❌ Missing Arrivee ID");
      return new Response(JSON.stringify({ error: "Missing Arrivee ID" }), { status: 400 });
    }

    if (!files.length) {
      console.error("❌ No files uploaded");
      return new Response(JSON.stringify({ error: "No files uploaded" }), { status: 400 });
    }

    console.log(`📂 Processing ${files.length} files...`);

    const allowedExtensions = ["pdf", "png", "jpg", "jpeg", "docx", "xml", "doc"];
    const savedFiles = [];

    for (const file of files) {
      const buffer = await file.arrayBuffer();
      const fileBuffer = Buffer.from(buffer);

      const originalFileName = file.name;
      const fileExtension = originalFileName.split(".").pop()?.toLowerCase() || "pdf";

      if (!allowedExtensions.includes(fileExtension)) {
        console.error(`❌ Invalid file type: ${fileExtension}`);
        return new Response(JSON.stringify({ error: `File type not allowed: ${fileExtension}` }), { status: 400 });
      }

      const fileName = `${Date.now()}_${originalFileName}`;
      const filePath = join(process.cwd(), "public/uploads/arrivee", fileName);

      await writeFile(filePath, fileBuffer);
      console.log(`✅ File saved: ${filePath}`);

      // Sauvegarde dans la base de données
      const fichier = await prisma.fichier.create({
        data: {
          nom: originalFileName,
          url: `/uploads/arrivee/${fileName}`,
          dateAjout: new Date(),
          idArrivee,
        },
      });

      savedFiles.push(fichier);
    }

    console.log("✅ All files saved successfully");

    return new Response(JSON.stringify(savedFiles), { status: 201 });
  } catch (error) {
    console.error("❌ Upload error:", error);
    return new Response(JSON.stringify({ error: "Failed to upload files" }), { status: 500 });
  }
}
