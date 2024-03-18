import { multer } from 'multer'

export class MulterConfig {
  private static storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './../../uploads/')
    },
    filename: function (
      req: any,
      file: Express.Multer.File,
      cb: (error: Error, filename: any) => any
    ) {
      cb(null, new Date().toISOString() + file.originalname)
    },
  } as multer.DiskStorageOptions)

  private static fileFilter = (
    req: any,
    file: Express.Multer.File,
    cb: any
  ) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true)
    } else {
      cb(null, false)
    }
  }

  public static upload = multer({
    storage: this.storage,
    limits: {
      fileSize: 1024 * 1024 * 5,
    },
    fileFilter: this.fileFilter,
  })

  // req.file.path => get the path of the file
}
