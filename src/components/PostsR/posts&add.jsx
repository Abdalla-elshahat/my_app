import { useEffect, useState } from "react";
import { getAllPosts } from "../../apicalls/posts";
import AddPost from "./addposts/Addposts";
import Posts from "./Posts";

const PostsWithactions = () => {
    const [sharedPosts, setSharedPosts] = useState([]);
    useEffect(() => {
        getAllPosts(setSharedPosts);
    }, [sharedPosts,setSharedPosts])
    return (
        <div className="flex flex-col items-center w-full px-4">
            <div className="flex flex-col w-full mt-3 max-w-[1150px] gap-12">
                <AddPost />
                <Posts sharedPosts={sharedPosts} />
            </div>
        </div>
    )
}
export default PostsWithactions;