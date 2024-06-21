"use client";

import React from "react";

export function AddExerciseForm() {
  const [userId, setUserId] = React.useState("");

  return (
    <form
      action={`/api/users/${userId}/exercises`}
      method="post"
    >
      <h2>Add exercises</h2>
      <p>
        <code>POST /api/users/:_id/exercises</code>
      </p>
      <input
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        id="uid"
        type="text"
        name=":_id"
        placeholder=":_id"
      />
      <input
        id="desc"
        type="text"
        name="description"
        placeholder="description*"
      />
      <input
        id="dur"
        type="text"
        name="duration"
        placeholder="duration* (mins.)"
      />
      <input
        id="date"
        type="text"
        name="date"
        placeholder="date (yyyy-mm-dd)"
      />
      <input type="submit" value="Submit" />
    </form>
  );
}
