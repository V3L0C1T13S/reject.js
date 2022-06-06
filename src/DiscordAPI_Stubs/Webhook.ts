import {
  Webhook as DiscordWebhook,
  ChannelWebhookCreateOptions as DiscordChannelWebhookCreateOptions,
  MessageOptions,
  User as DiscordUser,
} from "discord.js";
import { WebhookTypes } from "discord.js/typings/enums";
import { baseClass } from "./Base";
import { BaseGuildTextChannel } from "./Channels";
import { User } from "./User";

/**
 * FIXME: Revolt doesn't support webhooks, this is only a dummy.
 * reference: https://discord.js.org/#/docs/discord.js/stable/class/Webhook
 * */
export class Webhook extends baseClass implements DiscordWebhook {
  name: string;

  avatar = "https://FIXME";

  channelId: string;

  guildId: string;

  id = "0";

  token = "null";

  /** FIXME: No idea how to make this not cry over types */
  type = WebhookTypes.Application as any;

  get owner() {
    const ownerId = this.rejectClient.revoltClient.user?.bot?.owner;
    if (!ownerId) return null;

    const owner = this.rejectClient.revoltClient.users.$get(ownerId);
    return new User(owner) as unknown as DiscordUser;
  }

  readonly url = "https://FIXME";

  sourceChannel: any;

  sourceGuild: any;

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
  }

  get createdAt() { return new Date(); }

  get createdTimestamp() { return 0; }

  sendSlackMessage(body: unknown): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  /** FIXME: Literally all of these need stubs */
  async send(message: string | MessageOptions) {
    return null as any;
  }

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
