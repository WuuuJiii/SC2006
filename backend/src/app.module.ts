import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ResaleModule } from './resale/resale.module';
import {GeodataModule} from './geodata/geodata.module';
import {RailNameModule} from './geodata/railname.module';
import { AuthModule } from './auth/auth.module';
import { TestDataModule } from './testData/testData.module';

/**
 * Main module of application
 * Responsible for configuring imports and initializing the application
 */
const url =
    'mongodb+srv://tanw0272:UVdMb8aeATcDmYuc@sc2006.fa1n11l.mongodb.net/ResaleHDBInfo?retryWrites=true&w=majority&appName=SC2006';

@Module({

  imports: [
    ResaleModule,
    GeodataModule,
    RailNameModule,
    TestDataModule,
    MongooseModule.forRoot(url),
    AuthModule,
  ],

})
export class AppModule {}
