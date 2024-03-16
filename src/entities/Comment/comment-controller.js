
export const postComment = async (req, res) => {
    try {
        res.status(201).json(
            { 
                success: true,
                message: "Comment posted successfully" 
            }
        );
    } catch (error) {
        res.status(500).json(
            { 
                success: false,
                message: "Commment could not be posted" 
            }
        );
    }
}