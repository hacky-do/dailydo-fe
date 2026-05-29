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
  completed: 'bg-complate-card-pattern',
  specialCompleted: 'bg-special-complate-card-pattern',
};

export const cardBorderStyles: Record<
  'none' | 'selected' | 'specialSelected',
  string
> = {
  none: 'border-transparent',
  selected: 'border-3 border-green-500',
  specialSelected: 'border-3 border-special-border',
};

export const getCardBorderStyle = (
  selected: boolean,
  isSpecial: boolean,
): string => {
  if (!selected) return cardBorderStyles.none;
  return isSpecial
    ? cardBorderStyles.specialSelected
    : cardBorderStyles.selected;
};
