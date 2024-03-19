# tghelew's Karabiner Elements configuration based on [@mxstbr](https:github.com/mxstbr/karabiner) config.

The main reason I didn't forked the original repo is because it doesn't seem to be maintained and I wanted to customize it to my own preferred taste which might not be what @mxstbr indented to.
Anyway thank you [@mxstbr](https://github.com/mxstbr) for the idea and implementation.

The general idea is to simplify karabiner's configuration using Typescript for type-safety and custom configuration generator thanks to a single file `rules.ts` and additional helper `.ts` file.

You certainly don't want my configuration as it is, you want to change the `rules.ts` file to fit your own needs.

*Please note that this _My personal karabiner config_ and I don't intend to make it fit all possible configuration options.*

## Installation
1. Install & start [Karabiner Elements](https://karabiner-elements.pqrs.org/)
2. Clone this repository
3. Backup the default `~/.config/karabiner` folder to something like `~/.config/karabiner-origin`
4. Create a symlink with `ln -s ~/<where you cloned the repository>/karabiner-config ~/.config/karabiner` 
5. [Restart karabiner_console_user_server](https://karabiner-elements.pqrs.org/docs/manual/misc/configuration-file-path/) with `` launchctl kickstart -k gui/`id -u`/org.pqrs.karabiner.karabiner_console_user_server ``

### Nix Darwin
A [service](https://daiderd.com/nix-darwin/manual/index.html#opt-services.karabiner-elements.enable) is available. 
_Warning_: Make sure to enable SPI as without it I wasn't able to allow the virtual driver activation ([github issue](https://github.com/pqrs-org/Karabiner-Elements/issues/2876#issuecomment-966949536))

If you're using nix Flakes checkout my [repo](https://github.com/tghelew/nixos-config/tree/dev/modules/darwin/desktop/karabiner.nix) where I've automated the installation of the `karabiner.json` file.
    
## Development

```
yarn install
```

to install the dependencies. (one-time only)

```
yarn run check
```

to validate the rules.

```
yarn run build
```

builds the `karabiner.json` from the `rules.ts`.

```
yarn run watch
```

watches the TypeScript files and rebuilds whenever they change.

## License

Copyright (c) 2024 Maximilian Stoiber & Thierry Ghelew, licensed under the [MIT license](./LICENSE.md).
