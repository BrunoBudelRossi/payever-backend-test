import * as dotenv from 'dotenv';
dotenv.config();

export class EnvsConfig {
  static getServerPort() {
    return process.env.PORT || 3000;
  }

  static getMongoDbUrl() {
    return process.env.MONGODB_URL;
  }

  static getFakeDbUrl() {
    return process.env.FAKE_DB_URL;
  }

  static getRabbitmqUrl() {
    return process.env.RABBITMQ_URL;
  }

  static getAuthUserEmail() {
    return process.env.AUTH_USER_EMAIL;
  }

  static getAuthUserPassword() {
    return process.env.AUTH_USER_PASSWORD;
  }

  static getEmailTo() {
    return process.env.EMAIL_TO;
  }

  static getEmailFrom() {
    return process.env.EMAIL_FROM;
  }
}
