import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TestDataScehma } from './testData.model';
import { TestDataController } from './testData.controller';
import { TestDataService } from './testData.service';

/**
 * Module for managing test data related features.
 */
@Module({
  imports: [MongooseModule.forFeature([{name:'TestData', schema: TestDataScehma}])],
  controllers: [TestDataController],
  providers: [TestDataService]
})
export class TestDataModule {}
