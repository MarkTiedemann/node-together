
# node-together

**CLI tool for easy, one-time sharing of [Node](https://nodejs.org) projects.**

## Installation

`npm i -g node-together`

## Usage

**copy**

- **default**: `node-together copy`: selects the current directory and all sub-directories, excluding dotfiles and the `node_modules` folder, and copies the `session-id` to the clipboard
- **with directory and file matching**: `node-together copy --include '{**,.gitignore}' --exclude '{dist/**,node_modules/**}'`: includes the `.gitignore` file and excludes the `dist` folder
- **without clipboard**: `node-together copy --no-clipboard`: does not copy the `session-id` to the clipboard but instead writes it to `stdout`
- **with your own server**: `node-together copy --server ws://example.com`

**paste**

- **default**: `node-together paste`: retrieves the `session-id` from the clipboard and pastes the corresponding files into the current directory
- **without clipboard**: `node-together paste --session-id SUP3R-R4ND0M-5355l0-lD`
- **with your own server**: `node-together paste --server ws://example.com`

## License

[WTFPL](http://www.wtfpl.net/) – Do What the F*ck You Want to Public License.

Made with :heart: by [@MarkTiedemann](https://twitter.com/MarkTiedemannDE) @ [maju.systems](https://maju.systems).
