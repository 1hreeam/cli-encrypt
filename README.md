# @1hreeam/cli-encrypt

CLI tool to encrypt and decrypt files. Small project built so I can understand encryption better.

## How to use?

```bash
cli-encrypt -i <input-path> -o <output-path> -p <password>
```

## Upcoming features

- Logging modes (`--verbose` `--silent`)
- Output file naming (`.enc`, `.dec`)
- Interactive mode (inquirer, readline)
- Large files support (rn reading the whole file into memory)
- Compression

more in [todo.md](./todo.md)

---

*Project built with `typescript` and `commander`*
