import { Action, Command, Ctx, On, Start, Update } from "nestjs-telegraf";
import { Context, Markup } from "telegraf";
import { BotService } from "./bot.service";

@Update()
export class BotUpdate {
  constructor(private readonly botService: BotService) {}

  @Start()
  async onStart(@Ctx() ctx: Context) {}
}
