import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const uploadMiddleware = upload.fields([
  { name: "aadharFile", maxCount: 1 },
  { name: "panFile", maxCount: 1 },
  { name: "passbookFile", maxCount: 1 },
  { name: "statementFile", maxCount: 1 },
]);