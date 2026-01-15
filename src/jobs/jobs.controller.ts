import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';

@Controller('jobs')
@UseGuards(AuthGuard)
export class JobsController {
  constructor(private readonly service: JobsService) {}

  @Post()
  async createJob(
    @Body() dto: CreateJobDto,
    @CurrentUser() user: { id: string },
  ): Promise<{ jobId: string }> {
    const job = await this.service.create(dto, user.id);
    return { jobId: job.id };
  }

  @Post('close')
  async closeJob(
    @Body('jobId') jobId: string,
    @CurrentUser() user: { id: string },
  ): Promise<{ success: true }> {
    return this.service.close(jobId, user.id);
  }
}

/*
 * Notes:
 * - Controller only handles HTTP & DTO mapping
 * - AuthGuard ensures user exists
 * - Explicit return types improve TypeScript safety
 */
