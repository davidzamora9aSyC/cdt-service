import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { CdtOffersModule } from './cdt-offers/cdt-offers.module';
import { CdtRequestsModule } from './cdt-requests/cdt-requests.module';
import { CdtContractsModule } from './cdt-contracts/cdt-contracts.module';
import { CdtMovementsModule } from './cdt-movements/cdt-movements.module';
import { CdtRenewalsModule } from './cdt-renewals/cdt-renewals.module';

@Module({
  imports: [PrismaModule, CdtOffersModule, CdtRequestsModule, CdtContractsModule, CdtMovementsModule, CdtRenewalsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
