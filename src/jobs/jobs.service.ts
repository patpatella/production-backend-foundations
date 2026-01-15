import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { JobsRepository } from './jobs.repository';

@Injectable()
export class JobsService {
  constructor(private readonly repo: JobsRepository) {}

  async create(dto: CreateJobDto, userId: string) {
    const category = dto.category?.toLowerCase() ?? 'general';

    const job = await this.repo.createJob({
      posterId: userId,
      title: dto.title,
      description: dto.description,
      category,
      suggestedPrice: dto.suggestedPrice,
    });

    return job; // ✅ Job type inferred from repo
  }

  async close(jobId: string, userId: string): Promise<{ success: true }> {
    const success = await this.repo.closeJob(jobId, userId);

    if (!success) {
      throw new NotFoundException('Job not found or not open');
    }

    return { success: true };
  }
}

/*
 * Notes:
 * - Business logic lives here
 * - Services are testable
 * - Explicit return types improve TS safety
 */
