
# node-together

**CLI tool for easily sharing [Node](https://nodejs.org) projects.**

## Installation

`npm install --global node-together`

## Usage

**copy**

- **default**: `node-together copy`: copies the current directory and all sub-directories, excluding the `node_modules` folder, and copies the `session-id` to the clipboard
- **with directory and file matching**: `node-together copy '*' '!node_modules' '!.git' '!private.config'`
- **without clipboard**: `node-together copy --no-clipboard`
- **with your own server**: `node-together copy --server ws://example.com`

**paste**

- **default**: `node-together paste`: retrieves the `session-id` from the clipboard and pastes the corresponding files into the current directory
- **without clipboard**: `node-together paste 50M3-R4ND0M-5355l0-lD`
- **with your own server**: `node-together paste --server ws://example.com`

## Todos

- [ ] host `node-together` on the `maju.systems` server
- [ ] add `--server` option
- [ ] add tests
- [ ] add logging


## License

[WTFPL](http://www.wtfpl.net/) – Do What the F*ck You Want to Public License.

Made with :heart: by [@MarkTiedemann](https://twitter.com/MarkTiedemannDE) @ [maju.systems](https://maju.systems).
