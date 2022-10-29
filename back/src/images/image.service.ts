import { Injectable } from '@nestjs/common';
import { HttpService, HttpModuleOptions } from '@nestjs/axios';
import { AddImageInput } from './dto/AddImageInput.dto';
import { firstValueFrom } from 'rxjs';

const UPLOAD_IMAGE_REQUEST_CONFIG: HttpModuleOptions = {
  headers: {
    Authorization: `${process.env.IMAGE_UPLOAD_SECRET_KEY}`,
    'Content-Type': 'application/octet-stream',
  },
};

@Injectable()
export class ImageService {
  constructor(private httpService: HttpService) {}

  async addImage(input: AddImageInput) {
    try {
      const { type, image } = input;
      const nImage = await image;

      const uploadName = `${+new Date()}${nImage.filename}`;

      const imageRes = await firstValueFrom(
        this.httpService.put(
          `${process.env.IMAGE_UPLOAD_URL}/appkeys/${process.env.IMAGE_APP_KEY}/images?path=/${type}/${uploadName}&overwrite=true`,
          nImage.createReadStream(),
          UPLOAD_IMAGE_REQUEST_CONFIG,
        ),
      );

      return imageRes.data.file.url;
    } catch (error) {
      return { ok: false, error };
    }
  }
}
