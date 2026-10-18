export type SuperHero = {
  rank: number;
  name: string;
  power: string;
};

export type SuperHeroCardProps = {
  hero: SuperHero;
  onPromote: (heroRank: number) => void;
};