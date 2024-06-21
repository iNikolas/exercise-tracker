import { AddExerciseForm } from "./_components";

export default function Home() {
  return (
    <>
      <div className="container">
        <h1>Exercise tracker</h1>
        <form action="/api/users" method="post">
          <h2>Create a New User</h2>
          <p>
            <code>POST /api/users</code>
          </p>
          <input
            id="uname"
            type="text"
            name="username"
            placeholder="username"
          />
          <input type="submit" value="Submit" />
        </form>{" "}
        <AddExerciseForm />
        <p>
          <strong>GET user&apos;s exercise log: </strong>
          <code>GET /api/users/:_id/logs?[from][&amp;to][&amp;limit]</code>
        </p>
        <p>
          <strong>[ ]</strong> = optional
        </p>
        <p>
          <strong>from, to</strong> = dates (yyyy-mm-dd); <strong>limit</strong>{" "}
          = number
        </p>
      </div>
    </>
  );
}
