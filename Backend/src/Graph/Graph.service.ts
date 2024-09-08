import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderEntity } from "src/Order/Order.entity";
import { Repository } from "typeorm";

@Injectable()
export class GraphService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  async getMonthlySales(): Promise<any> {
    return this.orderRepository
      .createQueryBuilder('order')
      .select('SUM(order.amount)', 'totalSales')
      .addSelect("TO_CHAR(DATE_TRUNC('month', order.date), 'Month YYYY')", 'month')
      .where('order.status != :status', { status: 'Pending' })
      .groupBy('month')
      .orderBy('month', 'ASC')
      .getRawMany();
  }
  

  async getSalesByDateRange(startDate: Date, endDate: Date): Promise<any> {
    return this.orderRepository
      .createQueryBuilder('order')
      .select('SUM(order.amount)', 'totalSales')
      .addSelect("TO_CHAR(DATE_TRUNC('month', order.date), 'Month YYYY')", 'month')
      .where('order.date BETWEEN :startDate AND :endDate', { startDate, endDate })
      .andWhere('order.status != :status', { status: 'Pending' })
      .groupBy('month')
      .orderBy('month', 'ASC')
      .getRawMany();
  }
  
}
