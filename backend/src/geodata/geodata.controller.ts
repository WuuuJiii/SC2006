import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { GeodataService } from './geodata.service';

/**
 * Controller responsible for handling geodata-related requests.
 */
@Controller('geodata/mrtlines')
export class GeodataController {
  constructor(private readonly geodataService: GeodataService) {}
  
  /**
   * Retrieves combined GeoJSON data.
   * @param res - Response object.
   * @returns Combined GeoJSON data.
   */
  @Get()
  async getCombinedGeoJson(@Res() res: Response) {
    try {
      const combinedGeoJson = await this.geodataService.combineGeoJsonFiles();
      res.status(HttpStatus.OK).json(combinedGeoJson);
    } catch (err) {
      console.error('Failed to combine GeoJSON files:', err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Server error combining GeoJSON data');
    }
  }
}
