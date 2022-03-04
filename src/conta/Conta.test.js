import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import Conta from "./Conta";

describe('Componente de conta', () => { 
    it('Exibir o saldo da conta como valor monetário', () => {
        render(<Conta saldo={1000} />);

        const saldo = screen.getByTestId('saldo-conta');

        expect(saldo.textContent).toBe('R$ 1000');
    })
    it('Chama a função de realizar transação, quando o botão é clicado', () => {
        const realizarTransacao = jest.fn();
        render(<Conta saldo={1000} realizarTransacao={realizarTransacao} />);

        const botao = screen.getByText('Realizar operação');

        const valor = screen.getByTestId('valor');
        const transacao = screen.getByLabelText('Saque');
        
        fireEvent.click(transacao, { target: { value: 'saque' }});
        fireEvent.change(valor, { target: { value: 10 }});
        
        if(valor.textContent !== 0 && transacao.target !== '')
            fireEvent.click(botao)

        expect(realizarTransacao).toHaveBeenCalled();
    })
    it('A função realizar transação não é chamada pois o botão não foi habilitado', () => {
        const realizarTransacao = jest.fn();
        render(<Conta saldo={1000} realizarTransacao={realizarTransacao} />);

        const botao = screen.getByText('Realizar operação');

        fireEvent.click(botao);
        expect(realizarTransacao).not.toHaveBeenCalled();
    })
})