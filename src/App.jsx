import React, {Component} from "react";
import Button from '@mui/material/Button';
import {evaluate} from 'mathjs'


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            history: ["46 * 2 = 92", "45 + 1 = 46"],
            firstOperand: "",
            secondOperand: "",
            operator: ""
        };
    }

    render() {
        const {
            studentsState
        } = this.props;

        const expression = this.state.firstOperand + this.state.operator + this.state.secondOperand;
        const history = this.state.history.map((historyObj, index) =>
            <li
                style={index === this.state.history.length-1 ? {fontWeight: "bold", fontSize: "x-large"} : {}}
                key={index}>{historyObj}
            </li>
        );
        history.reverse()

        const addToHistory = (str) => {
            this.setState({history: [...this.state.history, str]})
        }

        const bNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const bOperators = ["+", "-", "/", '*']

        const pressNumber = (number) => {
            number = number.toString()
            if (this.state.operator === '') {
                this.setState({firstOperand: this.state.firstOperand + number})
            } else {
                this.setState({secondOperand: this.state.secondOperand + number})
            }
        }

        const setOperator = (operator) => {
            if (this.state.secondOperand !== '') {
                calc()
                this.setState({operator: ' ' + operator + ' '})
                return
            }

            if (this.state.firstOperand !== '') {
                this.setState({operator: ' ' + operator + ' '})
            }
        }

        const calc = () => {

            if ((this.state.firstOperand === '0' || this.state.secondOperand === '0')
            && this.state.operator === ' / '){
                let result_value = "Error division by zero"
                addToHistory(expression + " = " + result_value)
                this.setState({firstOperand: "",secondOperand: "", operator: ""})
                return
            }

            if (this.state.firstOperand && this.state.operator && this.state.secondOperand) {
                let result_value = evaluate(expression)
                this.setState({firstOperand: result_value})
                this.setState({secondOperand: "", operator: ""})
                addToHistory(expression + " = " + result_value)
            }
        }



        const getAndSolve = () => {
            const url = "http://localhost:8080/math/examples?count=5";
            let rawExamples;
            fetch(url)
                .then(
                    response => response.json() // .json(), .blob(), etc.
                ).then(
                text => console.log(text[0])// Handle here
            );

        }

        return (
            <div>
                <div>{bNumbers.map(number =>
                    <Button key={number} onClick={(e) => pressNumber(number)}
                            variant="contained" color="primary" size={'large'}>{number}</Button>)}
                </div>
                <div>
                    {bOperators.map(operator =>
                        <Button key={operator} onClick={(e) => setOperator(operator)} variant="contained"
                                color="success">
                            {operator}
                        </Button>)}
                    <Button style={{width: '100px'}} onClick={calc} variant="contained" color="success">
                        =
                    </Button>
                    <Button style={{width: '100px'}} onClick={getAndSolve} variant="contained" color="success">
                        Получить и решить примеры
                    </Button>
                </div>

                <h1>{expression}</h1>

                <div>
                    <ul>
                        {history}
                    </ul>
                </div>

            </div>
        );
    }
}

export default App;