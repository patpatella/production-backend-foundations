import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, JobStatus } from '@prisma/client';

@Injectable()
export class JobsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createJob(data: {
    posterId: string;
    title: string;
    description: string;
    category: string;
    suggestedPrice?: number;
    organizationId: string;
  }) {
    return await this.prisma.job.create({
      data: {
        ...data,
        status: JobStatus.OPEN,
      },
    });
  }

  async closeJob(jobId: string, userId: string): Promise<boolean> {
    return await this.prisma.$transaction(
      async (tx: Prisma.TransactionClient) => {
        const result = await tx.job.updateMany({
          where: {
            id: jobId,
            posterId: userId,
            status: JobStatus.OPEN,
          },
          data: { status: JobStatus.COMPLETED },
        });
        return result.count > 0;
      },
    );
  }
}

/** Concept

*Prisma never leaks upward
*Repository knows DB structure
*Service does not */
