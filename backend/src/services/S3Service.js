import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import sharp from "sharp";

class S3Service {
  constructor() {
    this.bucketName = process.env.BUCKET_NAME;
    this.region = process.env.BUCKET_REGION;
    this.s3 = new S3Client({
      credentials: {
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
      },
      region: this.region,
    });
  }

  async uploadFull(imageName, buffer, mimetype) {
    const params = {
      Bucket: this.bucketName,
      Key: `uploads/full/${imageName}`,
      Body: buffer,
      ContentType: mimetype,
    };
    const command = new PutObjectCommand(params);
    await this.s3.send(command);
  }

  async uploadLarge(imageName, buffer, mimetype) {
    const format = mimetype === 'image/png' ? 'png' : 'jpeg'; 

    const largeImageBuffer = await sharp(buffer)
      .resize({ width: 432, height: 243, fit: 'cover', kernel: sharp.kernel.lanczos3 })
      .sharpen()
      .toFormat(format, { quality: 100 }) 
      .toBuffer();

    const params = {
      Bucket: this.bucketName,
      Key: `uploads/large/${imageName}`,
      Body: largeImageBuffer,
      ContentType: `image/${format}`, 
    };

    const command = new PutObjectCommand(params);
    await this.s3.send(command);
  }

  async uploadSmall(imageName, buffer, mimetype) {
    const format = mimetype === 'image/png' ? 'png' : 'jpeg'; 

    const smallImageBuffer = await sharp(buffer)
      .resize({ width: 300, height: 200, fit: 'cover', kernel: sharp.kernel.lanczos3 })
      .sharpen()
      .toFormat(format, { quality: 100 }) 
      .toBuffer();

    const params = {
      Bucket: this.bucketName,
      Key: `uploads/small/${imageName}`,
      Body: smallImageBuffer,
      ContentType: `image/${format}`, 
    };
    
    const command = new PutObjectCommand(params);
    await this.s3.send(command);
  }

  async uploadImage(imageName, buffer, mimetype) {
    await this.uploadFull(imageName, buffer, mimetype);
    await this.uploadLarge(imageName, buffer, mimetype);
    await this.uploadSmall(imageName, buffer, mimetype);
  }

  async getImageBuffer(folder, imageName) {
    const params = {
      Bucket: this.bucketName,
      Key: `uploads/${folder}/${imageName}`,
    };

    const command = new GetObjectCommand(params);
    const response = await this.s3.send(command);

    return new Promise((resolve, reject) => {
      const chunks = [];
      const stream = response.Body;
      stream.on("data", (chunk) => chunks.push(chunk));
      stream.on("error", reject);
      stream.on("end", () => resolve(Buffer.concat(chunks)));
    });
  }

  getImageUrl(size, imageName) {
    return `https://${this.bucketName}.s3.${this.region}.amazonaws.com/uploads/${size}/${imageName}`;
  }
}

export default S3Service;
