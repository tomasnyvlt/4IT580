export const createAppUser = (userId: number) => {
    const _id = userId;
    const user:AppUser = {
        getUserID: () => {
            return _id
        },
        isLoggedIn: () => {
            return true;
        }
    }
    return user;
}

export const createErrorThrowingUser = (error: Error) => {
    const user:AppUser = {
        getUserID: () => {
            throw error;
        },
        isLoggedIn: () => {
            throw error;
        }
    }
    return user;
}

export const createUnloggedUser = () => {
    const user:AppUser = {
        getUserID: () => {
            return null
        },
        isLoggedIn: () => {
            return false;
        }
    }
    return user;
}