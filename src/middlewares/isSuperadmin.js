export const isSuperadmin = (req, res, next) => {
    if (req.tokenData.role !== "super_admin") {
        return res.status(401).json(
            {
                success: false,
                message: "Unauthorized"
            }
        );
    }
    next();
}