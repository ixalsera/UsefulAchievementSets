# Useful Achievement Sets

A [Millennium](https://github.com/SteamClientHomebrew/Millennium) plugin to provide actual, useful achievement sets for Steam games (when the developer can't or won't), according to [SteamHunters](https://steamhunters.com).

## Features

- **Achievement Sets** for all (probably) games on Steam, even if the developer hasn't added them yet, determined by update, DLC, and curated by the community.
- **Sorting and Filtering** of achievements by rarity, point value, name, etc.

## In Progress

The following features are still in development:

- **Big Picture Mode**: Navigate your shmexy achievement sets from your couch/bed/floor with just a controller.
- **Achievement Tags**: See whether the achievement is difficulty specific, requires an in-app purchase, or more with user curated tags.
- **Advanced Filtering**: Use specific filter masks to find exactly what you're looking (or not looking!) for.
- **Customization**: Don't like the rarity background? Want to hide some info? Want to show more? Just change your settings and bam!

## Contributing

Contributions are welcome, whether in the form of Pull Requests, suggestions, or reporting issues.

If you find something wrong with the plugin, please report it as an Issue in GitHub. Data issues (incorrect grouping, missing DLC, etc.) should be reported via the normal means to the SteamHunters team.

## Developers

Want to jump in to the code? Great! Feel free to fork and PR. <3

### Prerequisites

- **[Millennium](https://github.com/SteamClientHomebrew/Millennium)** >= v3.4.0
- **[Bun](https://bun.com/)** >= v1.0.0

### Building

```shell
# Install frontend npm modules
bun install

# Build the plugins frontend
bun run build

# Build the plugin and start Steam in dev mode
bun run dev:build
```

That's it! Millennium & starlight (plugin compiler) will automatically set up your plugin! You can enable it in Millennium Settings.

***Note**: Millennium has a bug currently that prevents RPC calls from working properly on restart when using `bun run dev`. Use `dev:build` in the meantime to get it to start Steam after building and catch `SIGINT`/`SIGTERM` to properly shut it down afterwards. YMMV.
