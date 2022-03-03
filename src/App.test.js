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

        it('diminui o saldo ao fazer um saque', () => {
            const valores = {
                transacao: 'saque',
                valor: 50
            }
            const novoSaldo = calcularNovoSaldo(valores, 150)
            expect(novoSaldo).toBe(100)
        })
})