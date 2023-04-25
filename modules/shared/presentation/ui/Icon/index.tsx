import { IconType, IconBaseProps } from 'react-icons';
import { IoMdMenu } from 'react-icons/io';

export type IconsName = 'menu';

const icons: Record<IconsName, IconType> = {
  menu: IoMdMenu,
};

interface Props extends IconBaseProps {
  iconName: IconsName;
}

export const Icon = (props: Props) => {
  const { iconName, ...rest } = props;
  const ComponentWithIcon = icons[iconName];

  return <ComponentWithIcon {...rest} />;
};
