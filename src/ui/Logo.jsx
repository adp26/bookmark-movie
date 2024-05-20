import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/movies">

      <div className="flex items-center gap-3">
        <img src="/iconsBM.png" width={20} height={20} />
        <h1>Movie Bookmark</h1>
      </div>
    </Link>
  );
}

export default Logo;
