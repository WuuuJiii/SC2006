import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GeodataService } from './geodata.service'; // Import your service
import { GeodataController } from './geodata.controller'; // Import your controller
// Import your GeoData schema
import { GeodataModel, FeatureCollectionSchema } from './geodata.model';

/**
 * Module responsible for managing geodata-related components.
 */
@Module({
  imports: [
    // Register your GeoData schema with Mongoose
    MongooseModule.forFeature([{ name: GeodataModel.name, schema: FeatureCollectionSchema }]),
  ],
  controllers: [
    GeodataController, // Your new controller
  ],
  providers: [
    GeodataService, // Your new service
  ],
})
export class GeodataModule {}
