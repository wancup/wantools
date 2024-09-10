import { match } from "ts-pattern";
import { TreeNode } from "./tree-node";

const INDENT_CODES = {
  child: "├─",
  end: "└─",
  continue: "│ ",
  skip: "  ",
} as const;
const INDENT_MARKER = "-";
const INDENT_SPACER = " ";
const INDENT_CODE_LENGTH = INDENT_CODES.skip.length + INDENT_SPACER.length;
const STYLED_INDENT_REGEX = new RegExp(`^(${Object.values(INDENT_CODES).join("|")}|${INDENT_SPACER})*`);

interface ParsedLine {
  indent: number;
  name: string;
}

interface Indent {
  type: keyof typeof INDENT_CODES;
}

export class DirectoryTree {
  constructor(private _nodes: TreeNode[]) {}

  static fromRawText(text: string): DirectoryTree {
    const lines = text.split("\n");
    const nodes: TreeNode[] = [];

    lines.forEach((line) => {
      const parsed = this.parseRawLine(line);

      if (parsed.indent === 0) {
        const root = new TreeNode(parsed.name);
        nodes.push(root);
      } else {
        let latestNode = nodes[nodes.length - 1];
        for (let depth = 1; depth <= parsed.indent; ++depth) {
          if (depth === parsed.indent) {
            latestNode?.addNode(new TreeNode(parsed.name));
          } else {
            latestNode = latestNode?.nodes.length === 0
              ? new TreeNode("")
              : latestNode?.nodes[latestNode.nodes.length - 1];
          }
        }
      }
    });

    return new DirectoryTree(nodes);
  }

  static fromStyledText(text: string): DirectoryTree {
    const lines = text.split("\n");
    const nodes: TreeNode[] = [];

    lines.forEach((line) => {
      const parsed = this.parseStyledLine(line);

      if (parsed.indent === 0) {
        const root = new TreeNode(parsed.name);
        nodes.push(root);
      } else {
        let latestNode = nodes[nodes.length - 1];
        for (let depth = 1; depth <= parsed.indent; ++depth) {
          if (depth === parsed.indent) {
            latestNode?.addNode(new TreeNode(parsed.name));
          } else {
            latestNode = latestNode?.nodes.length === 0
              ? new TreeNode("")
              : latestNode?.nodes[latestNode.nodes.length - 1];
          }
        }
      }
    });

    return new DirectoryTree(nodes);
  }

  private static parseRawLine(line: string): ParsedLine {
    const matches = line.match(new RegExp(`^${INDENT_MARKER}*`));
    if (matches) {
      const indent = matches[0];
      const name = line.slice(indent.length);
      return {
        indent: indent.length,
        name: name.trim(),
      };
    } else {
      return {
        indent: 0,
        name: line,
      };
    }
  }

  private static parseStyledLine(line: string): ParsedLine {
    const matches = line.match(STYLED_INDENT_REGEX);
    if (matches) {
      const indent = matches[0];
      const name = line.slice(indent.length);
      const indentLength = Math.floor(indent.length / INDENT_CODE_LENGTH);
      return {
        indent: indentLength,
        name: name.trim(),
      };
    } else {
      return {
        indent: 0,
        name: line.trim(),
      };
    }
  }

  toStyledText(): string {
    return this._nodes
      .map((n) => this._toStyledNodeText(n, []))
      .join("\n");
  }

  toRawText(): string {
    return this._nodes
      .map((n) => this._toRawNodeText(n, []))
      .join("\n");
  }

  private _toStyledNodeText(node: TreeNode, indents: Indent[]): string {
    const indentText = indents.length > 0
      ? indents.map((i) => INDENT_CODES[i.type]).join(INDENT_SPACER) + INDENT_SPACER
      : "";
    let lines = [indentText + node.name];
    if (!node.isLeaf()) {
      const childLines = node.nodes.map((n, ni) => {
        const _indents: Indent[] = indents.map((i) =>
          match(i)
            .with({ type: "child" }, () => ({ type: "continue" } as const))
            .with({ type: "end" }, () => ({ type: "skip" } as const))
            .otherwise((i) => i)
        );
        const indentType = ni === node.nodes.length - 1 ? "end" : "child";
        return this._toStyledNodeText(n, [..._indents, { type: indentType }]);
      });
      lines = [...lines, ...childLines];
    }

    return lines.join("\n");
  }

  private _toRawNodeText(node: TreeNode, indents: string[]): string {
    const indentText = indents.length > 0 ? indents.join("") + INDENT_SPACER : "";
    let lines = [indentText + node.name];
    if (!node.isLeaf()) {
      const childLines = node.nodes.map((n) => {
        return this._toRawNodeText(n, [...indents, INDENT_MARKER]);
      });
      lines = [...lines, ...childLines];
    }

    return lines.join("\n");
  }
}
