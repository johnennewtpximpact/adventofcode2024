export type AntiNode = {
  x: number;
  y: number;
  next: AntiNode | null;
}

export type Antenna = {
  x: number;
  y: number;
}

export type Cluster = {
  label: string;
  antennas: Antenna[];
  next: Cluster | null;
}

const _getResonantAntiNodes = (a: Antenna, b: Antenna, height: number, width: number): AntiNode[] => {
    let x_dir = a.x - b.x;
    let y_dir = a.y - b.y;

    if (x_dir===0 && y_dir===0) throw new Error('same two points would create infinitie loop');

    let x = a.x;
    let y = a.y;
    let resonantAntiNodes: AntiNode[] = [];

    while (x >= 0 && x <= height && y >= 0 && y <= width) {
     resonantAntiNodes.push({
       x: x,
       y: y,
       next: null
     });
      x += x_dir;
      y += y_dir;
    }

    x_dir *= -1;
    y_dir *= -1;
    x = a.x + x_dir;
    y = a.y + y_dir;

    while (x >= 0 && x <= height && y >= 0 && y <= width) {
     resonantAntiNodes.push({
       x: x,
       y: y,
       next: null
     });
      x += x_dir;
      y += y_dir;
    }

    return resonantAntiNodes;
}

/**
 * Given any two nodes, work out where the anti nodes will be.
 *
 * Anti nodes appear on the line containing 2 nodes at points twice as far from one node
 * as the other.
 */
export const getAntiNodes = (a: Antenna, b: Antenna, height: number = 11, width: number = 11, includeResonance: boolean = false): AntiNode[] => {
  if (includeResonance) {
    return _getResonantAntiNodes(a, b, height, width);
  }

  const x_distance = Math.abs(a.x - b.x);
  const y_distance = Math.abs(a.y - b.y);

  const point1 = { x: a.x < b.x ? a.x-x_distance : a.x+x_distance, y: a.y < b.y ? a.y-y_distance : a.y+y_distance, next: null }
  const point2 = { x: b.x < a.x ? b.x-x_distance : b.x+x_distance, y: b.y < a.y ? b.y-y_distance : b.y+y_distance, next: null }

  return [ point1, point2 ].flatMap(s => {
    if (s.x < 0 || s.x > height || s.y < 0 || s.y > width) {
      // Remove anti nodes which are off the grid.
      return [];
    }
    return s;
  });
}

/**
 * Classic linked list data structure.
 */
export const addAntennaToCluster = (cluster: Cluster | null, label: string, rownum: number, colnum: number): Cluster | null => {
  if (cluster === null) {
    return {
      label: label,
      antennas: [{ x: rownum, y: colnum }],
      next: null
    }
  }

  if (cluster.label === label) {
    cluster.antennas.push({ x: rownum, y: colnum });
    return cluster;
  }

  cluster.next = addAntennaToCluster(cluster.next, label, rownum, colnum);
  return cluster;
}

export const getAntennas = (input: string): Cluster | null => {
  return input.split('\n').reduce<Cluster | null>((cluster, line, rownum) => {
    for (let colnum = 0; colnum < line.length; colnum++) {
      if (line[colnum] != '.') cluster = addAntennaToCluster(cluster, line[colnum], rownum, colnum)
    }
    return cluster;
  }, null);
}

export const addAntiNode = (nodes: AntiNode | null, node: AntiNode): AntiNode | null => {
  if (nodes === null) return node;

  if (nodes.x === node.x && nodes.y === node.y) {
    // This node is in here already.
    return nodes;
  }

  nodes.next = addAntiNode(nodes.next, node);
  return nodes;
}

export const mergeAntiNodes = (nodesA: AntiNode | null, nodesB: AntiNode | null): AntiNode | null => {
  if (nodesB === null) return nodesA;

  const next = nodesB.next;
  nodesB.next = null;
  addAntiNode(nodesA, nodesB);

  return mergeAntiNodes(nodesA, next);
}

export const countLinkedList = (nodes: AntiNode | null): number => {
  if (nodes === null) return 0;
  return countLinkedList(nodes.next) + 1;
}

export const getAntiNodesFromCluster = (cluster: Cluster | null, height: number = 11, width: number = 11, includeResonance: boolean = false): AntiNode | null => {
  if (cluster === null) return null;

  const thisAntiNodes = cluster.antennas.reduce<AntiNode | null>((acc, curr, index, arr) => {
    for (let i = index + 1; i < arr.length; i++) {
      const antiNodes = getAntiNodes(curr, arr[i], height, width, includeResonance);
      for (let j = 0; j < antiNodes.length; j++) {
        acc = addAntiNode(acc, antiNodes[j]);
      }
    }

    return acc;
  }, null);

  if (cluster.next === null) {
    return thisAntiNodes;
  }

  return mergeAntiNodes(thisAntiNodes, getAntiNodesFromCluster(cluster.next, height, width, includeResonance));
}

export const countAntiNodes = (input: string, height: number = 11, width: number = 11): number => {
  const antennas = getAntennas(input);
  const antiNodes = getAntiNodesFromCluster(antennas, height, width);
  return countLinkedList(antiNodes);
}

export const countResonantAntiNodes = (input: string, height: number = 11, width: number = 11): number => {
  const antennas = getAntennas(input);
  const antiNodes = getAntiNodesFromCluster(antennas, height, width, true);
  return countLinkedList(antiNodes);
}

