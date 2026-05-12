export function csvToArray(csv: string) {
  const lines = csv.trim().split(/\r\n|\n|\r/);

  const headers = lines[0].split(",");

  return lines
    .slice(1)
    .filter((line) => line.trim())
    .map((line) => {
      const values = line.split(",");

      return Object.fromEntries(
        headers.map((header, i) => [header.trim(), values[i]?.trim()]),
      );
    });
}