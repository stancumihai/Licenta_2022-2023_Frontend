import { IDetailsListStyles, IIconProps } from 'office-ui-fabric-react';
import { COLOR2, COLOR2_D_20, COLOR2_D_40, FONT_FAMILY } from '../../Library/constants';
import { mergeStyles } from '@fluentui/react';

export const containerClassName: string = mergeStyles({
    width: '80%',
    height: '87.5%',
    margin: 'auto',
    overflowY: 'hidden'
});

export const iconStyle = {
    root: {
        color: COLOR2,
        fontSize: '30px',
        fontStyle: 'normal',
        fontWeight: 'normal',
        speak: 'none',
    },
    rootPressed: {
        color: COLOR2_D_20,
        backgroundColor: '#FFFFFF'
    },
    rootHovered: {
        color: COLOR2_D_40,
        backgroundColor: '#FFFFFF'
    },
};

export const eyeIconProps: IIconProps = { iconName: 'RedEye' };

export const manageUsersListStyles: Partial<IDetailsListStyles> = {
    root: {
        fontFamily: FONT_FAMILY,
        marginTop: '7vh',
        backgroundColor: '',
        overflow: 'hidden',
        selectors: {
            '.ms-Viewport': {
                maxWidth: '60vw'
            },
            '.ms-DetailsRow-cell': {
                textOverflow: 'ellipsis'
            }
        }
    },
    focusZone: {
        selectors: {
            '.ms-DetailsRow': {
                backgroundColor: '',
                fontStyle: 'normal',
                fontSize: '24px',
                fontWeight: '300',
                maxHeight: '100px',
                textOverflow: 'ellipsis',
                ':hover': {
                    backgroundColor: '#FFFFFF'
                }
            },
            '.ms-GroupHeader-title': {
                fontStyle: 'normal',
                fontSize: '24px',
                fontWeight: '300'
            }
        }
    },
    headerWrapper: {
        fontFamily: FONT_FAMILY,
        selectors: {
            '.ms-DetailsHeader': {
                fontFamily: FONT_FAMILY
            },
            '.ms-DetailsHeader-cellName': {
                fontStyle: 'normal',
                fontSize: '24px',
                fontWeight: '800'
            }
        }
    },
    contentWrapper: {
        fontFamily: FONT_FAMILY
    }
};

export const buttonContainerClassName: string = mergeStyles({
    display: 'flex'
});

export const titleClassName: string = mergeStyles({
    textAlign: 'center',
    fontStyle: 'normal',
    marginTop: '7vh',
    height: '56px',
    fontWeight: '700',
    fontSize: '54px',
    lineHeight: '75px',
    color: 'white'
});