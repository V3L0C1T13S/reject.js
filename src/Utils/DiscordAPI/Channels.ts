/* eslint-disable no-shadow */
/* eslint-disable no-redeclare */
import { ChannelType } from "discord.js";
import { API, Channel as revoltChannel } from "revolt.js";
import {
  BaseChannel,
  BaseGuildTextChannel, Client, DMChannel, TextBasedChannels, VoiceChannel,
} from "../../DiscordAPI_Stubs";
import { swap } from "../js";

type channelsEnumType = {
  [Property in ChannelType]: API.Channel["channel_type"];
}

// Discord -> Revolt
export const channelsMap: { [key: string]: API.Channel["channel_type"] } = {
  DM: "DirectMessage",
  GROUP_DM: "Group",
  GUILD_TEXT: "TextChannel",
  GUILD_VOICE: "VoiceChannel",
};

export const channelEnumMap: channelsEnumType = {
  [ChannelType.GuildText]: "TextChannel",
  [ChannelType.DM]: "DirectMessage",
  [ChannelType.GuildVoice]: "VoiceChannel",
  [ChannelType.GroupDM]: "Group",
  [ChannelType.GuildCategory]: "SavedMessages",
  [ChannelType.GuildNews]: "TextChannel",
  [ChannelType.GuildNewsThread]: "TextChannel",
  [ChannelType.GuildPublicThread]: "TextChannel",
  [ChannelType.GuildPrivateThread]: "TextChannel",
  [ChannelType.GuildStageVoice]: "VoiceChannel",
  [ChannelType.GuildDirectory]: "SavedMessages",
  [ChannelType.GuildForum]: "SavedMessages",
};

// Revolt -> Discord
export const discordChannelsMap = swap(channelsMap);

export const discordEnumChannelMap: { [key: string ]: number } = swap(channelEnumMap);

type channelTypeParams = API.Channel["channel_type"] | keyof typeof channelEnumMap

export function convertChannelType<B extends boolean>(
  channelType: channelTypeParams, toRevolt: B
): B extends true ? string : ChannelType
export function convertChannelType(channelType: channelTypeParams, toRevolt: boolean) {
  if (toRevolt) {
    if (typeof channelType !== "number") {
      throw new Error("Invalid type - should be of type number");
    }

    return channelEnumMap[channelType] ?? "TextChannel";
  }

  return discordEnumChannelMap[channelType] ?? ChannelType.GuildText;
}

export function createChannelfromRevolt<T extends revoltChannel>(
  channel: T, client: Client
) : T["channel_type"] extends "VoiceChannel" ? VoiceChannel : TextBasedChannels
export function createChannelfromRevolt(channel: revoltChannel, client: Client) {
  let rejectChannel: BaseChannel;

  switch (channel.channel_type) {
    case "TextChannel": {
      rejectChannel = new BaseGuildTextChannel(channel, client);
      break;
    }
    case "VoiceChannel": {
      rejectChannel = new VoiceChannel(channel, client);
      break;
    }
    case "DirectMessage": {
      rejectChannel = new DMChannel(channel, client);
      break;
    }
    default: {
      rejectChannel = new BaseGuildTextChannel(channel, client);
    }
  }

  return rejectChannel;
}
