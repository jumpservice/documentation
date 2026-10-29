/**
 * Merge repeated first-column group labels in rendered markdown tables.
 *
 * This runs on the HTML AST (after markdown tables have been converted to
 * `table` / `tr` / `td` elements), so removing a duplicate cell here does not
 * cause the markdown table renderer to pad the row with an empty cell.
 */

const textOf = (node) => {
  if (!node) return "";
  if (node.type === "text") return node.value;
  return (node.children ?? []).map(textOf).join("");
};

const isElement = (node, tagName) =>
  node?.type === "element" && node.tagName === tagName;

const isGroupTable = (table) => {
  const head = table.children?.find((child) => isElement(child, "thead"));
  const headerRow = head?.children?.find((child) => isElement(child, "tr"));
  const firstCell = headerRow?.children?.find((child) => isElement(child, "th"));
  const label = textOf(firstCell).trim().toLowerCase();
  return label === "group" || label === "分组";
};

const mergeRows = (tbody) => {
  const rows = (tbody.children ?? []).filter((child) => isElement(child, "tr"));
  let index = 0;

  while (index < rows.length) {
    const firstCell = rows[index].children?.find((child) =>
      isElement(child, "td"),
    );
    const label = textOf(firstCell).trim();
    if (!label) {
      index += 1;
      continue;
    }

    let end = index + 1;
    while (end < rows.length) {
      const cell = rows[end].children?.find((child) => isElement(child, "td"));
      if (textOf(cell).trim() !== label) break;
      end += 1;
    }

    const span = end - index;
    if (span > 1) {
      firstCell.properties = {
        ...(firstCell.properties ?? {}),
        rowSpan: span,
      };

      for (let rowIndex = index + 1; rowIndex < end; rowIndex += 1) {
        const cellIndex = rows[rowIndex].children.findIndex((child) =>
          isElement(child, "td"),
        );
        if (cellIndex >= 0) rows[rowIndex].children.splice(cellIndex, 1);
      }
    }

    index = end;
  }
};

export default function rehypeTableGroupRowspan() {
  return (tree) => {
    const visit = (node) => {
      if (!node || typeof node !== "object") return;

      if (isElement(node, "table") && isGroupTable(node)) {
        for (const tbody of node.children ?? []) {
          if (isElement(tbody, "tbody")) mergeRows(tbody);
        }
      }

      for (const child of node.children ?? []) visit(child);
    };

    visit(tree);
  };
}
