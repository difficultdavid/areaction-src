import React from 'react';

function SearchResult(props) {
	return (
		<tr>
			<td className="titleCell">{props.result.title}</td>
			<td className="bodyCell">{props.result.body}</td>
			<td className="userLoginCell">{props.result.user != null ? props.result.user.login : 'Not set'}</td>
			<td className="assigneeLoginCell">{props.result.assignee != null ? props.result.assignee.login : 'Not set'}</td>
		</tr>
	);
}

export default SearchResult;
