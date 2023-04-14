const SearchBar = ({ myprops }) => {
	// myprops passed down from App.js
	return (
		<input
			className="SearchBar form-control form-control-dark w-100 rounded-0 border-0"
			type="text"
			placeholder="Search https://react.dev/learn/thinking-in-react#step-1-break-the-ui-into-a-component-hierarchy"
			aria-label="Search"
		/>
	);
};

export default SearchBar;
