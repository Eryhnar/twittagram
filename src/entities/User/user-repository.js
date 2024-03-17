export const findUsers = async (searchFilters) => {
    return await User.find(
        searchFilters,
        "-password"
    )
}