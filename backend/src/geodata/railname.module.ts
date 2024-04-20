import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RailNameService } from './railname.service'; // Import your service
import { RailNameController } from './railname.controller'; // Import your controller
// Import schema
import { RailNameModel, FeatureCollectionSchema } from './railname.model';

/**
 * Module responsible for managing rail names.
 */
@Module({
    imports: [
        // Register Geodata schema with Mongoose
        MongooseModule.forFeature([{ name: RailNameModel.name, schema: FeatureCollectionSchema }]),
    ],
    controllers: [
        RailNameController, // new controller
    ],
    providers: [
        RailNameService, // new service
    ],
})
export class RailNameModule {}
