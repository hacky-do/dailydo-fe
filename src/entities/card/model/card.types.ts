export interface CardContextProps {
  flipped: boolean;
  isSpecial: boolean;
  isCompleted: boolean;
  onFlip: () => void;
  onUnflip: () => void;
}

export interface CardProps {
  id: string;
  title: string;
  categoryId: string;
  categoryName: string;
  image: string;
  completedCount: number;
  createdAt: string;
  updatedAt: string;
  isSpecial: boolean;
  onSkip?: (id: string) => void;
  onSelect?: (id: string) => void;
  onCancel?: (id: string) => void;
  children?: React.ReactNode;
}
