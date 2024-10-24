import { Controller, Get } from "@nestjs/common";
import { HealthCheckService, HealthCheck } from "@nestjs/terminus";
import { PrismaService } from "src/services/prisma.service";

@Controller('health')
export class HealthController {
    constructor(
        private health: HealthCheckService,
        private db: PrismaService,
    ) { }

    @Get()
    @HealthCheck()
    readiness() {
        return this.health.check([
            async () => this.db.$queryRaw`SELECT 1`,
        ]);
    }
}