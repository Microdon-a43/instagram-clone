import { type FC } from 'react';
import Flex, { type FlexProps } from './Flex';

type VSTackProps = Omit<FlexProps, 'direction'>;

export const VStack: FC<VSTackProps> = ({ ...rest }) => {
  return <Flex direction="column" {...rest} />;
};


