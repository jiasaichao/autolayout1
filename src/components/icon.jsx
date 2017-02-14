import { Common, Global } from "../utils/common";
import { Wrapped } from './wrapped';
import * as icons from '../data/icons';
/**
 * 图标
 * name:图标名称
 * color:图标颜色
 * width:宽度
 * height:高度
 * className
 * style
 */
export function Icon({name,style, color='#fff', width = 16, height = 16, className = 'icon'}) {
    let styles = {
        style: Global.styles.create({ fill: color }).merge(style)
    };
    debugger;
    
    return (
        <svg className={className} style={styles.style.o} width={width} height={height}>
            <use xlinkHref={icons[name]} />
        </svg>
    );
}

export const IconWrapped = Wrapped(Icon);