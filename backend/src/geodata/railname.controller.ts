import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { RailNameService } from './railname.service';

/**
 * Controller responsible for handling requests related to rail names and providing GeoJSON data.
 */
@Controller('geodata/railnames')
export class RailNameController {
    constructor(private readonly RailNameService: RailNameService) {}

    /**
     * Get combined GeoJSON data containing rail names.
     * @param res - Express Response object.
     * @returns Combined GeoJSON data containing rail names.
     */
    @Get()
    async getCombinedGeoJson(@Res() res: Response) {
        try {
            const combinedGeoJson = await this.RailNameService.getAllNames();
            res.status(HttpStatus.OK).json(combinedGeoJson);
        } catch (err) {
            console.error('Failed to get GeoJSON file for Rail Name:', err);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Server error getting GeoJSON data');
        }
    }
}
