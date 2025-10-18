import { Link, LinkReference } from 'mdast';
import { ReactNode } from 'react';
import { Text } from 'react-native';

import { useMarkdownContext } from '../context';
import { RendererArgs } from './renderers';

export const LinkReferenceRenderer = ({ node }: RendererArgs<LinkReference>): ReactNode => {
  const { renderers, styles } = useMarkdownContext();
  const { PhrasingContentRenderer } = renderers;

  return (
    <Text style={styles.linkReference}>
      {node.children.map((child, index) => (
        <PhrasingContentRenderer index={index} key={index} node={child} parent={node} />
      ))}
    </Text>
  );
};

export const LinkRenderer = ({ node }: RendererArgs<Link>): ReactNode => {
  const { renderers, styles } = useMarkdownContext();
  const { PhrasingContentRenderer } = renderers;

  return (
    <Text style={styles.link}>
      {node.children.map((child, index) => (
        <PhrasingContentRenderer index={index} key={index} node={child} parent={node} />
      ))}
    </Text>
  );
};
