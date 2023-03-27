import { DirectionalHint } from '@fluentui/react';
import {
    containerClassName,
    iconStyles,
    pagesClassName,
    paginatorNumberStyles
} from './paginator.styles';
import { PaginatorItem } from '../PaginatorItem/paginatorItem';
import { DefaultButton } from 'office-ui-fabric-react';

export const Paginator = (): JSX.Element => {
    return <div style={{ height: '71px', left: '0px', right: '17px', bottom: '25px' }}
        className={containerClassName}>
        <div className={pagesClassName}>
            <div style={{ display: 'inline' }} id='previous' >
                <PaginatorItem isLeft={true}
                    directionalHint={DirectionalHint.bottomCenter}
                    tooltipPropsContent={"Page 1"}
                    iconStyles={iconStyles}
                    iconName={'Next'} />
                <PaginatorItem directionalHint={DirectionalHint.bottomCenter}
                    iconStyles={iconStyles}
                    tooltipPropsContent={"2"}
                    iconName={'FlickRight'} />
                <DefaultButton
                    styles={paginatorNumberStyles}
                    text="1" />
            </div>
            <div style={{ marginLeft: '20px', display: 'inline' }}>
                <DefaultButton
                    styles={paginatorNumberStyles}
                    text="2" />
                <PaginatorItem directionalHint={DirectionalHint.bottomCenter}
                    iconStyles={iconStyles}
                    tooltipPropsContent={"3"}
                    iconName={'FlickLeft'} />
                <PaginatorItem directionalHint={DirectionalHint.bottomCenter}
                    iconStyles={iconStyles}
                    tooltipPropsContent={"4"}
                    iconName={'Next'} />
            </div>
        </div>
        <div>
        </div>
    </div>
};