import { DirectionalHint } from '@fluentui/react';
import {
    containerClassName,
    iconStyles,
    paginatorNumberStyles
} from './paginator.styles';
import { PaginatorItem } from '../PaginatorItem/paginatorItem';
import { DefaultButton } from 'office-ui-fabric-react';
import { IPaginatorProps } from './paginator.types';
import {
    useEffect,
    useState
} from 'react';
import { START_PAGE_INDEX } from '../../Library/constants';

export const Paginator = (props: IPaginatorProps): JSX.Element => {
    const [selectedPageIndex, setSelectedPageIndex] = useState<number>(START_PAGE_INDEX);
    const [previousUrl, setPreviousUrl] = useState<string>('');

    useEffect(() => {
        const currentUrl = window.location.href;
        if(currentUrl !== previousUrl)
        {
            onGoToFirstPageClick();
        }
        setPreviousUrl(currentUrl);
        if (props.isPageEdited === true) {
            onGoToFirstPageClick();
        }
        if (props.loadFromPage) {
            props.onPageChange(selectedPageIndex);
        }
    }, [props.totalItemsCount, props.isPageEdited]);

    const getNumberOfPages = (): number => {
        return Math.ceil(props.totalItemsCount / props.itemsPerPage);
    };

    const onPreviousPageClick = (): void => {
        const newSelectedPageIndex: number = selectedPageIndex - 1;
        setSelectedPageIndex(newSelectedPageIndex);
        props.onPageChange(newSelectedPageIndex);
    };

    const onNextPageClick = (): void => {
        const newSelectedPageIndex: number = selectedPageIndex + 1;
        setSelectedPageIndex(newSelectedPageIndex);
        props.onPageChange(newSelectedPageIndex);
    };

    const onGoToFirstPageClick = (): void => {
        setSelectedPageIndex(START_PAGE_INDEX);
        props.onPageChange(START_PAGE_INDEX);
    };

    const onGoToLastPageClick = (): void => {
        const lastPageIndex: number = getNumberOfPages();
        setSelectedPageIndex(lastPageIndex);
        props.onPageChange(lastPageIndex);
    };

    const isFirstPage = (): boolean => {
        return selectedPageIndex === 1 || props.totalItemsCount === 0;
    };

    const isLastPage = (): boolean => {
        return selectedPageIndex === getNumberOfPages() || props.totalItemsCount === 0;
    };

    return <div style={{ height: '71px', left: '0px', right: '17px', bottom: '25px' }}
        className={containerClassName}>
        <div>
            <div style={{ display: 'inline' }} id='previous' >
                <PaginatorItem isLeft={true}
                    directionalHint={DirectionalHint.leftCenter}
                    disabled={isFirstPage()}
                    iconStyles={iconStyles}
                    tooltipPropsContent={isFirstPage() ? undefined : START_PAGE_INDEX.toString()}
                    onClick={onGoToFirstPageClick}
                    iconName={'Next'} />
                <PaginatorItem directionalHint={DirectionalHint.bottomCenter}
                    disabled={isFirstPage()}
                    iconStyles={iconStyles}
                    tooltipPropsContent={isFirstPage() ? undefined : (selectedPageIndex - 1).toString()}
                    onClick={onPreviousPageClick}
                    iconName={'FlickRight'} />
                <DefaultButton styles={paginatorNumberStyles}
                    text={selectedPageIndex.toString()}
                />
            </div>
            <div style={{ marginLeft: '20px', display: 'inline' }}>
                <DefaultButton style={selectedPageIndex !== getNumberOfPages() ? { pointerEvents: 'none' } : { display: "none" }}
                    styles={paginatorNumberStyles}
                    text={(selectedPageIndex + 1).toString()}
                />
                <PaginatorItem directionalHint={DirectionalHint.bottomCenter}
                    disabled={isLastPage()}
                    iconStyles={iconStyles}
                    tooltipPropsContent={isLastPage() ? undefined : (selectedPageIndex + 1).toString()}
                    onClick={onNextPageClick}
                    iconName={'FlickLeft'} />
                <PaginatorItem disabled={isLastPage()}
                    onClick={onGoToLastPageClick}
                    directionalHint={DirectionalHint.rightCenter}
                    iconStyles={iconStyles}
                    tooltipPropsContent={selectedPageIndex === getNumberOfPages() ? undefined : getNumberOfPages().toString()}
                    iconName={'Next'} />
            </div>
        </div>
    </div>
};