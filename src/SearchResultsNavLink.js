import React from 'react';

function SearchResultsNavLink(props) {
	if (typeof props.href !== "undefined") {
		return (
			<button onClick={() => props.onNav(props.href)}>{props.symbol}</button>	
		);
	} else {
		return (
			<button disabled="disabled">{props.symbol}</button>	
		);
	}
}

export default SearchResultsNavLink;
