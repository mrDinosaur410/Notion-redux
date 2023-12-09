import React from "react";
import { useSelector, connect } from "react-redux";
import Button from "../util/Button";
import {
  selectUser,
  selectUserLoading,
} from "../redux/slices/userSlice/userSelectors";

function HomePage() {
  var options = {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  const user = useSelector(selectUser);
  const loading = useSelector(selectUserLoading);

  return (
    <div>
      {!loading ? (
        <>
          <p className="mb-12 text-3xl font-bold text-gray-800 md:text-4xl lg:text-5xl">
            About me
          </p>
          <p>
            <b>Email: </b>
            {user.email}
          </p>
          <p>
            <b>Registration date: </b>
            {new Date(user.createdAt).toLocaleDateString("ru-RU", options)}
          </p>
          <Button $to="/notes" $text="See notes" />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

const mapProps = (state) => ({ user: selectUser(state) });
export default connect(mapProps, null)(HomePage);
