class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fruits: []
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.addNewFruit = this.addNewFruit.bind(this)
  }

  componentDidMount(){
    fetch('/api/v1/fruits.json')
      .then((response) => {return response.json()})
      .then((data) => {this.setState({ fruits: data }) });
  }

  handleFormSubmit(name, description){
    console.log(name + description)
    let body = JSON.stringify({fruit: {name: name, description:   description} })
    fetch('/api/v1/fruits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: body,
      }).then((response) => {return response.json()})
      .then((fruit)=>{
        this.addNewFruit(fruit)
      }
    )
  }

  addNewFruit(fruit){
    this.setState({
      fruits: this.state.fruits.concat(fruit)
    })
  }

  render(){
    return(
      <div>
        <NewFruit  handleFormSubmit={this.handleFormSubmit} />
        <AllFruits fruits={this.state.fruits} />
      </div>
    )
  }
}

