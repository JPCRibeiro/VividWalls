import express from "express";
import cors from "cors";
import multer from "multer";
import crypto from "crypto";
import dotenv from "dotenv";
import sharp from "sharp";
import { PrismaClient } from "@prisma/client";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

dotenv.config();

const randomImageName = (bytes = 4) => {
  const randomName = crypto.randomBytes(bytes).toString('hex');
  const fullname = `vividwalls-${randomName}`;
  return fullname
}

const bucketname = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey
  },
  region: bucketRegion
});

const app = express();
app.use(cors());

const prisma = new PrismaClient();

const fileFilter = (req, file, callback) => {
  if (file.mimetype.split("/")[0] === 'image') {
    callback(null, true);
  } else {
    callback(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
  }
}

const storage = multer.memoryStorage();
const upload = multer({ storage: storage, fileFilter, limits: { fileSize: 20000000, files: 1 } });

app.get("/api", (req,res) => {
  res.send("Api de Imagens");
})

app.get("/api/posts/large", async (req, res) => {
  const posts = await prisma.posts.findMany({ orderBy: [{ created: 'asc' }] });

  for (const post of posts) {
    const url = `https:/${bucketname}.s3.${bucketRegion}.amazonaws.com/uploads/large/${post.imageName}`;
    post.imageUrl = url;
  }

  res.send(posts);
});

app.get("/api/posts/small", async (req, res) => {
  const posts = await prisma.posts.findMany({ orderBy: [{ created: 'asc' }] });

  for (const post of posts) {
    const url = `https://${bucketname}.s3.${bucketRegion}.amazonaws.com/uploads/small/${post.imageName}`;
    post.imageUrl = url;
  }

  res.send(posts);
});

app.get("/api/posts/latest", async (req, res) => {
  const posts = await prisma.posts.findMany({ orderBy: [{ created: 'desc' }] });

  for (const post of posts) {
    const url = `https://${bucketname}.s3.${bucketRegion}.amazonaws.com/uploads/small/${post.imageName}`;
    post.imageUrl = url;
  }

  res.send(posts);
});

app.get("/api/posts/:imageName", async (req, res) => {
  const { imageName } = req.params;

  try {
    const post = await prisma.posts.findFirst({
      where: {
        imageName: {
          startsWith: imageName
        }
      }
    });

    if (!post) {
      return res.status(404).json({ message: "Imagem não encontrada" });
    }

    const imageUrl = `https://${bucketname}.s3.${bucketRegion}.amazonaws.com/uploads/full/${post.imageName}`;
    post.imageUrl = imageUrl;

    res.json(post);
  } catch (error) {
    console.error("Erro ao buscar imagem:", error);
    res.status(500).json({ message: "Erro ao buscar imagem" });
  }
});

app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({
        message: "Arquivo deve ser uma imagem"
      });
    }
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        message: "Tamanho máximo da imagem excedido"
      });
    }
    if (error.code === "LIMIT_FILE_COUNT") {
      return res.status(400).json({
        message: "Apenas um arquivo é permitido"
      });
    }
  }
});

app.post("/api/posts", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      message: "Nenhum arquivo enviado"
    });
  }

  const imageBuffer = await sharp(req.file.buffer).resize({ width: 100 }).toBuffer(); 
  const imageHash = crypto.createHash('sha256').update(imageBuffer).digest('hex');
    
  const existingPost = await prisma.posts.findFirst({
    where: { imageHash: imageHash },
  });

  if (existingPost) {
    return res.status(400).json({ message: "Imagem já existe no sistema" });
  }

  const fileExtension = req.file.mimetype.split("/")[1]; 
  const imageName = `${randomImageName()}.${fileExtension}`;

  const fullParams = {
    Bucket: bucketname,
    Key: `uploads/full/${imageName}`,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  };

  const fullCommand = new PutObjectCommand(fullParams);
  await s3.send(fullCommand);

  const format = req.file.mimetype === 'image/png' ? 'png' : 'jpeg';

  const largeImageBuffer = await sharp(req.file.buffer)
    .resize({ width: 432, height: 243, fit: 'cover', kernel: sharp.kernel.lanczos3 })
    .sharpen()
    [format]({ quality: 100 })
    .toBuffer();

  const largeParams = {
    Bucket: bucketname,
    Key: `uploads/large/${imageName}`,
    Body: largeImageBuffer,
    ContentType: req.file.mimetype,
  };

  const largeCommand = new PutObjectCommand(largeParams);
  await s3.send(largeCommand);

  const smallImageBuffer = await sharp(req.file.buffer)
    .resize({ width: 300, height: 200, fit: 'cover', kernel: sharp.kernel.lanczos3 })
    .sharpen()
    [format]({ quality: 100 })
    .toBuffer();

  const smallParams = {
    Bucket: bucketname,
    Key: `uploads/small/${imageName}`,
    Body: smallImageBuffer,
    ContentType: req.file.mimetype,
  };

  const smallCommand = new PutObjectCommand(smallParams);
  await s3.send(smallCommand);

  const post = await prisma.posts.create({
    data: {
      caption: req.body.caption,
      imageName: imageName,
      imageHash: imageHash,
    },
  });

  res.send(post);
});

export default app;