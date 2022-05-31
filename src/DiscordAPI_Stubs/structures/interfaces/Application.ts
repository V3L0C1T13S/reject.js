import { ImageURLOptions } from "discord.js";
import { Client as revoltClient } from "revolt.js";
import { Client } from "../../../Client";
import { baseClass } from "../../Base";

export class Application extends baseClass {
  protected revoltClient: revoltClient;

  // eslint-disable-next-line no-use-before-define
  protected rejectClient: Client;

  get createdAt() { return this.rejectClient.user?.createdAt; }

  get createdTimestamp() { return this.rejectClient.user?.createdAt; }

  description = "FIXME";

  get icon() {
    return this.iconURL();
  }

  get id() {
    return this.revoltClient.user?._id ?? "0";
  }

  get name() { return this.revoltClient.user?.username; }

  constructor(rClient: revoltClient) {
    super();
    this.revoltClient = rClient;
    // eslint-disable-next-line no-use-before-define
    this.rejectClient = new Client(this.revoltClient);
  }

  coverURL() {
    return "https://FIXME";
  }

  /** @deprecated */
  async FetchAssets() {
    return [];
  }

  iconURL(options?: ImageURLOptions) {
    return this.rejectClient.user?.avatarURL(options ?? { size: 128 });
  }

  toString() {
    return this.name;
  }
}
