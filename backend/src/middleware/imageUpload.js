import multer from "multer";

const upload = multer({
  limits: { fileSize: 15 * 1024 * 1024 }, 
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true); 
    } else {
      cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
    }
  },
});

const uploadImage = (req, res, next) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      let message = "Erro ao fazer upload";
      if (err.code === "LIMIT_FILE_SIZE") {
        message = "Tamanho máximo da imagem excedido";
      } else if (err.code === "LIMIT_UNEXPECTED_FILE") {
        message = "Arquivo deve ser uma imagem";
      } else if (err.code === "LIMIT_FILE_COUNT") {
        message = "Apenas um arquivo é permitido";
      }
      return res.status(400).json({ message });
    } else if (!req.file) {
      return res.status(400).json({ message: "Nenhum arquivo enviado" });
    }

    next();
  });
};

export default uploadImage;
