import path from 'path'
import crypto from 'crypto'
import multer from 'multer'
import multerS3 from 'multer-s3'
import { S3 } from '@aws-sdk/client-s3'

export class Upload {
  public static uploadMulter() {
    const aws_S3 = new S3({
      region: 'us-east-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    })

    const storageTypes = {
      local: multer.diskStorage({
        destination(req, file, cb) {
          cb(null, path.resolve(__dirname, '..', 'temp', 'uploads'))
        },
        filename(req, file: Express.Multer.File & { key: string }, cb) {
          file.key = `${crypto.randomUUID()}-${file.originalname}`
          cb(null, crypto.randomUUID() + file.key)
        },
      }),
      s3: multerS3({
        s3: aws_S3,
        bucket: 'myawsuploads2',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key(req, file, cb) {
          cb(null, crypto.randomUUID() + file.originalname)
        },
      }),
    }

    const upload = multer({
      dest: path.resolve(__dirname, '..', 'temp', 'uploads'),
      storage: storageTypes['local'],
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
