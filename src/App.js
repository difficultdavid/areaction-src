import React from 'react';
import './App.css';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
import SearchResultsNav from './SearchResultsNav';
import moment from 'moment';

class App extends React.Component {
	
  constructor(props) {
	  super(props);
	  this.state = {
			  searchResultData: [],
			  milestones: [],
			  assignees: [],
			  labels: [],
			  searchMilestone: "*",
			  searchState: "open",
			  searchAssignee: "*",
			  searchCreator: "",
			  searchLabels: [],
			  lastResponse: null,
			  searchErrors: {}
	  }
  }
  
  componentDidMount() {
	  this.fetchMilestones();
	  this.fetchAssignees();
	  this.fetchLabels();
  }
  
  onSearch = (e) => {
	  e.preventDefault();
	  this.setState({
		  searchResultData: []
	  })
	  const sevenDaysAgo = moment().subtract(7, 'days').format();
	  var url = 'https://api.github.com/repos/angular/angular/issues?since=' + sevenDaysAgo + 
			  '&milestone=' + this.state.searchMilestone +
			  '&state=' + this.state.searchState;
	  
	  url += '&assignee=' + (this.state.searchAssignee ? this.state.searchAssignee : '*');
	  
	  if (this.state.searchCreator) {
		  url += '&creator=' + this.state.searchCreator;
	  }
	  
	  if (this.state.searchLabels.length > 0) {
		  url += '&labels=' + this.state.searchLabels.join(',');
	  }
	  
	  this.doFetch(url);
  }
  
  doFetch = (href) => {
	  fetch(href)
	  	.then(response => {
	  		this.setState({
	  			lastResponse: response
	  		})
	  		return response.json();
	  	})
	  	.then(json => {
	  		if (this.state.lastResponse.ok) {
		  		this.setState({
		  			searchResultData: json
		  		})
	  		} else {
	  			this.setState({
	  				searchErrors: json
	  			})
	  		}
	  	})
  }
  
  onStateChange = (newState) => {
	  this.setState({
		  searchState: newState 
	  });
  }
  
  onMilestoneChange = (newMilestone) => {
	  this.setState({
		  searchMilestone: newMilestone
	  });
  }
  
  onAssigneeChange = (newAssignee) => {
	  this.setState({
		  searchAssignee: newAssignee
	  })
  }
  
  onCreatorChange = (newCreator) => {
	  this.setState({
		  searchCreator: newCreator
	  })
  }
  
  onLabelsChange = (newLabels) => {
	  this.setState({
		  searchLabels: newLabels
	  })
  }
  
  fetchMilestones = () => {
	  fetch('https://api.github.com/repos/angular/angular/milestones')
	  	.then(res => res.json())
	  	.then(json => {
	  		this.setState({
	  			milestones: json
	  		});
	  	})
  }
  
  fetchAssignees = () => {
	  fetch('https://api.github.com/repos/angular/angular/assignees?per_page=100')
	  	.then(res => res.json())
	  	.then(json => {
	  		this.setState({
	  			assignees: json
	  		});
	  	})
  }
  
  fetchLabels = () => {
	  fetch('https://api.github.com/repos/angular/angular/labels?per_page=100')
	  	.then(res => res.json())
	  	.then(json => {
	  		this.setState({
	  			labels: json
	  		});
	  	})
  }

  render() {
	  return (
	    <div className="App">
	      <header className="App-header">
	        Angular Github Repository - Issue Search
	      </header>
	      <SearchForm
	      		searchErrors={this.state.searchErrors}
	      		onSearch={this.onSearch}
	      		lastResponse={this.state.lastResponse}
	      		onStateChange={this.onStateChange} 
	      		milestones={this.state.milestones} 
	      		onMilestoneChange={this.onMilestoneChange}
	      		assignees={this.state.assignees}
	      		onAssigneeChange={this.onAssigneeChange}
	      		onCreatorChange={this.onCreatorChange}
	      		labels={this.state.labels}
	      		onLabelsChange={this.onLabelsChange}
	      />
	      <SearchResultsNav
	      		lastResponse={this.state.lastResponse} onNav={this.doFetch}
	      />
	      <SearchResults 
	      		results={this.state.searchResultData} 
	      />
	    </div>
	  );
  }
}

export default App;
