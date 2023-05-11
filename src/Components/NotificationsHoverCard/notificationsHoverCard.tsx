import {
    DirectionalHint,
    HoverCard,
    IExpandingCardProps,
} from '@fluentui/react';
import { useConst } from '@fluentui/react-hooks';
import { compactCardClassNames } from './notificationsHoverCard.styles';

export const NotificationsHoverCard = (): JSX.Element => {

    const onRenderCompactCard = (): JSX.Element => {
        return (
            <div className={compactCardClassNames.compactCard}>
            </div>
        );
    };

    const expandingCardProps: IExpandingCardProps = useConst({
        onRenderCompactCard,
        directionalHint: DirectionalHint.rightTopEdge,
        directionalHintFixed: false,
        gapSpace: 16,
        calloutProps: {
            isBeakVisible: true,
        },
    });

    return <HoverCard
        instantOpenOnClick={true}
        expandingCardProps={expandingCardProps} >
        <div className={compactCardClassNames.item}>You have notifications!</div>
    </HoverCard>
};