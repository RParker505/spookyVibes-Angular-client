/** @type {import('typedoc').TypeDocOptions} */
module.exports = {
    $schema: "https://typedoc.org/schema.json",
    entryPoints: ["./src/main.ts", "./src/app"],
    entryPointStrategy: "expand",
    out: "docs",
  };