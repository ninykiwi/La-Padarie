"use client";

import React, { useEffect,useState } from 'react';
import Image from "next/image";
import axios from 'axios';
import "../styles/queue.css";
import "../styles/modal.css";
import Modal from './modal';

interface Fila {
  id: number;
  nome: string;
  paes: number;
  valor: number;
}


export default function Queue() { 
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [fila, setFila] = useState<Fila[]>([]);

    const handleAddPessoaClick = () => {
        setIsModalVisible(true);
    };

    const closeModal = () => {
      setIsModalVisible(false);
      fetchFila();
    }

    const fetchFila = async () => {
      try {
        const response = await axios.get('http://localhost:3001/fila');
          setFila(response.data);
      } catch (error) {
        console.error('Erro ao buscar fila: ', error);
      }
    };

    useEffect(() => {
      fetchFila();
    }, []);

    const handleRemoveCliente = async (id: number) => {
      try {
        await axios.delete(`http://localhost:3001/delete/${id}`);
        setFila(fila.filter(pessoa => pessoa.id !== id));
      } catch (error) {
        console.error('Erro ao remover cliente: ', error);
      }
    };

    return (
        <div className="Queue">
            <button className="AddPessoa Nome" onClick={handleAddPessoaClick}>+ Adicionar pessoa a fila</button>
            
            <Modal isVisible={isModalVisible} onClose={closeModal} />

            <div className="Clientes">
                {fila.map((pessoa) => (
                <div className="Cliente" key={pessoa.id}>
                        <div className="Credencial">
                            <div className="Nome">
                                {pessoa.nome}
                            </div>

                            <div className="Info">
                                <div className='SubInfo'>
                                    <p className='Valor'>Total de pães:</p>
                                    <p>{pessoa.paes} pães</p>
                                </div>

                                <div className='SubInfo'>
                                    <p className='Valor'>Total a pagar:</p>
                                    <p>R$ {pessoa.valor.toFixed(2)}</p>
                                </div>
                            </div>
                        </div>

                        <Image className="Lixeira"
                            src="/Lixeira.svg"
                            alt="Lixeira Icon"
                            width={24}
                            height={25}
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleRemoveCliente(pessoa.id)}
                            />
                    </div>
                ))}
            </div>

        </div>
    );
};
