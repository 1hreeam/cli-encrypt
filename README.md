# @1hreeam/cli-encrypt

CLI tool to encrypt and decrypt files.

## Usage

### Encryption

Usage:

```bash
cli-encrypt encrypt -i <inputPath> [options]
```

There are aliases for `encrypt` command: `enc` & `e`. <br>
As well as for `decrypt`: `dec` & `d`

### Decryption

```bash
cli-encrypt decrypt -i <inputPath> [options]
```

### Options

```bash
-o, --output <file>     Output path
-s, --silent            Silent output verbosity
-v, --verbose <number>  Output verbosity level
```

If no `--output` is provided the output file will be in the input file directory with `.enc` or `.dec` extension.

Example:

```bash
example.md >> example.enc.md
```

There're also two logging mode flags:

- `-s` or `--silent` - for no output messages (excluding error messages)
- `-v` or `--verbose` `type: number` - level of verbosity of output `(0-4)`

## Upcoming features

- Large files support (rn reading the whole file into memory)
- Compression

more in [todo.md](./todo.md)

---

_Project built with `typescript`, `commander`, `ora`, `inquirer`, `chalk`_
