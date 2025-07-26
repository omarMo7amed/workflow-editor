export interface Node {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  type: 0 | 1 | 2;
  vx: number;
  vy: number;
}

export interface Connection {
  id: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface ObjectiveCardProps {
  id: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
}

export interface TableOfContentsProps {
  activeSection: string;
}

export interface docsNavigationItems {
  id: string;
  title: string;
  level: number;
}

export interface PortfolioValueCardProps {
  id: string;
  title: string;
  items: string[];
}

export interface DevObjective {
  id: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
}

