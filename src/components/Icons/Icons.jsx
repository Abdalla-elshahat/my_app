import { FaShare, FaRegComment, FaRegHeart } from "react-icons/fa";
import "./Icons.css";
export default function Icons() {
  return (
    <div className="icons">
      <span>
        <FaShare />
      </span>
      <span>
        <FaRegComment />
      </span>
      <span>
        <FaRegHeart />
      </span>
    </div>
  );
}
