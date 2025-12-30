# @1hreeam/cli-encrypt

CLI tool to encrypt and decrypt files.

## How to use?

```bash
cli-encrypt -i <input-path> -o <output-path>
```

There're also two logging mode flags:

- `-s` or `--silent` - for no output messages (excluding error messages)
- `-v` or `--verbose` `type: number` - level of verbosity of output `(0-4)`

## Upcoming features

- Deafult output file naming (`.enc`, `.dec`)
- Large files support (rn reading the whole file into memory)
- Compression

more in [todo.md](./todo.md)

---

_Project built with `typescript`, `commander`, `ora`, `inquirer`, `chalk`_
