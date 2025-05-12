import AddPost from "./addposts/Addposts";
import Posts from "./Posts";

const PostsWithactions = () => {
    return (
        <div className="flex flex-col items-center w-full px-4">
            <div className="flex flex-col w-full mt-10 max-w-[1150px] gap-12">
                <AddPost />
                <Posts />
            </div>
        </div>
    )
}
export default PostsWithactions;