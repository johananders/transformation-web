import React from 'react';
import ReactDOM from 'react-dom';
import API_ROOT from './environment';
import { Alert, Button, FormGroup, FormControl, ControlLabel, ListGroup, ListGroupItem, Grid, Row, Navbar, HelpBlock, Table } from 'react-bootstrap';


class MyForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            history: [],
            error: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDismiss = this.handleDismiss.bind(this);
    }


    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    addToHistory(result) {
        this.setState({ history: [result, ...this.state.history] });
    }

    getValidationState() {
        const length = this.state.value.length;
        if (length == 0 || length > 1000) {
            return 'warning';
        } else {
            return null;
        }
    }

    handleDismiss() {
        this.setState({ error: '' })
    }

    handleSubmit(event) {
        const length = this.state.value.length;
        if (length > 1000) {
            this.setState({ error: 'Max 1000 characters' });
            return;
        } else if (length == 0) {
            this.setState({ error: 'Min 1 character' });
            return;
        }

        fetch(API_ROOT, {
            method: 'POST',
            body: JSON.stringify({
                text: this.state.value
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            return response.json()
        }).then((json) => {
            console.log('Response: ' + json);
            this.addToHistory(json.result);
        });

        console.log('Input: ' + this.state.value);
        console.log('History: ' + this.state.history);
        event.preventDefault();
    }

    render() {
        if (this.state.error) {
            return (
                <Grid>
                    <Alert bsStyle="danger" onDismiss={this.handleDismiss}>
                        <p>
                            {this.state.error}
                        </p>
                    </Alert>
                </Grid>
            );
        }

        return (

            <Grid>
                <Row>
                    <Navbar>
                        <Navbar.Header>
                            <Navbar.Brand>
                                <a href="#home">Wordsmith</a>
                            </Navbar.Brand>
                        </Navbar.Header>
                    </Navbar>
                </Row>
                <Row>
                    <form onSubmit={this.handleSubmit}>
                        <FormGroup
                            controlId="formControlsTextarea"
                            validationState={this.getValidationState()}
                        >
                            <ControlLabel>Input text</ControlLabel>
                            <FormControl
                                componentClass="textarea"
                                placeholder="text"
                                type="textarea"
                                value={this.state.value}
                                onChange={this.handleChange}
                            />
                            <FormControl.Feedback />
                        </FormGroup>
                        <Button type="submit">Submit</Button>
                    </form>
                </Row>
                <br />
                <Row>
                    <Table striped bordered condensed hover>
                        <thead>
                            <tr>
                                <th>History</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.history.map((t, i) =>
                                <tr>
                                    <td>{t}</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Row>
            </Grid>
        );
    }
}

ReactDOM.render(<MyForm />, document.getElementById('root'));
