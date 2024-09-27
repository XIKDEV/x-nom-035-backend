/** 
 * @fileoverview The BcryptService class provides methods for hashing and comparing passwords using bcrypt in a
NestJS application. */
import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  /**
   * The hash function in TypeScript uses bcrypt to hash a password with a cost factor of 10.
   * @param {string} password - The `password` parameter is a string that represents the user's
   * password that needs to be hashed for security purposes.
   * @returns A Promise that resolves to a hashed version of the input password using bcrypt with a
   * cost factor of 10.
   */
  hash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  /**
   * The function compares a password with a hash using bcrypt and returns a Promise with a boolean
   * result.
   * @param {string} password - The `password` parameter is a string that represents the plain text
   * password that a user enters when trying to log in to a system or application.
   * @param {string} hash - The `hash` parameter is a string that represents the hashed version of a
   * password. It is typically generated using a hashing algorithm like bcrypt to securely store and
   * compare passwords without storing the actual password in plain text.
   * @returns A Promise that resolves to a boolean value indicating whether the provided password
   * matches the given hash.
   */
  compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
