export class TreeNode {
  private readonly _name: string;
  private _nodes: TreeNode[] = [];

  constructor(name: string) {
    this._name = name;
  }

  get name(): string {
    return this._name;
  }

  get nodes(): TreeNode[] {
    return this._nodes;
  }

  isLeaf(): boolean {
    return this._nodes.length === 0;
  }

  addNode(node: TreeNode): void {
    this._nodes.push(node);
  }
}
