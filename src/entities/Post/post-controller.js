
export const getPosts = async (req, res) => {
    try {
        res.status(200).json(
            { 
                success: true,
                message: "Get all posts"
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