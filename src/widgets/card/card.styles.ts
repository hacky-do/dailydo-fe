export type CardVariant =
  | 'basic'
  | 'special'
  | 'completed'
  | 'specialCompleted';

export const getCardVariant = (
  isSpecial: boolean,
  isCompleted: boolean,
): CardVariant => {
  if (isCompleted && isSpecial) return 'specialCompleted';
  if (isCompleted) return 'completed';
  if (isSpecial) return 'special';
  return 'basic';
};

export const cardBgStyles: Record<CardVariant, string> = {
  basic: 'bg-basic-mission-card-pattern',
  special: 'bg-special-mission-card-pattern',
  completed: 'bg-complete-card-pattern',
  specialCompleted: 'bg-special-complete-card-pattern',
};

export const cardBorderBase = 'border-3';

export const cardBorderStyles: Record<
  'none' | 'selected' | 'specialSelected',
  string
> = {
  none: 'border-transparent',
  selected: 'border-green-500',
  specialSelected: 'border-special-border',
};

export const getCardBorderStyle = (
  selected: boolean,
  isSpecial: boolean,
): string => {
  const color = !selected
    ? cardBorderStyles.none
    : isSpecial
      ? cardBorderStyles.specialSelected
      : cardBorderStyles.selected;
  return `${cardBorderBase} ${color}`;
};
