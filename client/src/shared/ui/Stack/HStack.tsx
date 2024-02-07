import { type FC } from 'react';
import Flex, { type FlexProps } from './Flex';

type HSTackProps = Omit<FlexProps, 'direction'>;

export const HStack: FC<HSTackProps> = ({ ...rest }) => {
  return <Flex direction="row" {...rest} />;
};
