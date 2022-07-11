import MongoConfig from './MongoConfig';

export class MongoConfigFactory {
  public static createConfig(): MongoConfig {
    const url = process.env.STRING_CONNECTION! + process.env.DATABASE_NAME + process.env.CONNECTION_CONFIG;
    return {
      url: url,
    };
  }
}
