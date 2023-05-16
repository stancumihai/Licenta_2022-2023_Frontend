export interface IRecommendationRead {
    uid?: string;
    movieUid: string;
    userUid: string;
    createdAt: Date;
    likedDecisionDate: Date;
    isLiked: boolean;
};