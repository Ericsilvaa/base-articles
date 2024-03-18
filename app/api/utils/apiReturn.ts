export type StatusProps = {
  code: number
  status: boolean
  message: string
  data?: any
}

export const statusReturn = (
  code: number,
  status: boolean,
  message: string
): StatusProps => {
  return {
    code,
    status,
    message,
  }
}
