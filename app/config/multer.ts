import multer from 'multer'
import path from 'path'
import crypto from 'crypto'

export class Upload {
  public static uploadMulter() {
    const storage = multer.diskStorage({
      destination(req, file, cb) {
        cb(null, path.resolve(__dirname, '..', 'temp', 'uploads'))
      },
      filename(req, file, cb) {
        cb(null, crypto.randomUUID() + file.originalname)
      },
    })

    const upload = multer({
      dest: path.resolve(__dirname, '..', 'temp', 'uploads'),
      storage,
      limits: {
        fileSize: 1024 * 1024 * 5,
      },
      fileFilter(req, file, cb) {
        const allowedMimes = [
          'image/jpeg',
          'image/pjpeg',
          'image/png',
          'image/gif',
        ]

        if (allowedMimes.includes(file.mimetype)) {
          cb(null, true)
        } else {
          cb(new Error('Invalid file type'))
        }
      },
    })

    return upload
  }
  // req.file.path => get the path of the file
}
