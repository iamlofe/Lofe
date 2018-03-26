const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
      return (res, err) => {
        crypto.randomBytes(16, (err, req) => {
          if (err) {
            return reject(err);
          }

          const filename = req.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          next({fileInfo});
        });
      };
    }
  });
  const upload = multer({ storage });

  export default storage;