import { Component } from "react";
import './styles.css';

export class Button extends Component {
    render() {
        const {text, acao, disabled} = this.props;
      return (
        <button 
        className='button'
        onClick={acao}
        disabled={disabled}
        >
            {text}
        </button>
      ); 
    }
}