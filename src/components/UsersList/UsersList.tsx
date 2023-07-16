import React, { useRef, useState, useCallback, FC, ReactElement } from "react";
import { IUser } from "../../models/IUser";
import { userSlice } from "../../store/reducers/UserSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import styles from "./UsersList.module.css";

const USER_ITEM_HEIGHT = 30;
const VIEWPORT_HEIGHT = 270;

type UserItemPropsType = {
  user: IUser;
  onClickHandler: (user: IUser) => void;
  containerStyles: string;
  top: number;
  height: number;
};

const UserItem = React.memo(
  ({ user, onClickHandler, containerStyles, top, height }: UserItemPropsType) => {
    return (
      <li
        className={containerStyles}
        style={{ top: top, height: height }}
        onClick={useCallback(() => onClickHandler(user), [onClickHandler, user])}
      >
        <span className={styles.icon}></span>
        <span className={styles.username}>
          {user.firstName} {user.lastName}
        </span>
      </li>
    );
  }
);

const UsersList: FC = (): ReactElement => {
  const { users } = useAppSelector((state) => state.userReducer);
  const { selectUser } = userSlice.actions;
  const dispatch = useAppDispatch();
  const [selectedUser, setSelectedUser] = useState<IUser | null>(users[0]);
  const viewportRef = useRef<HTMLDivElement>(null);

  const numberOfVisibleUsers = Math.trunc(VIEWPORT_HEIGHT / USER_ITEM_HEIGHT);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(numberOfVisibleUsers);
  const wrapperStyle = { height: users.length * USER_ITEM_HEIGHT };

  const onUserClick = useCallback(
    (user: IUser) => {
      setSelectedUser(user);
      dispatch(selectUser(user));
    },
    [setSelectedUser, dispatch, selectUser]
  );

  const renderVisibleList = () => {
    const result = [];
    for (let i = start; i < end + 1; i++) {
      const user: IUser = users[i];
      result.push(
        <UserItem
          key={user.id}
          user={user}
          onClickHandler={onUserClick}
          containerStyles={
            JSON.stringify(user) === JSON.stringify(selectedUser)
              ? [styles.user, styles.selected].join(" ")
              : styles.user
          }
          top={i * USER_ITEM_HEIGHT}
          height={USER_ITEM_HEIGHT}
        />
      );
    }
    return result;
  };

  const onScrollChange = () => {
    let currentIndex = Math.trunc(viewportRef.current!.scrollTop / USER_ITEM_HEIGHT);
    currentIndex =
      currentIndex - numberOfVisibleUsers >= users.length
        ? currentIndex - numberOfVisibleUsers
        : currentIndex;

    if (currentIndex !== start) {
      setStart(currentIndex);
      setEnd(
        currentIndex + numberOfVisibleUsers >= users.length
          ? users.length - 1
          : currentIndex + numberOfVisibleUsers
      );
    }
  };

  return (
    <div className={styles.viewportWrapper}>
      <div className={styles.viewport} ref={viewportRef} onScroll={onScrollChange}>
        <ul className={styles.wrapper} style={wrapperStyle}>
          {renderVisibleList()}
        </ul>
      </div>
    </div>
  );
};

export default UsersList;
