import feather, { FeatherIconNames } from 'feather-icons';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import './icon.scss';

interface IconProps extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
	name: FeatherIconNames;
}

function Icon({ name, ...props }: IconProps) {
	return <span dangerouslySetInnerHTML={{ __html: feather.icons[name].toSvg() }} {...props}></span>;
}

export default Icon;
