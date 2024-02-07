export type Mods = Record<string, boolean | string | number>;

export const classNames = (styles: string, mods?: Mods, addn?: string[]) => {
  return [
    styles,
    ...Object.entries(mods)
      .filter(([_, value]) => Boolean(value))
      .map(([className]) => className),
    ...addn
  ].join(' ');
};
