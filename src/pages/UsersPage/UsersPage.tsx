import { useEffect, FC, ReactElement } from "react";
import { userSlice } from "../../store/reducers/UserSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { generateUsers } from "../../utils/generateUsers";
import UserCard from "../../components/UserCard/UserCard";
import UsersList from "../../components/UsersList/UsersList";
import styles from "./UsersPage.module.css";

const USERS_NUMBER = 1000000;

const UsersPage: FC = (): ReactElement => {
  const { users } = useAppSelector((state) => state.userReducer);
  const { setUsers } = userSlice.actions;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setUsers(generateUsers(USERS_NUMBER)));
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        {Boolean(users.length) && (
          <>
            <h1 className={styles.title}>find your user</h1>
            <UsersList />
            <UserCard />
          </>
        )}
      </div>
    </div>
  );
};

export default UsersPage;
