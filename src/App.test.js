import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import App, { calcularNovoSaldo } from "./App";

describe('Componente App', () => {
    describe('Quando eu abro o app do banco', () => {
        it('Mostra o nome do Banco', () => {
            render(<App />);

            expect(screen.getByText('ByteBank')).toBeInTheDocument();
        });

        it('Mostra o Saldo', () => {
            render(<App />);

            expect(screen.getByText('Saldo:')).toBeInTheDocument();
        })

        it('exibe o botão de realizar transação', () => {
            render(<App />);

            expect(screen.getByText('Realizar operação')).toBeInTheDocument();
        })
    })
    describe('Quando eu realizo uma transação', () => {
        it('a transação deve ser realizada no saque', () => {
            render(<App />);

            const saldo = screen.getByText('R$ 1000');
            const transacao = screen.getByLabelText('Saque');
            const valor = screen.getByTestId('valor');
            const botao = screen.getByText('Realizar operação');

            expect(saldo.textContent).toBe('R$ 1000');

            fireEvent.click(transacao, { target: { value: 'saque' }});
            fireEvent.change(valor, { target: { value: 10 }});
            fireEvent.click(botao);

            expect(saldo.textContent).toBe('R$ 990');
        })

        it('diminui o saldo ao fazer um saque', () => {
            const valores = {
                transacao: 'saque',
                valor: 50
            }
            const novoSaldo = calcularNovoSaldo(valores, 150)
            expect(novoSaldo).toBe(100)
        })
})