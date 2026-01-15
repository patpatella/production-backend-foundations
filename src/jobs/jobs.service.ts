import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { JobsRepository } from './jobs.repository';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class JobsService {
  constructor(private readonly repo: JobsRepository) {}

  async create(dto: CreateJobDto, userId: string) {
    const category = dto.category?.toLowerCase() ?? 'general';

    return this.repo.createJob({
      posterId: userId,
      title: dto.title,
      description: dto.description,
      category,
      suggestedPrice: dto.suggestedPrice,
    });
  }
  async close(jobId: string, userId: string) {
    const success = await this.repo.closeJob(jobId, userId);

    if (!success) {
      throw new NotFoundException('Job not found or not open');
    }

    return { success: true };
  }
}

/**Concept

*Business decisions live here
*This is testable
*This is reusable
*This is scalable */
