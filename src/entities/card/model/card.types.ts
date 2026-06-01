export interface CardContextProps {
  flipped: boolean;
  isSpecial: boolean;
  isCompleted: boolean;
  onFlip: () => void;
  onUnflip: () => void;
}
