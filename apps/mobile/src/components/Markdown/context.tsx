import { Definition, Root } from 'mdast';
import React, { createContext, useContext } from 'react';
import { ColorValue, ImageStyle, TextStyle, ViewStyle } from 'react-native';

import { Renderers } from './renderers/renderers';

export type RemarkStyles = {
  blockCode?: ViewStyle;
  blockQuote?: ViewStyle;
  blockQuoteColor: ColorValue;
  borderColor: ColorValue;
  break?: TextStyle;
  container?: ViewStyle;
  delete?: TextStyle;
  emphasis?: TextStyle;
  fontSize?: number;
  footnoteReference?: TextStyle;
  heading?: (level: number) => TextStyle;
  image?: ImageStyle;
  inlineCode?: TextStyle;
  link?: TextStyle;
  linkReference?: TextStyle;
  list?: ViewStyle;
  listItem?: ViewStyle;
  listMarkerColor: ColorValue;
  paragraph?: TextStyle;
  strong?: TextStyle;
  table?: ViewStyle;
  td?: TextStyle;
  text?: TextStyle;
  textColor?: string;
  th?: TextStyle;
  thead?: ViewStyle;
  thematicBreak?: ViewStyle;
  tr?: ViewStyle;
};

export type MarkdownContextType = {
  contentSize: { height: number; width: number };
  definitions: Record<string, Definition>;
  renderers: Renderers;
  styles: Partial<RemarkStyles>;
  tree: Root;
};

export const MarkdownContext = createContext<MarkdownContextType | undefined>(undefined);

export const useMarkdownContext = (): MarkdownContextType => {
  const context = useContext(MarkdownContext);
  if (!context) {
    throw new Error('useMarkdownContext must be used within a MarkdownContextProvider');
  }
  return context;
};

export type MarkdownContextProviderProps = {
  children: React.ReactNode;
  contentSize: { height: number; width: number };
  definitions: Record<string, Definition>;
  renderers: Renderers;
  styles: Partial<RemarkStyles>;
  tree: Root;
};

export const MarkdownContextProvider = ({
  children,
  contentSize,
  definitions,
  renderers,
  styles,
  tree,
}: MarkdownContextProviderProps) => {
  return (
    <MarkdownContext.Provider value={{ contentSize, definitions, renderers, styles, tree }}>
      {children}
    </MarkdownContext.Provider>
  );
};
