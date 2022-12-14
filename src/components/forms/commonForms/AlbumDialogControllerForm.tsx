import React from "react";
import styled from "styled-components";
import { AppDispatch, RootState } from "../../../store/index";
import { useDispatch, useSelector } from "react-redux";
import { resetSearchAlbums } from "../../../store/album";
import { albumType } from "../../../types/album";
import { asyncPostAlbumFetch, asyncGetAlbumFetch } from "../../../store/album";

type propsType = {
  selectedAlbums: albumType[];
  setAlbumDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

const AlbumDialogController: React.FC<propsType> = ({
  selectedAlbums,
  setAlbumDialog,
}) => {
  const { user } = useSelector(
    (state: RootState) => state.userStore
  );
  const dispatch = useDispatch<AppDispatch>();
  const apply = async () => {
    await dispatch(
      asyncPostAlbumFetch({
        selectedAlbums: selectedAlbums,
        userId: user.id,
      })
    ).then(() => {
      dispatch(asyncGetAlbumFetch(user.id));
    });
    setAlbumDialog(false);
  };
  const close = () => {
    dispatch(resetSearchAlbums());
    setAlbumDialog(false);
  };
  return (
    <ButtonContainer>
      <ApplyButton onClick={apply}>추가</ApplyButton>
      <CloseButton onClick={close}>닫기</CloseButton>
    </ButtonContainer>
  );
};
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px;
`;

const Centering = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonForm = styled(Centering)`
  width: 10vw;
  height: 3vh;
  border-radius: 20px;
  color: white;
  font-weight: 800;
  padding-left: 20px;
  margin-left: 2px;
  margin-right: 2px;
  user-select: none;
  cursor: pointer;
`;

const ApplyButton = styled(ButtonForm)`
  background-color: skyblue;
`;

const CloseButton = styled(ButtonForm)`
  background-color: #f2c2c3;
`;

export default AlbumDialogController;
