import { Injectable, NestMiddleware } from '@nestjs/common';
import { enhance } from '@zenstackhq/runtime';
import RESTHandler from '@zenstackhq/server/api/rest';
import { ZenStackMiddleware } from '@zenstackhq/server/express';
import { Request, Response } from 'express';
import { PrismaService } from '../services/prisma.service';

@Injectable()
export class CrudMiddleware implements NestMiddleware {
    constructor(private readonly prismaService: PrismaService) { }

    use(req: Request, _res: Response, next: (error?: any) => void) {
        const baseUrl = `${req.protocol}://${req.headers.host}${req.baseUrl}`;

        const inner = ZenStackMiddleware({
            getPrisma: () => enhance(this.prismaService),
            handler: RESTHandler({ endpoint: baseUrl }),
        });
        inner(req, _res, next);
    }
}