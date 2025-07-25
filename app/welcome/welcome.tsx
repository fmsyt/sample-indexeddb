import template from "~/user.hbs?raw";
import dummyjson from "dummy-json";
import type { User } from "~/types";
import { deleteUser, insertUser, useUsers } from "~/user";
import { useEffect, useRef } from "react";

function generateUser(seed?: string) {

  try {
    const data = dummyjson.parse(template, { seed });

    const user: User = JSON.parse(data);
    return user;

  } catch (error) {
    console.error("Error generating user:", error);
    throw error;
  }
}

export function Welcome() {

  const users = useUsers();

  const tableWrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!tableWrapperRef.current) {
      return;
    }

    tableWrapperRef.current.scrollTo({
      top: tableWrapperRef.current.scrollHeight,
      behavior: 'smooth',
    })


  }, [users])


  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <header className="flex flex-col items-center gap-9">
          { /* Header with title */}
          <h1 className="text-3xl font-bold">
            {"Hello, welcome to the "}
            <a
              className="text-primary"
              href="https://dexie.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              {"Dexie.js "}
            </a>
            {"example app!"}
          </h1>
        </header>

        <div
          ref={tableWrapperRef}
          className="max-w-[80vw] max-h-[50vh] w-full space-y-6 px-4 overflow-auto"
        >
          <table className="table table-pin-rows">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Favorites</th>
                <th>Coordinates</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {!users && (
                <tr>
                  <td colSpan={6} className="text-center">
                    <div className="loading loading-spinner loading-lg">
                      Loading users...
                    </div>
                  </td>
                </tr>
              )}
              {users?.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>
                    <pre>{JSON.stringify(user.favorites, null, 2)}</pre>
                  </td>
                  <td>
                    <pre>{JSON.stringify(user.coordinates, null, 2)}</pre>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-error"
                      onClick={() => { deleteUser(user.id) }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col items-center gap-4">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => { insertUser(generateUser()) }}
          >
            Add
          </button>
        </div>
      </div>
    </main >
  );
}
