export const createReview = (fetchedData) => {
  const comment = fetchedData;
  return {
    id: comment.id,
    authorName: comment.user.name,
    authorAvatar: comment.user.avatar_url,
    rating: comment.rating,
    opinion: comment.comment,
    publishDate: comment.date,
    publishSec: new Date(comment.date).getTime()
  };
};
