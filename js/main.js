/* global document, ReactDOM, React, fetch */

function random(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

class SearchContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchQuery: '',
			searchResults: []
		};
		this.handleSearchQuery = this.handleSearchQuery.bind(this);
		this.executeSearch = this.executeSearch.bind(this);
	}

	async executeSearch(searchQuery) {
		const url = `data/sample-data.json?q=${searchQuery}`;
		const response = await fetch(url);
		const data = await response.json();

		this.setState({
			searchResults: data.slice(0, random(1, 8))
		});
	}

	handleSearchQuery(searchQuery) {
		this.setState({
			searchQuery,
			searchResults: []
		});

		if (searchQuery) {
			this.executeSearch(searchQuery);
		}
	}

	render() {
		return (
			<div className="search-container">
				<SearchBar
					handleSearchQuery={this.handleSearchQuery}
				/>
				<SearchResults
					searchQuery={this.state.searchQuery}
					searchResults={this.state.searchResults}
					addTrackToQueue={this.props.addTrackToQueue}
				/>
			</div>
		);
	}
}

class SearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.onInputChange = this.onInputChange.bind(this);
	}

	onFormSubmit(event) {
		event.preventDefault();
	}

	onInputChange(e) {
		const searchQuery = e.target.value;
		this.props.handleSearchQuery(searchQuery);
	}

	render() {
		return (
			<div className="search-header">
				<form onSubmit={this.onFormSubmit}>
					<input
						type="text"
						name="search"
						placeholder="Search..."
						onChange={this.onInputChange}
					/>

					<input type="submit" />
				</form>
			</div>
		);
	}
}

class SearchResults extends React.Component {
	render() {
		const results = this.props.searchResults;
		const searchQuery = this.props.searchQuery;
		const searchResultMessage = searchQuery ? 'You searched for: ' + searchQuery : 'Ready to search';

		return (
			<div className="search-results">
				<p>{searchResultMessage}</p>

				{searchQuery.length > 0 &&
					<p>
						<strong>{results.length}</strong> results found:
					</p>
				}

				{results.length > 0 &&
					<ul>
						{results.map(track => (
							<li key={track.id} className="search-results__track-item">
								<img src={track.image + '?random=' + random(1,100)} />

								<p>
									{track.title} - {track.artist}
								</p>

								<button onClick={() => this.props.addTrackToQueue(track)}>
									Add to queue
								</button>
							</li>
						))}
					</ul>
				}

			</div>
		);
	}
}

class Playlists extends React.Component {
	render() {
		return (
			<div className="playlists">
				<p>Playlists</p>
			</div>
		);
	}
}

class Queue extends React.Component {
	render() {
		return (
			<div className="queue">
				<p>Queue</p>
			</div>
		);
	}
}

class Player extends React.Component {
	render() {
		return (
			<div className="player">
				<p>Player</p>
			</div>
		);
	}
}

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			queue: []
		};

		this.addTrackToQueue = this.addTrackToQueue.bind(this);
	}

	addTrackToQueue(track) {
		console.log('Queue [add]', track);

		const updatedQueue = [...this.state.queue, track];

		this.setState({
			queue: updatedQueue
		});
	}

	render() {
		return (
			<div className="app">
				<div className="search-and-playlists">
					<SearchContainer
						addTrackToQueue={this.addTrackToQueue}
					/>
					<Playlists />
				</div>

				<section>
					<Player />
					<Queue />
				</section>
			</div>
		);
	}
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
