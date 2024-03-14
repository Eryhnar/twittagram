export const isSuperadmin = (req, res, next) => {
    if (req.tokenData.role !== "superadmin") {
        return res.status(401).json(
            {
                success: false,
                message: "Unauthorized"
            }
        );
    }
    next();
}