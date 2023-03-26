import { IContextualMenuItemStyles } from '@fluentui/react';
import { IButtonStyles, IIconProps, mergeStyles } from 'office-ui-fabric-react';

export const containerClassName: string = mergeStyles({
    maxWidth: '20%',
    position: 'relative',
    right: '-75%',
    maxHeight: '10vh',
    height: '10vh',
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
        color: '#5149DB',
        fontSize: '20px',
        selectors: {
            ":hover": {
                color: 'rgb(0, 120, 212)'
            }
        }
    }
};

export const userIcon: IIconProps = {
    iconName: 'AccountManagement'
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
    },
};

export const commandButtonStyles: Partial<IButtonStyles> = {
    root: {
        backgroundColor: 'transparent',
        marginTop: '4px',
    },
    rootHovered: {
        backgroundColor: 'transparent',
    },
    icon: {
        color: '#5149DB',
        fontSize: '20px',
    },
    flexContainer: {
        selectors: {
            '[data-icon-name="ChevronDown"]': {
                color: '#5149DB'
            }
        }
    },
};

export const notificationDotClassName: string = mergeStyles({
    display: 'inline-block',
    position: 'relative',
    backgroundColor: 'red',
    width: '4px',
    height: '4px',
    borderRadius: '25px',
    top: '-1.3vh',
    left: '-0.55vw'
});