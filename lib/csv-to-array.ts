export function csvToArray(csv: string) {
  const lines = csv.trim().split("\n");

  const headers = lines[0].split(",");

  return lines.slice(1).map((line) => {
    const values = line.split(",");

    return Object.fromEntries(
      headers.map((header, i) => [header.trim(), values[i]?.trim()]),
    );
  });
}