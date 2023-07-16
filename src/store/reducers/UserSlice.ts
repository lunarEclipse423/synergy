import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../models/IUser";

interface UserState {
  users: IUser[];
  selectedUser: IUser | null;
}

const initialState: UserState = {
  users: [],
  selectedUser: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<IUser[]>) {
      state.users = action.payload;
      state.selectedUser = action.payload[0];
    },
    editUser(state, action: PayloadAction<IUser>) {
      let userToEdit = state.users.find((user) => user.id === action.payload.id);
      userToEdit!.age = action.payload.age;
      userToEdit!.firstName = action.payload.firstName;
      userToEdit!.lastName = action.payload.lastName;
      userToEdit!.email = action.payload.email;
    },
    selectUser(state, action: PayloadAction<IUser>) {
      state.selectedUser = action.payload;
    },
  },
});

export default userSlice.reducer;
