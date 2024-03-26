class HttpResponse {
  static ok(data: any) {
    return {
      statusCode: 200,
      body: data,
    }
  }

  static badRequest(error: Error) {
    return {
      statusCode: 400,
      body: error.message,
    }
  }

  static serverError(error: Error) {
    return {
      statusCode: 500,
      body: error.message,
    }
  }
}

export { HttpResponse }
