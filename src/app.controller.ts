import { Body, Controller, Logger, Post } from '@nestjs/common';
import { Bybit } from './bybit.service';

// When viewing the tradingview graph, click the ... next to the Heiken Ashi
// strategy and click the "Add alert..." option. Ensure these settings are set:
//
// - 2nd dropdown: Order filles only
// - Webhook URL: checked and URL filled in
// - Message:
//    {
//      "side": "{{strategy.order.action}}",
//      "position": "{{strategy.market_position}}",
//      "symbol": "{{ticker}}",
//      "price": "{{strategy.order.price}}"
//    }

interface Alert {
  side: 'buy' | 'sell';
  position: 'long' | 'short';
  symbol: string;
  price: number;
}

@Controller()
export class AppController {
  private readonly log = new Logger(AppController.name);

  constructor(private readonly exchange: Bybit) {
    this.exchange
      .getActiveOrderList({ symbol: 'BTCUSDT' })
      .then((orders) => this.log.log(orders));
  }

  @Post()
  async receiveAlert(@Body() alert: Alert) {
    this.log.log(alert);

    const apiKeyInfo = this.exchange.getApiKeyInfo();

    this.log.log(apiKeyInfo);

    const activeOrder = await this.exchange.placeActiveOrder({
      side: alert.side === 'buy' ? 'Buy' : 'Sell',
      symbol: alert.symbol,
      order_type: 'Market',
      qty: 5,
      time_in_force: 'FillOrKill',
      reduce_only: false,
      close_on_trigger: true,
    });

    this.log.log(activeOrder);
  }
}
