import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Bot } from "./models/bot.model";
import { Context, Markup } from "telegraf";

@Injectable()
export class BotService {
  constructor(@InjectModel(Bot) private readonly botModel: typeof Bot) {}

  async onStart(ctx: Context) {
    try {
      const user_id = ctx.from?.id!;

      const user = await this.botModel.findByPk(user_id);

      if (!user) {
        await this.botModel.create({
          user_id,
          username: ctx.from?.username!,
          last_name: ctx.from?.last_name!,
          first_name: ctx.from?.first_name!,
        });
        await ctx.replyWithHTML(
          `Iltimos, <b>Telefon raqamni yuborish tugmasini bosing 👇</b>`,
          {
            ...Markup.keyboard([
              [Markup.button.contactRequest("Telefon raqamni yuborish")],
            ])
              .oneTime()
              .resize(),
          },
        );
        await ctx.replyWithHTML(
          `Iltimos, <b>Lokatsiyani yuborish tugmasini bosing 👇</b>`,
          {
            ...Markup.keyboard([
              [Markup.button.locationRequest("Lokatsiya yuborish")],
            ])
              .oneTime()
              .resize(),
          },
        );
      }
    } catch (error) {
      console.log("Error on onStart:", error);
    }
  }

  async onContact(ctx: Context) {
    const user_id = ctx.from?.id!;

    const user = await this.botModel.findByPk(user_id);

    if (!user) ctx.reply("Oooooo");
    else {
      user.status = true;
      if ("contact" in ctx.message!) {
        user.phone_number = ctx.message.contact.phone_number;
      }

      await ctx.replyWithHTML(
        `🎉 Tabriklaymiz! Siz muvaffaqiyatli ro'yhatdan o'tdingiz`,
        {
          ...Markup.removeKeyboard(),
        },
      );
    }
  }

  async onLocation(ctx: Context) {
    const user_id = ctx.from?.id!;

    const user = await this.botModel.findByPk(user_id);

    if (!user) ctx.reply("Oooooo");
    else {
      user.status = true;
      if ("contact" in ctx.message!) {
        user.phone_number = ctx.message.contact.phone_number;
      }

      await ctx.replyWithHTML(
        `🎉 Tabriklaymiz! Siz muvaffaqiyatli ro'yhatdan o'tdingiz`,
        {
          ...Markup.removeKeyboard(),
        },
      );
    }
  }
}
