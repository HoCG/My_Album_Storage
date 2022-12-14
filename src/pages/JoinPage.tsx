import React, { useState } from "react";
import styled from "styled-components";
import TextDialog from "../components/dialogs/commonDialogs/TextDialog";
import JoinForm from "../components/forms/commonForms/JoinForm";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { getToken } from "../apis/tokens/token";

const JoinPage: React.FC = () => {
  const [dialog, setDialog] = useState(false);
  //로그인 성공시에만 MainPage로 넘어갈 수 있게하기 위해서.
  const [dialogSuccess, setDialogSuccess] = useState(false);
  const [dialogText, setDialogText] = useState(``);
  const isAuthorized = getToken();
  const navigate = useNavigate();
  const dialogController = (dialogStatus: boolean) => {
    if (dialogStatus) {
      return setDialog(dialogStatus);
    }
    if (dialogSuccess) {
      navigate("/login");
      return setDialog(dialogStatus);
    }
    return setDialog(dialogStatus);
  };
  return !isAuthorized || isAuthorized === null ? (
    <JoinPageDiv>
      <JoinForm
        dialogController={dialogController}
        setDialogText={setDialogText}
        setDialogSuccess={setDialogSuccess}
      ></JoinForm>
      {dialog && (
        <TextDialog
          dialogController={dialogController}
          text={dialogText}
        ></TextDialog>
      )}
    </JoinPageDiv>
  ) : (
    <Navigate to="/" />
  );
};

export default JoinPage;

const JoinPageDiv = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;
