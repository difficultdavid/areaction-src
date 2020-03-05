import React from 'react';
import SearchResultsNavLink from './SearchResultsNavLink';

function SearchResultsNav(props) {
	if (props.lastResponse == null || props.lastResponse.headers.get("Link") == null) {
		return "";
	}
	
	const linkHeader = props.lastResponse.headers.get("Link");
	const splitLinkHeader = linkHeader.split(",");
	
	const linkArray = splitLinkHeader.map(link => {
		const linkComponents = link.split(";");
		var href = linkComponents[0].trim();
		href = href.substring(1, href.length - 1);
		var rel = linkComponents[1].trim();
		rel = rel.substring(5, rel.length - 1)
		return { rel: rel, href: href };
	});
	
	const linkMap = {};
	
	linkArray.map(relAndHref => {
		linkMap[relAndHref['rel']] = relAndHref['href'];
	})
	
	const relsToSymbols = { first: '<<', prev: '<', next: '>', last: '>>' };
	const links = ['first', 'prev', 'next', 'last'].map(rel => 
		<SearchResultsNavLink key={rel} href={linkMap[rel]} onNav={props.onNav} symbol={relsToSymbols[rel]} />
	);
	
	return (
			<div className="searchResultsNav">
				{links}
			</div>
	);
}

export default SearchResultsNav;
