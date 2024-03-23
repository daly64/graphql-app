"use client";
import { gql, useQuery, useMutation, useSubscription } from "@apollo/client";
import { User } from "@prisma/client";

// const allUsers = gql`
//   subscription {
//     allUsers {
//       id
//       name
//       score
//     }
//   }
// `;

const getAllUsers = gql`
  query {
    getAllUsers {
      id
      name
      score
    }
  }
`;

const createUser = gql`
  mutation CreateUser($input: UserInput!) {
    createUser(input: $input) {
      id
      name
      score
    }
  }
`;

const deleteUser = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;

const updateUser = gql`
  mutation UpdateUser($id: ID!, $input: UserInput!) {
    updateUser(id: $id, input: $input) {
      id
      name
      score
    }
  }
`;

export default function Home() {
  const {
    data: users,
    loading: usersLoading,
    error: usersError,
    refetch,
  } = useQuery(getAllUsers);

  const [createUserMutation] = useMutation(createUser, {
    refetchQueries: [getAllUsers],
  });

  const [deleteUserMutation] = useMutation(deleteUser, {
    refetchQueries: [getAllUsers],
  });

  const [updateUserMutation] = useMutation(updateUser, {
    refetchQueries: [getAllUsers],
  });

  const onCreateUser = (input: any) => {
    createUserMutation({ variables: { input } });
  };

  const onUpdateUser = (id: string, input: any) => {
    updateUserMutation({
      variables: { id, input },
      onCompleted: refetch,
    });
  };

  const onDeleteUser = (id: string) => {
    deleteUserMutation({ variables: { id }, onCompleted: refetch });
  };

  const onAddToScore = (id: string, user: User) => {
    onUpdateUser(id, { name: user.name, score: user.score + 1 });
  };

  const onDelete = (id: string) => {
    if (
      window.confirm(`Are you sure you want to delete the user with id ${id} ?`)
    ) {
      onDeleteUser(id);
    }
  };

  const onSubmit = (event: any) => {
    event.preventDefault();
    const newUser = {
      name: event.target.name.value,
      score: parseInt(event.target.score.value),
    };
    onCreateUser(newUser);
    event.target.reset();
  };

  if (usersLoading) return <p>Loading...</p>;

  if (usersError) return <p>Error : {usersError?.message}</p>;
  return (
    <main>
      <form onSubmit={onSubmit}>
        <h3>Add a user</h3>
        <label htmlFor="name">Name :</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          placeholder="User's name"
        />

        <label htmlFor="score">Score :</label>
        <input type="number" id="score" name="score" defaultValue={0} />

        <button type="submit">Save</button>
      </form>

      {users?.getAllUsers.map((user: any) => (
        <div
          key={user.id}
          style={{ display: "inline-list-item", margin: "10px" }}
        >
          <div
            style={{
              border: "1px solid black",
              padding: "10px",
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <p> {user.id} -</p>
            <h3> {user.name}</h3>
            <p> : {user.score}</p>
            <button
              onClick={() =>
                onAddToScore(user.id!, {
                  id: user.id,
                  name: user.name,
                  score: user.score,
                })
              }
            >
              +1
            </button>
            <button onClick={() => onDelete(user.id!)}>Delete</button>
          </div>
        </div>
      ))}
    </main>
  );
}
