import { HttpService, HttpModuleOptions } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

import { AddImageInput } from './dto/AddImageInput.dto';

@Injectable()
export class ImageService {
  private readonly IMAGE_UPLOAD_URL: string;
  private readonly IMAGE_APP_KEY: string;
  private readonly IMAGE_OPTION: HttpModuleOptions;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.IMAGE_UPLOAD_URL = configService.get('IMAGE_UPLOAD_URL');
    this.IMAGE_APP_KEY = configService.get('IMAGE_APP_KEY');
    this.IMAGE_OPTION = {
      headers: {
        Authorization: `${configService.get('IMAGE_UPLOAD_SECRET_KEY')}`,
        'Content-Type': 'application/octet-stream',
      },
    };
  }

  async addImage(input: AddImageInput) {
    const { type, image } = input;
    const nImage = await image;

    const uploadName = `${+new Date()}${nImage.filename}`;

    const imageRes = await firstValueFrom(
      this.httpService.put(
        `${this.IMAGE_UPLOAD_URL}/appkeys/${this.IMAGE_APP_KEY}/images?path=/${type}/${uploadName}&overwrite=true`,
        nImage.createReadStream(),
        this.IMAGE_OPTION,
      ),
    );

    return this.httpsTransducer(imageRes.data.file.url);
  }

  private httpsTransducer(url: string) {
    const protocol = new URL(url).protocol;

    return url.replace(protocol, 'https:');
  }
}
