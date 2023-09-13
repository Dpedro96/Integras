import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import {  BiCheck } from "react-icons/bi";
import { FiMoreHorizontal } from "react-icons/fi";
import {  Image } from "react-bootstrap";
import avatar from "../resources/img/avatar.png";
import "../resources/CSS/Perfil.css";
import { useState, useEffect, useMemo } from "react";
import PerfilController from "../controller/PerfilController";
import { observeAuthState } from "../common/FirebaseAuth";

function Perfil() {
  const [user, setUser] = useState({});
  const controller = useMemo(() => new PerfilController(), []);
  const [editingField, setEditingField] = useState(null);
  const [tempName, setTempName] = useState("");
  const [tempPhone, setTempPhone] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const handleStartEdit = (field) => {
    setEditingField(field);
    if (field === "name") setTempName(user.nome || "");
    if (field === "phone") setTempPhone(user.phone || "");
  };
  const handleSaveEdit = async () => {
    if (editingField === "name") user.nome = tempName;
    if (editingField === "phone") user.phone = tempPhone;

    try {
      await controller.updatePerfil(user);
      setUser({ ...user }); // para re-renderizar o componente
      setEditingField(null); // para sair do modo de edição
    } catch (error) {
      alert("Erro ao salvar as alterações" + error.message);
    }
  };

  const toggleMenu = () => {
    setShowMenu((prevState) => !prevState);
    console.log(showMenu); // Adicione esta linha
  };
  const handleDeleteAccount = async () => {
    const userConfirmation = window.confirm("Tem certeza de que deseja excluir sua conta? Esta ação é irreversível.");
  
    if (!userConfirmation) {
      return; 
    }
  
    try {
      await controller.deleteAccount();
     
      
    } catch (error) {
      alert(error.message);
    }
  };
  
  const handleUploadProfilePicture = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const downloadURL = await controller.uploadUserPicture(file, user.id);
        setUser({ ...user, profilePicture: downloadURL });
      } catch (error) {
        alert("Erro ao fazer upload da foto: " + error.message);
      }
    }
  };

  const handleDeleteProfilePicture = async () => {
    try {
      await controller.deleteUserPicture(user.id);
      setUser({ ...user, profilePicture: null });
    } catch (error) {
      alert("Erro ao excluir a foto: " + error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await controller.logout();
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    let unsubscribe = null;

    const fetchUser = async (email) => {
      try {
        const userData = await controller.buscarPerfilPorEmail(email);
        if (!userData) {
          throw new Error("No user found.");
        }
        setUser(userData);
      } catch (err) {
        alert(err.message);
      }
    };

    unsubscribe = observeAuthState((authUser) => {
      if (authUser && authUser.email) {
        fetchUser(authUser.email);
      } else {
        alert("Usuário não autenticado. Por favor, faça login novamente.");
      }
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [controller]);

  return (
    <form className="perfil-form" onSubmit={(e) => e.preventDefault()}>
      <div className="perfil-container">
        <Image
          src={user.profilePicture || avatar}
          roundedCircle
          width={150}
          height={150}
        />

        {!user.profilePicture && (
          <label className="brnFoto file-input-wrapper">
            Escolher arquivo
            <input type="file" onChange={handleUploadProfilePicture} />
          </label>
        )}
        {user.profilePicture && (
          <button
            className="delete-profile-btn"
            onClick={handleDeleteProfilePicture}
          >
            Excluir Foto
          </button>
        )}

        <div className="menu-container">
          <button className="menu-button" onClick={toggleMenu}>
            <FiMoreHorizontal />
          </button>
          <nav
            className="settings"
            style={{ display: showMenu ? "block" : "none" }}
          >
            <ul className="listaMenu">
              <li>
                <button onClick={handleLogout}>Sair</button>
              </li>

              <li>
                <button onClick={handleDeleteAccount}>Excluir Conta</button>
              </li>

            </ul>
          </nav>
        </div>

        <div className="perfil-info">
          <div className="perfil-coluna">
          <p className="infoTitulo"> Informações</p>
            <table className="tabelaInfo">
              <tbody className="infosUser">
                <tr>
                  <td className="infow">NOME</td>
                  <td className="infosU">
                    {editingField === "name" ? (
                      <input
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                      />
                    ) : (
                      user.nome || "Nome do usuário"
                    )}
                  </td>
                  <td className="infosU">
                    <button
                      className="btnIcon-no-bg"
                      type="button"
                      onClick={() => handleStartEdit("name")}
                    >
                      {editingField === "name" ? (
                        <BiCheck onClick={handleSaveEdit} />
                      ) : (
                        <FontAwesomeIcon icon={faEdit} />
                      )}
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="info">E-MAIL:</td>
                  <td className="infosU">
                    {user.email || "email@usuario.com"}
                  </td>
                </tr>
                <tr>
                  <td className="info">TELEFONE:</td>
                  <td className="infosU">
                    {editingField === "phone" ? (
                      <input
                        value={tempPhone}
                        onChange={(e) => setTempPhone(e.target.value)}
                      />
                    ) : (
                      user.phone || "(11) 98765-4321"
                    )}
                  </td>
                  <td className="infosU">
                    <button
                      className="btnIcon-no-bg"
                      type="button"
                      onClick={() => handleStartEdit("phone")}
                    >
                      {editingField === "phone" ? (
                        <BiCheck onClick={handleSaveEdit} />
                      ) : (
                        <FontAwesomeIcon icon={faEdit} />
                      )}
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="info">CPF:</td>
                  <td className="infosU">{user.cpf || "123.456.789-00"}</td>
                </tr>
                <tr>
                  <td className="info">SENHA</td>
                  <td className="infosU">******</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Perfil;
