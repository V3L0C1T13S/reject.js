import { Client as RevoltClient, Server as RevoltServer } from "revolt.js";
import { ApplicationCommand } from "../../ApplicationCommand";
import { Client } from "../../Client";
import { CachedManager } from "../CachedManager";
import { ApplicationCommandPermissionsManager } from "./ApplicationCommandPermissionsManager";

export class ApplicationCommandManager extends CachedManager<ApplicationCommand> {
  protected revoltServer?: RevoltServer;

  permissions = new ApplicationCommandPermissionsManager(this);

  constructor(client: Client, iterable: boolean) {
    // FIXME: major hack!
    super(client, ApplicationCommand as any, iterable);
  }
}
