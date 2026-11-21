export class TreeNode {
  private readonly children: TreeNode[] = [];

  constructor(private readonly nodeName: string) {}

  get name(): string {
    return this.nodeName;
  }

  get nodes(): TreeNode[] {
    return this.children;
  }

  isLeaf(): boolean {
    return this.children.length === 0;
  }

  addNode(node: TreeNode): void {
    this.children.push(node);
  }
}
