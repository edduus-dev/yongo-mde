import { Editor, Element, Location, Path } from "slate"

import { findElementUp } from "~/src/sink"

import {
  TableCellElement,
  TableColumn,
  TableElement,
  TableRowElement,
} from "../types"

/**
 * The TableInfo object that includes quick access information starting from a
 * cell in a table including information about the row and the table.
 *
 * NOTE:
 *
 * This is flat and not nested because it makes destructuring easier, for
 * example, in the table methods.
 */
export type TableInfo = {
  tableElement: TableElement
  tablePath: Path
  tableColumns: TableColumn[]
  rowElement: TableRowElement
  rowPath: Path
  rowIndex: number
  rowCount: number
  cellElement: TableCellElement
  cellPath: Path
  cellIndex: number
  cellCount: number
}

/**
 * get table info
 */

export function getTableInfo(
  editor: Editor,
  { at = editor.selection }: { at?: Location | Element | null } = {}
): TableInfo | undefined {
  if (at == null) return undefined
  const cellMatch = findElementUp<TableCellElement>(editor, "table-cell", {
    at,
  })
  if (!cellMatch) return undefined
  const rowMatch = findElementUp<TableRowElement>(editor, "table-row", {
    at,
  })
  if (!rowMatch) return undefined
  const tableMatch = findElementUp<TableElement>(editor, "table", { at })
  if (!tableMatch) return undefined
  const [tableElement, tablePath] = tableMatch
  const [rowElement, rowPath] = rowMatch
  const [cellElement, cellPath] = cellMatch
  return {
    tableElement,
    tablePath,
    tableColumns: tableElement.columns,
    rowElement,
    rowPath,
    rowIndex: rowPath.slice(-1)[0],
    rowCount: tableElement.children.length,
    cellElement,
    cellPath,
    cellIndex: cellPath.slice(-1)[0],
    cellCount: rowElement.children.length,
  }
}
