import {
    IButtonStyles,
    IDetailsListStyles,
    IIconProps
} from 'office-ui-fabric-react';
import {
    COLOR1_D_40,
    COLOR2,
    COLOR2_D_20,
    COLOR2_D_40,
    FONT_FAMILY
} from '../../Library/constants';
import { mergeStyles } from '@fluentui/react';

export const containerClassName: string = mergeStyles({
    width: '80%',
    height: '87.5%',
    margin: 'auto',
    overflowY: 'hidden'
});

export const iconStyle: Partial<IButtonStyles> = {
    root: {
        color: COLOR2,
        fontSize: '30px',
        fontStyle: 'normal',
        fontWeight: 'normal',
        speak: 'none',
        backgroundColor: 'transparent'
    },
    rootPressed: {
        color: COLOR2_D_20,
        backgroundColor: 'transparent'
    },
    rootHovered: {
        color: COLOR2_D_40,
        backgroundColor: 'transparent'
    },
    icon: {
        fontSize: '30px'
    }
};

export const eyeIconProps: IIconProps = { iconName: 'RedEye' };

export const manageUsersListStyles: Partial<IDetailsListStyles> = {
    root: {
        backgroundColor: 'transparent',
        borderRadius: "20px",
        width: '100%',
        height: "100vh",
        fontFamily: FONT_FAMILY,
        color: '#393939',
        margin: 'auto',
        marginTop: '5%',
        position: 'relative',
        overflowX: 'hidden',
        overflowY: 'hidden',
        '& [role=grid]': {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
        },
    },
    headerWrapper: {
        backgroundColor: 'transparent',
        flex: '0 0 auto',
        selectors: {
            '.ms-DetailsHeader-cell': {
                borderBottom: `2px solid ${COLOR1_D_40}`,
                fontFamily: FONT_FAMILY,
                fontSize: '20px'
            },
            '.ms-DetailsHeader-cellName': {
                fontSize: '24px',
                color: COLOR2,
            }
        },
    },
    contentWrapper: {
        flex: '1 1 auto',
        overflowY: 'auto',
        height: '100%',
        backgroundColor: 'transparent',
        selectors: {
            '.ms-DetailsRow-cell': {
                fontFamily: FONT_FAMILY,
                color: 'white',
                selectors: {
                    ":hover": {
                        background: "transparent",
                        color: COLOR2,
                    },
                }
            },
            '.ms-GroupHeader': {
                fontFamily: FONT_FAMILY,
                fontSize: '30px',
            },
            '.ms-GroupHeader-title': {
                fontSize: '20px',
            }
        }
    },
    focusZone: {
        '.ms-DetailsRow': {
            fontSize: '24px',
            color: '#393939',
            backgroundColor: 'transparent',
            borderBottom: '1px solid #393939',
            selectors: {
                ":hover": {
                    background: "transparent",
                    color: 'white',
                },
            }
        },
        '.ms-DetailsRow-cell': {
            color: '#393939',
            fontSize: '24px',
        },
        '.ms-Check.is-checked::before': {
            background: COLOR2
        }
    },
};

export const buttonContainerClassName: string = mergeStyles({
    display: 'flex'
});

export const titleClassName: string = mergeStyles({
    fontFamily: FONT_FAMILY,
    textAlign: 'center',
    fontStyle: 'normal',
    height: '56px',
    fontWeight: '700',
    fontSize: '54px',
    lineHeight: '75px',
    color: 'white'
});