import { useState, useEffect, FC, ReactElement } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { userSlice } from "../../store/reducers/UserSlice";
import { validateUserInput } from "../../utils/validateUserInput";
import avatar from "/avatar.jpg";
import styles from "./UserCard.module.css";

const SUCCESS_MESSAGE = "Saved changes";

const UserCard: FC = (): ReactElement => {
  const dispatch = useAppDispatch();
  const { selectedUser } = useAppSelector((state) => state.userReducer);
  const { editUser } = userSlice.actions;
  const [userId, setUserId] = useState<string>("");
  const [userFirstName, setUserFirstName] = useState<string>("");
  const [userLastName, setUserLastName] = useState<string>("");
  const [userAge, setUserAge] = useState<number>(0);
  const [userEmail, setUserEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  useEffect(() => {
    setError("");
    setSuccess("");
    if (selectedUser) {
      setUserId(selectedUser.id);
      setUserFirstName(selectedUser.firstName);
      setUserLastName(selectedUser.lastName);
      setUserAge(selectedUser.age);
      setUserEmail(selectedUser.email);
    }
  }, [selectedUser]);

  const submitForm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const currentError = validateUserInput({
      userFirstName,
      userLastName,
      userAge,
      userEmail,
    });
    if (currentError) {
      setError(currentError);
      return;
    }

    dispatch(
      editUser({
        id: userId,
        age: userAge,
        firstName: userFirstName,
        lastName: userLastName,
        email: userEmail,
      })
    );
    setSuccess(SUCCESS_MESSAGE);
  };

  return (
    <div className={styles.usercardWrapper}>
      <h3>Edit User</h3>
      <div className={styles.userProfile}>
        <img src={avatar} width={90} height={90} alt="user" />
        <form className={styles.userForm}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            className={styles.input}
            value={userFirstName}
            onChange={(e) => setUserFirstName(e.target.value)}
          />
          <label htmlFor="lastName">Surname</label>
          <input
            id="lastName"
            type="text"
            className={styles.input}
            value={userLastName}
            onChange={(e) => setUserLastName(e.target.value)}
          />
          <label htmlFor="age">Age</label>
          <input
            id="age"
            type="number"
            className={styles.input}
            value={userAge}
            onChange={(e) => setUserAge(Number(e.target.value))}
          />
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            className={styles.input}
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </form>
      </div>
      <div className={styles.buttonWrapper}>
        <div className={error ? styles.error : styles.success}>
          {error ? error : success ? success : null}
        </div>
        <button type="submit" className={styles.button} onClick={submitForm}>
          Save
        </button>
      </div>
    </div>
  );
};

export default UserCard;
