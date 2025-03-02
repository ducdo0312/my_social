export const isLikedByReqUser = (reqUserId, post) => {
    if (!post || !Array.isArray(post.liked)) { // ✅ Kiểm tra trước khi truy cập liked
        return false;
    }
    
    for (let user of post.liked) {
        if (reqUserId === user.id) {
            return true;
        }
    }
    return false;
};
