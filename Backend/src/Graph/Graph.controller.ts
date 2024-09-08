import { Controller, Get, Query } from '@nestjs/common';
import { GraphService } from './graph.service';

@Controller('Graph')
export class GraphController {
  constructor(private readonly graphService: GraphService) {}

  @Get('monthly')
  async getMonthlySales() {
    return this.graphService.getMonthlySales();
  }

  @Get('date-range')
  async getSalesByDateRange(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return this.graphService.getSalesByDateRange(start, end);
  }
}
