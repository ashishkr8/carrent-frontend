export interface User{
    username: string;
    role: string;
    userId: string;
}

export interface AuthContextType{
    user: User|null;
    login: (userData:User)=>void;
    logout: ()=>void;
}

