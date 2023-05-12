import { IContextualMenuItemStyles } from '@fluentui/react';
import { IButtonStyles, IIconProps, mergeStyles } from 'office-ui-fabric-react';
import { COLOR1, COLOR2, COLOR2_D_20, COLOR2_D_40, FONT_FAMILY } from '../../Library/constants';

export const containerClassName: string = mergeStyles({
    width: 'fit-content',
    position: 'relative',
    right: '-75%',
    maxHeight: '10vh',
    height: '3vh',
    top: '-3.5vh'
});

export const iconButtonStyles: Partial<IButtonStyles> = {
    root: {
        backgroundColor: 'transparent',
        marginTop: '4px',
    },
    rootHovered: {
        backgroundColor: 'transparent',
    },
    rootPressed: {
        backgroundColor: 'transparent',
    },

    icon: {
        color: COLOR1,
        fontSize: '20px',
        selectors: {
            ":hover": {
                color: COLOR2
            }
        }
    }
};

export const notificationIcon: IIconProps = {
    iconName: 'Ringer',
};

export const profileSettingsButtonStyles: Partial<IButtonStyles> = {
    root: {
        display: 'none',
        border: 'none'
    },
    rootPressed: {
        display: 'none',
        border: 'none'
    },
    rootHovered: {
        display: 'none',
        border: 'none'
    }
};

export const contextualMenuStyles: Partial<IContextualMenuItemStyles> = {
    linkContent: {
        display: "none",
    }
};

export const commandButtonStyles: Partial<IButtonStyles> = {
    root: {
        backgroundColor: 'transparent',
        marginTop: '4px'
    },

    icon: {
        color: COLOR1,
        fontSize: '20px'
    },
    flexContainer: {
        selectors: {
            '[data-icon-name="ChevronDown"]': {
                color: COLOR1
            }
        }
    },
    iconHovered: {
        color: COLOR2,
    }
};

export const notificationDotClassName: string = mergeStyles({
    display: 'inline-block',
    position: 'relative',
    backgroundColor: 'red',
    width: '4.5px',
    height: '4.5px',
    borderRadius: '25px',
    top: '-1.5vh',
    left: '-0.6vw'
});

export const contextualIconButtonStyles: Partial<IButtonStyles> = {
    root: {
        color: COLOR2,
        fontWeight: '600',
        selectors: {
            ':hover': {
                color: COLOR2_D_20
            }
        }
    },
    rootHovered: {
        color: COLOR2_D_20
    },
    rootPressed: {
        color: COLOR2_D_40
    },
    icon: {
        selectors: {
            ':hover': {
                color: COLOR2_D_20
            }
        }
    }
};