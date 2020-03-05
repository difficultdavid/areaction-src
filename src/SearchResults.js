import React from 'react';
import SearchResult from './SearchResult';

function SearchResults(props) {
	var results = props.results.map(result =>
			<SearchResult key={result.id} result={result} />
	);
	
	if (props.results.length === 0) {
		results = <tr><td colSpan="4" className="noResultsCell">No Results</td></tr>
	}
	
	return (
		<div className="searchResults">
			<table>
				<thead>
					<tr><th>Title</th><th>Body</th><th>User Login</th><th>Assignee Login</th></tr>
				</thead>
				<tbody>
					{results}
				</tbody>
			</table>
		</div>
	);
}

export default SearchResults;
