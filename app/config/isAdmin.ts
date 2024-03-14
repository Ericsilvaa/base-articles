export default class IsAdmin {
  public static isAdmin(req: any, res: any, next: any) {
    if (req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Unauthorized' })
    }
    next()
  }
}
