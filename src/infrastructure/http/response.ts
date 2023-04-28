export class HttpResponse {
  static success(message?: string, payload?: any) {
    if (!message && !payload) {
      throw new Error('Error in some parameter');
    }
    if (message && !payload) {
      return {
        code: 0,
        message,
      };
    } else if (!message && payload) {
      return {
        code: 0,
        payload,
      };
    } else {
      return {
        code: 0,
        message,
        payload: payload,
      };
    }
  }
}
