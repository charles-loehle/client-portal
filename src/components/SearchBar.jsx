const SearchBar = ({
	files,
	loading,
	filterText,
	setFilterText,
	onFilterTextChange,
}) => {
	// myprops passed down from App.js
	return (
		<input
			className="SearchBar form-control form-control-dark w-100 rounded-0 border-0"
			type="text"
			value={filterText}
			placeholder="Search https://react.dev/learn/thinking-in-react#step-1-break-the-ui-into-a-component-hierarchy"
			aria-label="Search"
			onChange={e => onFilterTextChange(e.target.value)}
		/>
	);
};

export default SearchBar;
