import { Post } from "@/types/Post";
import axios from "axios";

export default class PostService{
    static async getAll(){
        const response = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts')    
        return response.data;   
    }
}