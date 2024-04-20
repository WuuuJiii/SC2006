import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ResaleService } from './resale.service';
import { Resale } from './resale.model';

/**
 * Controller for handling resale data endpoints.
 */
@Controller('resale')
export class ResaleController {
    constructor(private resaleService: ResaleService){}
    //--------------------------------------------------------------------------------------------------------------------------------//
    //for database use

    /**
     * Retrieve all resale data from the database.
     * @returns An array of resale data.
     */
    @Get()
    async dbgetAllResaleData(){
        const resale = await this.resaleService.dbgetAllResaleData();
        return resale;
    }

    /**
     * Retrieve resale data by ID from the database.
     * @param id The ID of the resale data to retrieve.
     * @returns The resale data matching the provided ID.
     */
    @Get('/:id')
    async dbgetResaleDataById(@Param('id') id: string){
        const resale = await this.resaleService.dbgetResaleDataById(id);
        return resale;
    }
    
    /**
     * Create resale data in the database.
     * @param month Month of the resale
     * @param town Town where the resale property is located
     * @param flat_type Type of flat
     * @param block_no Block number of the resale property
     * @param street_name Street name of the resale property
     * @param storey_range Storey range of the resale property
     * @param floor_area_sqm Floor area in square meters
     * @param flat_model Model of the flat
     * @param lease_commense_date Lease commencement date
     * @param remaining_lease Remaining lease duration
     * @param resale_price Price of the resale property
     */
    @Post('/:dbcreate')
    async dbcreateResaleData(
        @Body('month') month: string, @Body('town') town: string,
        @Body('flat_type') flat_type: string, @Body('block_no') block_no: number,
        @Body('street_name') street_name: string, @Body('storey_range') storey_range: string,
        @Body('floor_area_sqm') floor_area_sqm: number, @Body('flat_model') flat_model: string,
        @Body('lease_commense_date') lease_commense_date: number, @Body('remaining_lease') remaining_lease: string,
        @Body('resale_price') resale_price: number){
            
            const result = await this.resaleService.dbcreateResaleData(month,
                town,
                flat_type,
                block_no,
                street_name,
                storey_range,
                floor_area_sqm,
                flat_model,
                lease_commense_date,
                remaining_lease,
                resale_price);

            return result;
    }

    /**
     * Update resale data in the database.
     * @param id The ID of the resale data to update.
     * @param month Month of the resale
     * @param town Town where the resale property is located
     * @param flat_type Type of flat
     * @param block_no Block number of the resale property
     * @param street_name Street name of the resale property
     * @param storey_range Storey range of the resale property
     * @param floor_area_sqm Floor area in square meters
     * @param flat_model Model of the flat
     * @param lease_commense_date Lease commencement date
     * @param remaining_lease Remaining lease duration
     * @param resale_price Price of the resale property
     * @returns The updated resale data.
     */
    @Patch('/:id')
    async dbupdateTask(@Param('id') id: string,
        @Body('month') month: string, @Body('town') town: string,
        @Body('flat_type') flat_type: string, @Body('block_no') block_no: number,
        @Body('street_name') street_name: string, @Body('storey_range') storey_range: string,
        @Body('floor_area_sqm') floor_area_sqm: number, @Body('flat_model') flat_model: string,
        @Body('lease_commense_date') lease_commense_date: number, @Body('remaining_lease') remaining_lease: string,
        @Body('resale_price') resale_price: number){
            const result = await this.resaleService.dbupdateResaleData(id, month,
                town,
                flat_type,
                block_no,
                street_name,
                storey_range,
                floor_area_sqm,
                flat_model,
                lease_commense_date,
                remaining_lease,
                resale_price);
            
            return result
    }

    /**
     * Delete resale data by ID from the database.
     * @param id The ID of the resale data to delete.
     */
    @Delete('/:id')
    async dbdeleteResaleDataById(@Param('id') id:string){
        await this.resaleService.dbdeleteResaleDataById(id);
    }

}



 // @Get()
    // getAllResaleData(){
    //     return this.resaleService.getAllResaleData();
    // }

    // @Get('/:town')
    // getResaleDataById(@Param('town') town: string){
    //     const resale = this.resaleService.getResaleDataById(town);
    //     return resale;
    // }

    // @Post('/:create')
    // createResaleData(
    //     @Body('month') month: string, @Body('town') town: string,
    //     @Body('flat_type') flat_type: string, @Body('block_no') block_no: number,
    //     @Body('street_name') street_name: string, @Body('storey_range') storey_range: string,
    //     @Body('floor_area_sqm') floor_area_sqm: number, @Body('flat_model') flat_model: string,
    //     @Body('lease_commense_date') lease_commense_date: number, @Body('remaining_lease') remaining_lease: string,
    //     @Body('resale_price') resale_price: number): Resale{
    //         return this.resaleService.createResaleData(month,
    //             town,
    //             flat_type,
    //             block_no,
    //             street_name,
    //             storey_range,
    //             floor_area_sqm,
    //             flat_model,
    //             lease_commense_date,
    //             remaining_lease,
    //             resale_price);
    // }

    // @Patch('/:town')
    // updateTask(@Body('month') month: string, @Body('town') town: string,
    // @Body('flat_type') flat_type: string, @Body('block_no') block_no: number,
    // @Body('street_name') street_name: string, @Body('storey_range') storey_range: string,
    // @Body('floor_area_sqm') floor_area_sqm: number, @Body('flat_model') flat_model: string,
    // @Body('lease_commense_date') lease_commense_date: number, @Body('remaining_lease') remaining_lease: string,
    // @Body('resale_price') resale_price: number){
    //     this.resaleService.updateResaleData(month,
    //         town,
    //         flat_type,
    //         block_no,
    //         street_name,
    //         storey_range,
    //         floor_area_sqm,
    //         flat_model,
    //         lease_commense_date,
    //         remaining_lease,
    //         resale_price);
    // }

    // @Delete('/:town')
    // deleteResaleDataById(@Param('town') town:string): void{
    //     this.resaleService.deleteResaleDataById(town);
    // }
