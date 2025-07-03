import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardResponseDto } from './dto/dashboard-response.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @ApiOperation({ summary: 'Get dashboard information' })
  @Get()
  async getDashboard(): Promise<DashboardResponseDto> {
    return await this.dashboardService.getDashboardData();
  }
}
