import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { initializeApp } from 'firebase/app';
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

import { IPath, ISetNameFile, IUploadFile } from '../interfaces';
import { contentType } from '../constants';
import { envNames, handlerException } from '@/config';

@Injectable()
export class FirebaseService {
  constructor(private readonly configService: ConfigService) {}

  private setNameFile({ extension, path }: ISetNameFile): string {
    const data = `${path}${uuidv4()}.${extension}`;

    return data;
  }

  async getSignedUrl({ path }: IPath) {
    if (!path) {
      return '';
    }
    try {
      const { app } = await this.firebaseConfig();
      const storage = getStorage(app);
      const storageRef = ref(storage, path);

      const url = await getDownloadURL(storageRef);
      return url;
    } catch (error) {
      return handlerException(error);
    }
  }

  async uploadImages({ logo, path }: IUploadFile) {
    try {
      const { app } = await this.firebaseConfig();

      const storage = getStorage(app);

      const pathStorage = this.setNameFile({
        extension: logo.originalname.split('.')[1],
        path,
      });

      const storageRef = ref(storage, pathStorage);

      await uploadBytes(storageRef, logo.buffer, {
        contentType: contentType.jpeg,
      });

      return await this.getSignedUrl({ path: pathStorage });
    } catch (error) {
      return handlerException(error);
    }
  }

  async deleteImage({ path }: IPath) {
    try {
      const { app } = await this.firebaseConfig();

      const storage = getStorage(app);

      const desertRef = ref(storage, path);

      await deleteObject(desertRef);

      return true;
    } catch (error) {
      return handlerException(error);
    }
  }

  private async firebaseConfig() {
    const firebaseConfig = {
      apiKey: this.configService.get<string>(envNames.firebase_apikey),
      authDomain: this.configService.get<string>(envNames.firebase_authdomain),
      projectId: this.configService.get<string>(envNames.firebase_projectid),
      storageBucket: this.configService.get<string>(
        envNames.firebase_storagebucket,
      ),
      messagingSenderId: this.configService.get<string>(
        envNames.firebase_messagingsenderid,
      ),
      appId: this.configService.get<string>(envNames.firebase_appid),
      measurementId: this.configService.get<string>(
        envNames.firebase_measurementid,
      ),
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    return { app };
  }
}
