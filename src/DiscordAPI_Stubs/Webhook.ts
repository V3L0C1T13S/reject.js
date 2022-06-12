import {
  ChannelWebhookCreateOptions as DiscordChannelWebhookCreateOptions,
  MessageOptions,
  WebhookMessageOptions,
} from "discord.js";
import { WebhookTypes } from "discord.js/typings/enums";
import { API } from "revolt.js";
import { msgParamsConverter } from "../Utils/DiscordAPI";
import { baseClass } from "./Base";
import { BaseGuildTextChannel } from "./Channels";
import { Guild } from "./Guild";
import { Message } from "./Message";
import { User } from "./User";

/**
 * FIXME: Revolt doesn't support webhooks, this is only a dummy.
 * reference: https://discord.js.org/#/docs/discord.js/stable/class/Webhook
 * */
export class Webhook extends baseClass {
  name: string;

  avatar = "https://FIXME";

  channelId: string;

  guildId: string;

  id = "0";

  token = "null";

  // FIXME: Wont stop crying about type errors
  type = WebhookTypes.Application as any;

  get owner() {
    const ownerId = this.rejectClient.revoltClient.user?.bot?.owner;
    if (!ownerId) return null;

    const owner = this.rejectClient.revoltClient.users.$get(ownerId);
    return new User(owner);
  }

  readonly url = "https://FIXME";

  sourceChannel: BaseGuildTextChannel;

  sourceGuild?: Guild;

  constructor(
    name: string,
    channel: BaseGuildTextChannel,
    options?: DiscordChannelWebhookCreateOptions,
  ) {
    super(channel.rejectClient);
    this.name = name ?? "REJECTFIXME";

    this.channelId = channel.id;
    this.guildId = channel.guild?.id ?? "0";

    this.sourceChannel = channel;
    this.sourceGuild = channel.guild;

    // FIXME: Currently only supports URLs
    if (options?.avatar) {
      if (typeof options.avatar === "string") {
        this.avatar = options.avatar;
      }
    }
  }

  createdAt = new Date();

  createdTimestamp = 0;

  async sendSlackMessage(body: unknown) {
    return false;
  }

  // FIXME: Needs masquerade permissions to work properly
  async send(message: string | MessageOptions | WebhookMessageOptions) {
    const params = await msgParamsConverter(message, this.rejectClient.revoltClient);

    const masq = {
      name: this.name,
      avatar: this.avatar,
    }

    // add masquerade to params
    const masqueradedParams = typeof params === "string" ? {
      content: params,
      masquerade: masq,
    } : {
      ...params,
      masquerade: masq,
    }

    const msg = await this.sourceChannel.revoltChannel.sendMessage(masqueradedParams);

    return new Message(msg);
  }

  /** FIXME: Literally all of these need stubs */
  async delete() {}

  avatarURL() {
    return "https://FIXME";
  }

  async deleteMessage() {}

  async edit() {
    return null as any;
  }

  async editMessage() {
    return null as any;
  }

  async fetchMessage() {
    return null as any;
  }

  isChannelFollower() { return false; }

  isIncoming() { return false; }
}
