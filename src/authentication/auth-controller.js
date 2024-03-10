

export const register = async (req, res) => {
    try {
        res.status(201).json(
            { 
                message: "User created successfully" 
            }
        );
    } catch (error) {
        res.status(500).json(
            { 
                message: "Internal server error" 
            }
        );
    }
}