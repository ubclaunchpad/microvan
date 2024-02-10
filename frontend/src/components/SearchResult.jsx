import "./SearchResult.css";

export const SearchResult = ({ result }) => {
    return (
        <div
            classNmae="search-result"
            onClick={(e) => alert('${result}')}
        >
            {result}
        </div>
    )
}