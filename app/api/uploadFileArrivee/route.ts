// import { PrismaClient } from "@prisma/client";
// import { writeFile } from "fs/promises";
// import { join } from "path";
// import { NextResponse } from "next/server";

// const prisma = new PrismaClient();

// async function streamToBuffer(stream: AsyncIterable<Uint8Array>): Promise<Buffer> {
//   const chunks: Uint8Array[] = [];
//   for await (const chunk of stream) {
//     chunks.push(chunk);
//   }
//   return Buffer.concat(chunks);
// }

// export async function POST(request: Request) {
//   try {
//     console.log("📥 Upload request received");

//     const idArrivee = request.headers.get("IdArrivee");
//     if (!idArrivee) {
//       console.error("Missing arriveeId");
//       return new Response(JSON.stringify({ error: "Missing arriveeId" }), { status: 400 });
//     }

//     if (!request.body) {
//       console.error(" No file received");
//       return new Response(JSON.stringify({ error: "No file uploaded" }), { status: 400 });
//     }

//     console.log("📂 Processing file...");

//     const buffer = await streamToBuffer(request.body as any);
//     if (!buffer.length) {
//       console.error("Buffer is empty");
//       return new Response(JSON.stringify({ error: "File processing failed" }), { status: 400 });
//     }

//     // Extract file name and extension
//     const contentDisposition = request.headers.get("content-disposition");
//     const originalFileName = contentDisposition
//       ? contentDisposition.split("filename=")[1]?.replace(/['"]/g, "")
//       : `file_${Date.now()}.pdf`;

//     const fileExtension = originalFileName.split(".").pop() || "pdf"; // Default to PDF if no extension

//     // Restrict allowed file types
//     const allowedExtensions = ["pdf", "png", "jpg", "jpeg","docx","xml","doc"];
//     if (!allowedExtensions.includes(fileExtension.toLowerCase())) {
//       console.error("Invalid file type:", fileExtension);
//       return new Response(JSON.stringify({ error: "File type not allowed" }), { status: 400 });
//     }

//     const fileName = `${Date.now()}.${fileExtension}`;
//     const filePath = join(process.cwd(), "public/uploads/arrivee", fileName);

//     await writeFile(filePath, buffer);
//     console.log("✅ File saved at:", filePath);

//     // Save file metadata in Prisma
//     const fichier = await prisma.fichier.create({
//       data: {
//         nom: "originalFileName",
//         url: `/uploads/arrivee/${fileName}`,
//         dateAjout: new Date(),
//         idArrivee,
//       },
//     });

//     console.log("✅ File metadata saved in database");

//     return new Response(JSON.stringify(fichier), { status: 201 });
//   } catch (error) {
//     console.error("❌ Upload error:", error);
//     return new Response(JSON.stringify({ error: "Failed to upload file" }), { status: 500 });
//   }
// }
// export async function GET({ params }: { params: { idArrivee: string } }) {
//   try {
//     console.log(params);
//     const fichiers = await prisma.fichier.findMany({
//       where: { idArrivee:params.idArrivee }, // Ensure this matches your schema
//     });

//     if (fichiers.length === 0) {
//       return NextResponse.json({ error: "No files found" }, { status: 404 });
//     }

//     return NextResponse.json(fichiers);
//   } catch (error) {
//     console.error("Error fetching files:", error);
//     return NextResponse.json({ error: "Failed to fetch files" }, { status: 500 });
//   }
// }






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
