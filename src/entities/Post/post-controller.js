import Post from "./post-model.js";

export const getPosts = async (req, res) => {
    try {
        //const limit = parseInt(req.query.limit) || 10;
        const page = req.query.page || 1;
        const limit = 10;
        if (isNaN(page) || page <= 0) {
            return res.status(400).json(
                { 
                    success: false,
                    message: "Invalid page number"
                }
            );
        }

        const skip = (page - 1) * limit;

        const posts = await Post.find().skip(skip).limit(limit);

        res.status(200).json(
            { 
                success: true,
                message: "Get all posts",
                data: posts,
                page
            }
        );
    } catch (error) {
        res.status(500).json(
            { 
                success: false,
                message: "Internal server error",
                error: error.message
            }
        );
    }
}