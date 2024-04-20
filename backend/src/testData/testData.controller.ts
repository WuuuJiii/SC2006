import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from '@nestjs/common';
import { TestDataService } from './testData.service';

/**
 * Controller responsible for handling test data related requests
 */
@Controller('testData')
export class TestDataController {
  constructor(private testDataService: TestDataService) {
  }

  /**
     * Retrieves all test data.
     * @returns All test data.
     */
  @Get()
  async dbgetAllTestData() {
    const testData = await this.testDataService.dbgetAllTestData();
    return testData;
  }

  /**
     * Retrieves test data by ID.
     * @param id - Test data ID.
     * @returns Test data with the specified ID.
     */
  @Get('/:id')
  async dbgetTestDataById(@Param('id') id: string) {
    const testData = await this.testDataService.dbgetTestDataById(id);
    return testData;
  }

  /**
     * Creates test data.
     * @param month - Month.
     * @param town - Town.
     * @param flat_type - Flat type.
     * @param block_no - Block number.
     * @param street_name - Street name.
     * @param storey_range - Storey range.
     * @param floor_area_sqm - Floor area in square meters.
     * @param flat_model - Flat model.
     * @param lease_commense_date - Lease commencement date.
     * @param remaining_lease - Remaining lease.
     * @param resale_price - Resale price.
     * @param latitude - Latitude.
     * @param longitude - Longitude.
     * @returns A message indicating the result of the operation.
     */
  @Post('/:dbcreate')
  async dbcreateTestData(
      @Body('month') month: string,
      @Body('town') town: string,
      @Body('flat_type') flat_type: string,
      @Body('block') block_no: string,
      @Body('street_name') street_name: string,
      @Body('storey_range') storey_range: string,
      @Body('floor_area_sqm') floor_area_sqm: number,
      @Body('flat_model') flat_model: string,
      @Body('lease_commense_date') lease_commense_date: number,
      @Body('remaining_lease') remaining_lease: string,
      @Body('resale_price') resale_price: number,
      @Body('Latitude') latitude: number,
      @Body('Longitude') longitude: number,
  ) {
    const result = await this.testDataService.dbcreateTestData(
        month,
        town,
        flat_type,
        block_no,
        street_name,
        storey_range,
        floor_area_sqm,
        flat_model,
        lease_commense_date,
        remaining_lease,
        resale_price,
        latitude,
        longitude,
    );

    return result;
  }

  /**
     * Updates test data.
     * @param id - Test data ID.
     * @param month - Month.
     * @param town - Town.
     * @param flat_type - Flat type.
     * @param block_no - Block number.
     * @param street_name - Street name.
     * @param storey_range - Storey range.
     * @param floor_area_sqm - Floor area in square meters.
     * @param flat_model - Flat model.
     * @param lease_commense_date - Lease commencement date.
     * @param remaining_lease - Remaining lease.
     * @param resale_price - Resale price.
     * @param latitude - Latitude.
     * @param longitude - Longitude.
     * @returns A message indicating the result of the operation.
     */
  @Patch('/:id')
  async dbupdateTask(
      @Param('id') id: string,
      @Body('month') month: string,
      @Body('town') town: string,
      @Body('flat_type') flat_type: string,
      @Body('block') block_no: string,
      @Body('street_name') street_name: string,
      @Body('storey_range') storey_range: string,
      @Body('floor_area_sqm') floor_area_sqm: number,
      @Body('flat_model') flat_model: string,
      @Body('lease_commense_date') lease_commense_date: number,
      @Body('remaining_lease') remaining_lease: string,
      @Body('resale_price') resale_price: number,
      @Body('Latitude') latitude: number,
      @Body('Longitude') longitude: number,
  ) {
    const result = await this.testDataService.dbupdateTestData(
        id,
        month,
        town,
        flat_type,
        block_no,
        street_name,
        storey_range,
        floor_area_sqm,
        flat_model,
        lease_commense_date,
        remaining_lease,
        resale_price,
        latitude,
        longitude,
    );

    return result;
  }
  
  /**
     * Deletes test data by ID.
     * @param id - Test data ID.
     */
  @Delete('/:id')
  async dbdeleteResaleDataById(@Param('id') id: string) {
    await this.testDataService.dbdeleteTestDataById(id);
  }

  /**
     * Filters test data based on specified parameters.
     * @param location - Location.
     * @param property_type - Property type.
     * @param amenities - Amenities.
     * @param budget - Budget.
     * @param rooms - Rooms.
     * @returns Filtered test data.
     */
  @Get('/testData/filter')
  async filterResaleData(
    @Query('location') location: string[],
    @Query('propertyType') property_type: string[],
    @Query('amenities') amenities: string[],
    @Query('budget') budget: string[],
    @Query('rooms') rooms: string[],
  ) {
  
    const filteredData = await this.testDataService.filterTestData(
          location,
          property_type,
          amenities,
          budget,
          rooms,
      );
      return filteredData;
  }


}
