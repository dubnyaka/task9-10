import React, {Component} from "react";
import Button from '@mui/material/Button';
import {evaluate} from 'mathjs'
import {connect} from "react-redux";
import {waitFor} from "@babel/core/lib/gensync-utils/async";


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
            mathExamples,
        } = this.props;


        let expression = this.state.firstOperand + this.state.operator + this.state.secondOperand;

        const history = this.state.history.map((historyObj, index) =>
            <li
                style={index === this.state.history.length - 1 ? {fontWeight: "bold", fontSize: "x-large"} : {}}
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

            if (this.state.firstOperand && this.state.operator && this.state.secondOperand) {
                let result_value = evaluate(expression)
                if (result_value === Infinity || isNaN(result_value)) {
                    result_value = "Error division by zero"
                    addToHistory(expression + " = " + result_value)
                    this.setState({firstOperand: "", secondOperand: "", operator: ""})
                    return
                } else {
                    this.setState({firstOperand: result_value})
                    this.setState({secondOperand: "", operator: ""})
                    if(result_value === 0) this.setState({firstOperand : ''});
                    addToHistory(expression + " = " + result_value)
                }
            }
        }


        const getAndSolve = () => {
            const url = "http://localhost:8080/math/examples?count=5";
            fetch(url)
                .then(
                    response => response.json() // .json(), .blob(), etc.
                ).then(
                mathExamples => {
                    this.props.dispatch({
                        type: 'RECEIVE_MATH_EXAMPLES',
                        mathExamples: mathExamples,
                    })
                }// Handle here
            );
            let resultArr = []
            this.props.mathExamplesState.list.forEach((mathExample) => {

                let result = evaluate(mathExample)
                if (result === Infinity || isNaN(result)) {
                    result = "Error division by zero"
                }
                resultArr.push(mathExample + " = " + result)
            })
            this.setState({history:  [...this.state.history , ...resultArr]})
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

const mapReduxStateToProps = reduxState => ({
    mathExamplesState: reduxState.mathExamples,
});

const mapDispatchToProps = dispatch => ({
    dispatch,
});

export default connect(mapReduxStateToProps, mapDispatchToProps)(App);
// export default App;