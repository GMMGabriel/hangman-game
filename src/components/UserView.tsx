import { FormEvent, useState } from 'react';
import { Modal } from './Modal';

import { useAuth } from "../hooks/useAuth";

import userOffImg from '../assets/images/user-off.svg';

import '../styles/user-view.scss';
import '../styles/modal.scss'

export function UserView() {
    const { user, signInWithGoogle, signOutGoogle } = useAuth();
    const [modalIsOpen, setIsOpen] = useState(false);

    async function openModal(event: FormEvent) {
        event.preventDefault();
        if (!user) {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            await signInWithGoogle();
        } else {
            setIsOpen(true);
        }
    }

    function closeModal() {
        setIsOpen(false);
    }

    function logout() {
        signOutGoogle();
        closeModal();
    }

    return (
        <>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
            >
                <div className="custom-modal">
                    {/* <img src={timesImg} className="times" alt="Fechar modal" onClick={modalActive} /> */}
                    <span>Fazer logout?</span>
                    <div className="user-info">
                        <img src={user?.avatar} alt={user?.name} referrerPolicy="no-referrer" />
                        <span>{user?.name}</span>
                    </div>
                    <div className="buttons">
                        <button type="button" onClick={logout} id="confirmButtonModal" className="yes">Sim</button>
                        <button type="button" onClick={closeModal} >Não</button>
                    </div>
                </div>
            </Modal>
            <div className="user-view">
                {!user ? (
                    <img src={userOffImg} onClick={openModal} alt="Imagem que representa que nenhum usuário está logado" />
                ) : (
                    <>
                        <img src={user?.avatar} alt={user?.name} onClick={openModal} referrerPolicy="no-referrer" />
                    </>
                )}
            </div>
        </>
    );
}