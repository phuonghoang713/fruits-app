class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fruits: []
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.addNewFruit = this.addNewFruit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this);
    this.updateFruit = this.updateFruit.bind(this)
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

  handleDelete(id){
    fetch(`/api/v1/fruits/${id}`, 
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
        this.deleteFruit(id)
      })
  }
  handleUpdate(fruit){
    fetch(`/api/v1/fruits/${fruit.id}`, 
    {
      method: 'PUT',
      body: JSON.stringify({fruit: fruit}),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => { 
        this.updateFruit(fruit)
      })
  }

  updateFruit(fruit){
    let newFruits = this.state.fruits.filter((f) => f.id !== fruit.id)
    newFruits.push(fruit)
    this.setState({
      fruits: newFruits
    })
  }

  addNewFruit(fruit){
    this.setState({
      fruits: this.state.fruits.concat(fruit)
    })
  }

  deleteFruit(id){
    newFruits = this.state.fruits.filter((fruit) => fruit.id !== id)
    this.setState({
      fruits: newFruits
    })
  }

  render(){
    return(
      <div>
        <NewFruit  handleFormSubmit={this.handleFormSubmit} />
        <AllFruits fruits={this.state.fruits} handleDelete={this.handleDelete} handleUpdate = {this.handleUpdate} />
      </div>
    )
  }
}

