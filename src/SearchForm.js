import React from 'react';

function SearchForm(props) {
	const milestoneOptions = props.milestones.map(milestone =>
			<option key={milestone.number} value={milestone.number}>{milestone.title}</option>
	);
	
	const assigneeOptions = props.assignees.map(assignee =>
			<option key={assignee.id} value={assignee.login}>{assignee.login}</option>
	);
	
	const labelOptions = props.labels.map(label =>
			<option key={label.id} value={label.name}>{label.name}</option>
	);
	
	return (
		<div className="searchForm">
			<div className="searchErrors">
				
			</div>
			<form onSubmit={props.onSearch}>
				<fieldset>
					<legend>Search</legend>
					<div>
						<div className="formRow clearfix">
							<label>Milestone</label>
							<select onChange={(e) => props.onMilestoneChange(e.target.value)}>
								<option key="*" value="*">Any</option>
								{milestoneOptions}
								<option key="none" value="none">Not assigned</option>
							</select>
						</div>
						<div className="formRow clearfix">
							<label>State</label>
							<select onChange={(e) => props.onStateChange(e.target.value)}>
								<option value="open" key="open">Open</option>
								<option value="closed" key="closed">Closed</option>
								<option value="all" key="all">All</option>
							</select>
						</div>
						<div className="formRow clearfix">
							<label>Assignee</label>
							<select onChange={(e) => props.onAssigneeChange(e.target.value)}>
								<option key="*" value="*">Any</option>
								{assigneeOptions}
								<option key="none" value="none">Not assigned</option>
							</select>
						</div>
						<div className="formRow clearfix">
							<label>Creator</label>
							<input type="text" onChange={(e) => props.onCreatorChange(e.target.value)} />
						</div>
						<div className="formRow clearfix">
							<label>Label(s)</label>
							<select onChange={(e) => props.onLabelsChange(getSelectedOptions(e.target))} multiple="multiple">
								{labelOptions}
							</select>
						</div>
						<div className="clearfix"></div>
						<div className="buttonRow clearfix">
							<button type="submit">Submit</button>
						</div>	
					</div>					
				</fieldset>
			</form>
		</div>
	);
}

// https://stackoverflow.com/questions/30372235/html-select-multiple-get-all-values-at-onchange-event
function getSelectedOptions(sel) {
  var opts = [],
    opt;
  var len = sel.options.length;
  for (var i = 0; i < len; i++) {
    opt = sel.options[i];

    if (opt.selected) {
      opts.push(opt.value);
    }
  }

  return opts;
}

export default SearchForm;
